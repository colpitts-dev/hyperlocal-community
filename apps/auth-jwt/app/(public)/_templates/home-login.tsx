'use client'

import { useState } from 'react'

export function HomeTemplateLogin() {
  const [idToken, setIdToken] = useState('No Token')

  const handleRequestToken = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    try {
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
      })
      // eslint-disable-next-line no-console -- ignore
      console.log('AUTH: ', res.status)
      setIdToken('Token Success')
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
      const res = await fetch(`api/private`, {
        method: 'POST',
      })
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
    <section className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
      <code className="font-mono font-bold text-gray-600">{idToken}</code>
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
