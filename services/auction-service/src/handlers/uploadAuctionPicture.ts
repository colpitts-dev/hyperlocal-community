import { commonMiddleware } from '../lib/commonMiddleware'

async function uploadAuctionPicture(event: any) {

  return {
    statusCode: 200,
    body: JSON.stringify({}),
  }
}

export const handler = commonMiddleware(uploadAuctionPicture)
