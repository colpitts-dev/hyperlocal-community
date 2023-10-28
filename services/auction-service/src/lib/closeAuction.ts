import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { UpdateCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import type { Auction } from './types'

const client = new DynamoDBClient({})
const dynamo = DynamoDBDocumentClient.from(client)
const sqs = new SQSClient({})

export async function closeAuction(auction: Auction) {
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id: auction.id },
    UpdateExpression: 'set #status = :status',
    ExpressionAttributeValues: {
      ':status': 'CLOSED',
    },
    ExpressionAttributeNames: {
      '#status': 'status',
    },
  }

  const command = new UpdateCommand(params)
  const result = await dynamo.send(command)

  // Notification Service
  const { title, seller, highestBid } = auction

  if (highestBid.amount === 0) {
    await sqs.send(
      new SendMessageCommand({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
          subject: 'No bids on your auction item',
          recipient: seller,
          body: `Your item "${title}" did not receive any bids.`,
        }),
      }),
    )
    return
  }

  const notifySeller = await sqs.send(
    new SendMessageCommand({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'Your item has been sold!',
        recipient: seller,
        body: `Your item "${title}" has been sold for $${highestBid.amount}.`,
      }),
    }),
  )

  const notifyBidder = await sqs.send(
    new SendMessageCommand({
      QueueUrl: process.env.MAIL_QUEUE_URL,
      MessageBody: JSON.stringify({
        subject: 'You won an auction!',
        recipient: highestBid.bidder,
        body: `You won the auction for "${title}" for $${highestBid.amount}.`,
      }),
    }),
  )

  Promise.all([notifySeller, notifyBidder])

  return result
}
