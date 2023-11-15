import { auth } from '@lib/server'
import { HomeTemplateLogin } from './_templates/home-login'

export default function Home() {
  const idToken = 'No Token'

  const isLoggedIn = auth.isAuthenticated()

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <section className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <div className="fixed top-0 left-0 flex justify-center w-full pt-8 pb-6 bg-gray-200 border-b border-gray-300 from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4 dark:bg-zinc-800/30">
          <p>
            Hyperlocal Public Landing
            <br />
            <code className="font-mono font-bold text-gray-600">
              community engagement
            </code>
          </p>
        </div>
      </section>
      {isLoggedIn ? (
        <section className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
          <code className="font-mono font-bold text-gray-600">{idToken}</code>
          <button type="button" className="py-3 bg-pink-400 px-7">
            Go to Dashboard
          </button>
        </section>
      ) : (
        <HomeTemplateLogin />
      )}
    </main>
  )
}
