import createError from 'http-errors'
import { Community } from '@hyperlocal/models'
import { connectMongoDB } from '../lib/mongoDB'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getErrorMessage } from '../lib/errors'

async function getCommunities(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()

    // Check if person exists
    const communities = await Community.find()
    if (!communities) {
      throw new createError.NotFound(`No communities found!`)
    }

    return {
      statusCode: 200,
      headers: {
        /* Required for CORS support to work */
        'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(communities),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(getCommunities)
