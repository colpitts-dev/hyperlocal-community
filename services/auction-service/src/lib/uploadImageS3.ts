import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const client = new S3Client({})

export const uploadImageS3 = async (key: any, body: any) => {
  const region = 'ca-central-1'
  const command = new PutObjectCommand({
    Bucket: process.env.AUCTIONS_BUCKET_NAME,
    Key: key,
    Body: body,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  })

  try {
    await client.send(command)

    const url = `https://${process.env.AUCTIONS_BUCKET_NAME}.s3.amazonaws.com/${key}`
    return url
  } catch (err) {
    console.error(err)
    throw new Error('Error uploading file')
  }
}
