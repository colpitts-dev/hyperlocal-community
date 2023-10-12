import { getSession } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'
import { Card } from '@evoke-ui/react'
import styles from './page.module.css'

const LINKS = [
  {
    title: 'Docs',
    href: 'https://turbo.build/repo/docs',
    description: 'Find in-depth information about Turborepo features and API.',
  },
  {
    title: 'Learn',
    href: 'https://turbo.build/repo/docs/handbook',
    description: 'Learn more about monorepos with our handbook.',
  },
  {
    title: 'Templates',
    href: 'https://turbo.build/repo/docs/getting-started/from-example',
    description: 'Choose from over 15 examples and deploy with a single click.',
  },
  {
    title: 'Deploy',
    href: 'https://vercel.com/new',
    description:
      ' Instantly deploy your Turborepo to a shareable URL with Vercel.',
  },
]

export default async function Index(): Promise<JSX.Element> {
  const session = await getSession()
  if (session?.user) redirect('/dashboard')

  return (
    <>
      <header className={styles.header}>
        <a className={styles['login-btn']} href="/api/auth/login">
          Login
        </a>
      </header>
      <main className={styles.main}>
        <section className="bg-yellow-300">
          <h1>
            <span className="text-primary">Hyper</span>
            <span className="text-primary-variant">local</span>
          </h1>
          <p>Public Landing Page</p>
        </section>
        <section className="bg-yellow-300">
          <div className={styles.grid}>
            {LINKS.map(({ title, href, description }) => (
              <Card
                className={styles.card}
                href={href}
                key={title}
                title={title}
              >
                {description}
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
