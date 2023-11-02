import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { QueryCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Auction } from './types'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export async function getEndedAuctions() {
  const now = new Date()
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    KeyConditionExpression: '#status = :status AND endingAt <= :now',
    ExpressionAttributeValues: {
      ':status': 'OPEN',
      ':now': now.toISOString(),
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }

  const command = new QueryCommand(params)

  const result = await dynamo.send(command)

  return result.Items as Auction[]
}
