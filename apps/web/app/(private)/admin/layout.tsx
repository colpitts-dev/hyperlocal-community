import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Header from './_components/header'
import Sidebar from './_components/sidebar'

export const metadata: Metadata = {
  title: 'Hyperlocal | Dashboard',
  description: 'Hyperlocal Private Members Dashboard',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <UserProvider>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-8 mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </UserProvider>
  )
}
