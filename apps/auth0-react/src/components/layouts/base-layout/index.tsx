'use client'
import { Auth0Provider } from '@auth0/auth0-react'

export function BaseLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const redirectURL =
    typeof window === 'undefined' ? '' : window.location.origin
  return (
    <Auth0Provider
      authorizationParams={{
        redirect_uri: redirectURL,
      }}
      clientId="Gl3Tl8L3oZWoEWOXEJvfzLMPfWWrAntH"
      domain="hyperlocal-auth.us.auth0.com"
    >
      {children}
    </Auth0Provider>
  )
}
