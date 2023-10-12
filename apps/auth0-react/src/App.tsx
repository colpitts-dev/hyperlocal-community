import React from 'react'

import { LoginButton } from './components/login-button'
import { LogoutButton } from './components/logout-button'
import { useAuth0 } from '@auth0/auth0-react'

function Profile(): JSX.Element | null {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return isAuthenticated ? (
    <div>
      <img alt={user?.name} src={user?.picture} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  ) : null
}

function App() {
  return (
    <div>
      <header>
        <LoginButton />
        <LogoutButton />
      </header>
      <main>
        <Profile />
      </main>
    </div>
  )
}

export default App
