'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

export default withPageAuthRequired(function Forms({ user }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- ignore
  const { name, email, picture } = user
  return (
    <>
      <h3 className="text-3xl font-semibold text-gray-700">Forms</h3>

      <div className="mt-4">
        <h4 className="text-gray-600">Model Form</h4>

        <div className="mt-4">
          <div className="w-full max-w-sm overflow-hidden bg-white border rounded-md shadow-md">
            <form>
              <div className="flex items-center justify-between px-5 py-3 text-gray-700 border-b">
                <h3 className="text-sm">Add Category</h3>
                <button type="button">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>

              <div className="px-5 py-6 text-gray-700 bg-gray-200 border-b">
                <span className="text-xs">Name</span>

                <div className="relative mt-2 rounded-md shadow-sm">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="w-full px-12 py-2 rounded-md appearance-none form-input focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-5 py-3">
                <button className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
                  Cancel
                </button>
                <button className="px-3 py-1 text-sm rounded-md text-on-primary bg-primary focus:outline-none">
                  Save
                </button>
                <button className="px-3 py-1 text-sm rounded-md text-on-secondary bg-secondary focus:outline-none">
                  Delete
                </button>
                <button className="px-3 py-1 text-sm rounded-md text-on-tertiary bg-tertiary focus:outline-none">
                  Duplicate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Forms</h4>

        <div className="mt-4">
          <div className="p-6 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Account settings
            </h2>

            <form>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="w-full mt-2 rounded-md form-input focus:border-primary"
                    type="text"
                  />
                </div>

                <div>
                  <label className="text-gray-700" htmlFor="emailAddress">
                    Email Address
                  </label>
                  <input
                    className="w-full mt-2 rounded-md form-input focus:border-primary"
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full mt-2 rounded-md form-input focus:border-primary"
                    type="password"
                  />
                </div>

                <div>
                  <label
                    className="text-gray-700"
                    htmlFor="passwordConfirmation"
                  >
                    Password Confirmation
                  </label>
                  <input
                    className="w-full mt-2 rounded-md form-input focus:border-primary"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 text-gray-200 rounded-md bg-primary hover:opacity-80 focus:outline-none focus:bg-gray-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
})
