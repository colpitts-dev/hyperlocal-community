import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)

export async function setAuctionImage(id:string, imageUrl:string) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set imageUrl = :imageUrl',
    ExpressionAttributeValues: {
      ':imageUrl': imageUrl,
    },
    ReturnValues: 'ALL_NEW',
  }

  const command = new UpdateCommand(params)

  const result = await dynamo.send(command)

  return result.Attributes
}