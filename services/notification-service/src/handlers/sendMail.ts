import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

// a client can be shared by different commands.
const client = new SESClient({ region: 'ca-central-1' })

export async function sendMail(event: any) {
  const record = event?.Records[0]
  console.log('record: ', record)

  const email = JSON.parse(record?.body)
  const { subject, body, recipient } = email

  const params = {
    Source: 'adam@colpitts.dev',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },
  }

  try {
    const command = new SendEmailCommand(params)

    const response = await client.send(command)

    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const handler = sendMail
