import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import createError from 'http-errors'
//import { commonMiddleware } from 'src/lib/commonMiddleware'

// a client can be shared by different commands.
const client = new SESClient({ region: 'ca-central-1' })

async function sendMail(event: any) {
  const record = event.Records[0]
  console.log('record processing', record)

  const email = JSON.parse(record.body)

  const { subject, body, recipient } = email

  const params = {
    Source: 'adam@colpitts.dev',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
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

    const result = await client.send(command)
    return result
  } catch (e) {
    console.error(e)
  }
}

export const handler = sendMail //commonMiddleware(sendMail)
