import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import createError from 'http-errors'
//import { commonMiddleware } from 'src/lib/commonMiddleware'

// a client can be shared by different commands.
const client = new SESClient({ region: "ca-central-1" });

async function sendMail(event: any) {
  const params = {
    Source: 'adam@colpitts.dev',
    Destination: {
      ToAddresses: ['adam@colpitts.dev']
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from AWS SES'
        }
      },
      Subject: {
        Data: 'Test email'
      }
    }
  };

  try {
    const command = new SendEmailCommand(params);

    const result = await client.send(command);
    return result
  } catch (e) {
    console.error(e)
  }

}

export const handler = sendMail //commonMiddleware(sendMail)
