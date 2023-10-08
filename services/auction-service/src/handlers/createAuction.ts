import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { PutCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { v4 as uuid } from 'uuid'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import { commonMiddleware } from '../lib/commonMiddleware'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

async function createAuction(event: any) {
  const { title } = event?.body
  const { email } = event?.requestContext.authorizer
  const now = new Date()
  const endDate = new Date()
  endDate.setHours(now.getHours() + 1)

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    highestBid: {
      amount: 0,
    },
    seller: email,
    endingAt: endDate.toISOString(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  }

  try {
    const command = new PutCommand({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    })

    await dynamo.send(command)

    return {
      statusCode: 201,
      body: JSON.stringify(auction),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(
      'Opps, something went wrong trying to create the auction!',
    )
  }
}

const requestSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      required: ['title'],
    },
  },
}

export const handler = commonMiddleware(createAuction).use(
  validator({
    eventSchema: transpileSchema(requestSchema),
  }),
)
