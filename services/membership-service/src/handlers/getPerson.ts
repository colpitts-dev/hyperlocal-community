import createError from 'http-errors'
import { Person } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getErrorMessage } from '../lib/errors'

async function getPerson(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()
    const { id } = event?.pathParameters

    // Check if person exists
    const person = await Person.findById({ _id: id })
    if (!person) {
      throw new createError.NotFound(`Person not found!`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(person),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(getPerson)
