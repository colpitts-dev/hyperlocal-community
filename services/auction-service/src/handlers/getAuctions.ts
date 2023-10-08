import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { ScanCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

async function getAuctions() {
  try {
    const command = new ScanCommand({
      TableName: process.env.AUCTIONS_TABLE_NAME,
    })

    const { Items } = await dynamo.send(command)

    return {
      statusCode: 201,
      body: JSON.stringify(Items),
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(
      'Opps, something went wrong trying to get all auctions!',
    )
  }
}

export const handler = commonMiddleware(getAuctions)
