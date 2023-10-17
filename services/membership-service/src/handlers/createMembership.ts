import createError from 'http-errors'
import { v4 as uuid } from 'uuid'
import { commonMiddleware } from '../lib/commonMiddleware'
import { Membership, Community, Person } from '@hyperlocal/models'

import { connectMongoDB } from 'src/lib/mongoDB'
import { getErrorMessage } from 'src/lib/errors'

async function createMembership(event: any, context: any) {
  // Make sure to add this so you can re-use `conn` between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false
  try {
    // Connect to mongodb
    await connectMongoDB()

    const { title, isAdmin, ownerId, communityId } = event?.body

    // Check if person exists
    const owner = await Person.findOne({ id: ownerId })
    if (!owner) {
      throw new createError.NotFound(`Person with id: ${ownerId} not found!`)
    }

    // Check if community exists
    const community = await Community.findOne({ id: communityId })
    if (!community) {
      throw new createError.NotFound(
        `Community with id: ${communityId} not found!`,
      )
    }

    const membership = {
      ownerId,
      communityId,
      title,
      isAdmin,
    }

    const newMembership = await Membership.create(membership)

    community?.memberships.push(newMembership)
    await community?.save()

    owner?.memberships.push(newMembership)
    await owner?.save()

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
