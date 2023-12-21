export async function handler(event: any, context: any) {
  // Note: AWS does not allow arrays in claims, so we need to split it
  const claims = {
    ...event?.requestContext.authorizer,
    aud: event?.requestContext.authorizer.aud.split(','),
  }

  return {
    statusCode: 200,
    headers: {
      /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
      /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(claims),
  }
}
