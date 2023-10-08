import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getAuctionById } from './getAuction'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

async function placeBid(event: any) {
  const { id } = event.pathParameters
  const { amount } = event.body
  const { email } = event.requestContext.authorizer

  const auction = await getAuctionById(id)

  // Bid identity validation
  if (email === auction.seller) {
    throw new createError.Forbidden('You cannot bid on your own auctions!')
  }

  // Avoid double bidding
  if (email === auction.highestBid.bidder) {
    throw new createError.Forbidden('You are already the highest bidder!')
  }

  // Auction status validation
  if (auction.status !== 'OPEN') {
    throw new createError.Forbidden('You cannot bid on closed auctions!')
  }

  // Bid amount validation
  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(
      `Your bid must be hight that ${auction.highestBid.amount}`,
    )
  }

  try {
    const command = new UpdateCommand({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression:
        'set highestBid.amount = :amount, highestBid.bidder = :bidder',
      ExpressionAttributeValues: {
        ':amount': amount,
        ':bidder': email,
      },
      ReturnValues: 'ALL_NEW',
    })

    const response = await dynamo.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify(response?.Attributes),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError('Opps, something went wrong!')
  }
}

const requestSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
        },
      },
      required: ['amount'],
    },
  },
}

export const handler = commonMiddleware(placeBid).use(
  validator({ eventSchema: transpileSchema(requestSchema) }),
)
