import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { GetCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export async function getAuctionById(id: string) {
  let auction
  try {
    const command = new GetCommand({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id },
    })

    const response = await dynamo.send(command)

    auction = response.Item
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError()
  }

  if (!auction)
    throw new createError.NotFound(`Auction with ID "${id}" not found!`)

  return auction
}

async function getAuction(event: any) {
  const { id } = event.pathParameters
  const auction = await getAuctionById(id)

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  }
}

export const handler = commonMiddleware(getAuction)
