import createError from 'http-errors'
import { Membership } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getErrorMessage } from '../lib/errors'

async function getMemberships(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()
    const { id } = event?.pathParameters

    // Get membership by id
    const membership = await Membership.findById({ _id: id }).populate([
      'owner',
      'community',
    ])
    if (!membership) {
      throw new createError.NotFound(`Membership not found!`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(membership),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(getMemberships)
