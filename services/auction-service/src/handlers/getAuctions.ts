import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { QueryCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createHttpError from 'http-errors'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import { commonMiddleware } from '@lib/commonMiddleware'
import { Auction } from '@lib/types'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

async function getAuctions(event: any) {
  const { status } = event.queryStringParameters
  let auctions

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeValues: {
      ':status': status,
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }

  try {
    const command = new QueryCommand(params)

    const { Items } = await dynamo.send(command)
    auctions = Items as Auction[]
  } catch (error) {
    console.log(error)
    throw new createHttpError.InternalServerError(
      'Opps, something went wrong trying to get all auctions!',
    )
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  }
}

const requestSchema = {
  type: 'object',
  properties: {
    queryStringParameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['OPEN', 'CLOSED'],
          default: 'OPEN',
        },
      },
    },
  },
  required: ['queryStringParameters'],
}

export const handler = commonMiddleware(getAuctions).use(
  validator({
    eventSchema: transpileSchema(requestSchema),
  }),
)
