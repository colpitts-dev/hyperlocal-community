import createHttpError from 'http-errors'
import { UpdateCommandOutput } from '@aws-sdk/lib-dynamodb'
import { closeAuction } from '@lib/closeAuction'
import { getEndedAuctions } from '@lib/getEndedAuctions'

async function processAuctions() {
  try {
    const auctionsToClose = await getEndedAuctions()
    const closePromises = auctionsToClose?.map(auction =>
      closeAuction(auction),
    )

    await Promise.all(closePromises as Promise<UpdateCommandOutput>[])

    return { closed: closePromises?.length }
  } catch (e) {
    console.log(e)
    throw new createHttpError.InternalServerError()
  }
}

export const handler = processAuctions
