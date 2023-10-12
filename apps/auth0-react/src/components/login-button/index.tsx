'use client'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function LoginButton(): JSX.Element {
  const { loginWithRedirect } = useAuth0()

  return (
    <button
      data-testid="login-button"
      onClick={() => void loginWithRedirect()}
      type="button"
    >
      Log In
    </button>
  )
}
