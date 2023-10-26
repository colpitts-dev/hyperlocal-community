import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export const metadata: Metadata = {
  title: 'Hyperlocal | Dashboard',
  description: 'Hyperlocal Private Members Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <UserProvider>{children}</UserProvider>
}
