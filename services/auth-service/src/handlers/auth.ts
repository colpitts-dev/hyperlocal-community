import jwt from 'jsonwebtoken'

// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimising costs.
const generatePolicy = (principalId: string, methodArn: string) => {
  const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*'

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: apiGatewayWildcard,
        },
      ],
    },
  }
}

export async function handler(event: any) {
  if (!event.authorizationToken) {
    throw 'Unauthorized'
  }

  const token = event.authorizationToken.replace('Bearer ', '')

  const apiGatewayWildcard = event.methodArn.split('/', 2).join('/') + '/*'

  console.log({ apiGatewayWildcard })
  try {
    const claims = jwt.verify(token, process.env.OAUTH_PUBLIC_KEY as string)
    const { aud, ...contextClaims } = claims as any
    const policy = generatePolicy(claims.sub as string, event.methodArn)

    console.log({ contextClaims })
    return {
      ...policy,
      context: {
        ...contextClaims,
        aud: aud.toString(),
      },
    }
  } catch (error) {
    console.log(error)
    throw 'Unauthorized'
  }
}
