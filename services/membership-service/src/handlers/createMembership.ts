import createError from 'http-errors'
import { v4 as uuid } from 'uuid'
import { commonMiddleware } from '../lib/commonMiddleware'
import { Membership } from '../models/membership.model'

import { connectMongoDB } from 'src/lib/mongoDB'
import { getErrorMessage } from 'src/lib/errors'

async function createMembership(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false

  // Connect to mongodb
  await connectMongoDB()

  const { email, age } = event?.body

  const membership = {
    email,
    age,
  }

  try {
    const newMembership = await Membership.create(membership)

    return {
      statusCode: 201,
      body: JSON.stringify(newMembership),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(getErrorMessage(error)),
    }
  }
}

export const handler = commonMiddleware(createMembership)
