import createError from 'http-errors'
import { Community } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getErrorMessage } from '../lib/errors'

async function getCommunity(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()
    const { id } = event?.pathParameters

    // Check if community exists
    const community = await Community.findById({ _id: id })
    if (!community) {
      throw new createError.NotFound(`Community not found!`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify(community),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(getCommunity)
