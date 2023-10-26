import createError from 'http-errors'
import { Person } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getErrorMessage } from '../lib/errors'

async function getPeople(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()
    const { id } = event?.pathParameters

    // Check if people exists
    const people = await Person.find()
    if (!people) {
      throw new createError.NotFound(`No people found!`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(people),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(getPeople)
