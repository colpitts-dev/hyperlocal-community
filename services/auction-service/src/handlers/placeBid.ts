import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getAuctionById } from './getAuction'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

async function placeBid(event: any) {
  const { id } = event.pathParameters
  const { amount } = event.body

  const auction = await getAuctionById(id)

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
      UpdateExpression: 'set highestBid.amount = :amount',
      ExpressionAttributeValues: {
        ':amount': amount,
      },
      ReturnValues: 'ALL_NEW',
    })

    const response = await dynamo.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError('Opps, something went wrong!')
  }
}

export const handler = commonMiddleware(placeBid)
