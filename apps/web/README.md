## Getting Started

### Authentication

Make sure you have the auth0 env vars for authentication to work properly

```
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The base url of your application
AUTH0_BASE_URL='http://localhost:3000'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_DOMAIN.auth0.com'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
```

You can execute the following command to generate a suitable string for the
AUTH0_SECRET value:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

You can see a full list of Auth0 configuration options in the
["Configuration properties"](https://auth0.github.io/nextjs-auth0/modules/config.html#configuration-properties)
section of the "Module config" document.

For more details about loading environment variables in Next.js, visit the
["Environment Variables"](https://nextjs.org/docs/basic-features/environment-variables)
document.

Auth0 module creates the following route handlers under the hood that perform
different parts of the authentication flow:

`/api/auth/login`: Your Next.js application redirects users to your identity
provider for them to log in (you can optionally pass a returnTo parameter to
return to a custom relative URL after login, for example
/api/auth/login?returnTo=/profile). \
`/api/auth/callback`: Your identity provider redirects users to this route after
they successfully log in. \
`/api/auth/logout`: Your Next.js application logs out the user. \
`/api/auth/me`: You can fetch user profile information in JSON format.

First, install project dependencies:

```bash
yarn
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

To create
[API routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
add an `api/` directory to the `app/` directory with a `route.ts` file. For
individual endpoints, create a subfolder in the `api` directory, like
`api/hello/route.ts` would map to
[http://localhost:3000/api/hello](http://localhost:3000/api/hello).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs) - an
  interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!
