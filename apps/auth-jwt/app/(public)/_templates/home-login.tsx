'use client'

import { useState } from 'react'

export function HomeTemplateLogin() {
  const [idToken, setIdToken] = useState('No Token')

  const handleRequestToken = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    try {
      const data = {
        email: 'ezekiel30@gmail.com',
        password: 'Password123!',
      }

      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })

      // const res = await fetch(
      //   `https://08v58uf13l.execute-api.ca-central-1.amazonaws.com/dev/oauth/token`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       //grant_type: 'password',
      //       //client_id: process.env.CLIENT_ID,
      //       //client_secret: process.env.CLIENT_SECRET,
      //       email: data.email,
      //       password: data.password,
      //     }),
      //   },
      // )

      const json = await res.json()
      // eslint-disable-next-line no-console -- ignore
      //console.log('AUTH: ', res.status)
      // eslint-disable-next-line no-console -- ignore
      console.log('data: ', res.body)
      setIdToken(json?.jwt as string)
    } catch (error: any) {
      // eslint-disable-next-line no-console -- ignore
      console.log(error)
    }
  }

  const handleClearToken = async () => {
    try {
      const res = await fetch(`/api/auth/logout`, {
        method: 'POST',
      })
      // eslint-disable-next-line no-console -- todo remove
      console.log('LOGOUT: ', res.status)
      setIdToken('No Token')
    } catch (e) {
      // eslint-disable-next-line no-console -- todo: log to server
      console.log(e)
    }
  }

  const handleProtectedRequest = async () => {
    try {
      const res = await fetch(`api/private`)
      if (res.status === 401) {
        return 'Unauthorized'
      }
      const data = await res.json()

      // eslint-disable-next-line no-console -- todo remove
      console.log({ data })
    } catch (e) {
      // eslint-disable-next-line no-console -- todo: log to server
      console.log(e)
    }
  }

  return (
    <section className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg: lg:flex-col">
      <code className="flex w-full pb-6 font-mono font-bold text-gray-600">
        {idToken}
      </code>
      <div className="flex space-x-4">
        <button
          type="button"
          className="py-3 text-white bg-pink-400 px-7"
          onClick={handleClearToken}
        >
          Clear Token
        </button>
        <button
          type="button"
          className="py-3 text-white bg-pink-400 px-7"
          onClick={handleRequestToken}
        >
          Request Token
        </button>
        <button
          type="button"
          className="py-3 text-white bg-pink-400 px-7"
          onClick={handleProtectedRequest}
        >
          Test Protected
        </button>
      </div>
    </section>
  )
}
