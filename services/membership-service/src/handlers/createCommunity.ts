import createError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'
import { Community } from '@hyperlocal/models'

import { connectMongoDB } from 'src/lib/mongoDB'
import { getErrorMessage } from 'src/lib/errors'

async function createCommunity(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()
    const { title, description, isPublic, theme } = event?.body

    const newCommunity = await Community.create({
      title,
      description,
      isPublic,
      theme,
    })

    return {
      statusCode: 201,
      body: JSON.stringify(newCommunity),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(createCommunity)
