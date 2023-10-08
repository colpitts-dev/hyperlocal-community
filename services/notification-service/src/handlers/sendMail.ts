import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

// a client can be shared by different commands.
const client = new SESClient({ region: 'ca-central-1' })

export async function sendMail(event: any) {
  const params = {
    Source: 'adam@colpitts.dev',
    Destination: {
      ToAddresses: ['adam@colpitts.dev'],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: 'Hello from SES!',
        },
      },
      Subject: {
        Data: 'Test Email Notification',
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
