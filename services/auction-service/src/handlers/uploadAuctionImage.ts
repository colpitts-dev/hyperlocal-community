import createHttpError from 'http-errors'
import { commonMiddleware } from '../lib/commonMiddleware'
import { getAuctionById } from './getAuction'
import { uploadImageS3 } from '../lib/uploadImageS3'
import { setAuctionImage } from 'src/lib/setAuctionImage'

async function uploadAuctionImage(event: any) {
  const { id } = event.pathParameters
  const auction = await getAuctionById(id)
  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64, 'base64')

  let updatedAuction;

  try {
    const result = await uploadImageS3(auction.id + '.png', buffer)
    updatedAuction = await setAuctionImage(auction.id, result)
  } catch (error) {
    console.error(error)
    createHttpError.InternalServerError(error as string)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction),
  }
}

export const handler = commonMiddleware(uploadAuctionImage)
