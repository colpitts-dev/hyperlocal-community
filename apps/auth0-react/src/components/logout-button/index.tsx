'use client'

import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function LogoutButton(): JSX.Element {
  const { logout } = useAuth0()

  return (
    <button
      onClick={() =>
        void logout({ logoutParams: { returnTo: window.location.origin } })
      }
      type="button"
    >
      Log Out
    </button>
  )
}
