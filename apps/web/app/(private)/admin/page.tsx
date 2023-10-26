'use client'

import { useEffect, useState } from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

interface MyCommunity {
  title: string
  description: string
  isPublic: boolean
  memberships: string[]
  theme?: object
}
export default withPageAuthRequired(function AdminDashboard() {
  const [data, setData] = useState<MyCommunity[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await fetch('http://localhost:4001/dev/communities')
        .then(res => res.json())
        .then(json => {
          setData(json as MyCommunity[])
          setIsLoading(false)
        })
    }
    void fetchData()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No community data</p>

  return (
    <>
      <h3 className="text-3xl font-medium text-gray-700">Communities</h3>

      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          {data.map(({ title, description, theme, memberships }) => {
            const themePrimary = {
              backgroundColor: (theme as { light: { primary: string } }).light
                .primary,
              color: (theme as { light: { 'on-primary': string } }).light[
                'on-primary'
              ],
            }

            const themeSecondary = {
              backgroundColor: (theme as { light: { secondary: string } }).light
                .secondary,
              color: (theme as { light: { 'on-secondary': string } }).light[
                'on-secondary'
              ],
            }

            const themeTertiary = {
              backgroundColor: (theme as { light: { tertiary: string } }).light
                .tertiary,
              color: (theme as { light: { 'on-tertiary': string } }).light[
                'on-tertiary'
              ],
            }

            const themeLight = {
              color: (theme as { ui: { dark: string } }).ui.dark,
              backgroundColor: (theme as { ui: { light: string } }).ui.light,
            }

            const themeDark = {
              backgroundColor: (theme as { ui: { dark: string } }).ui.dark,
              color: (theme as { ui: { light: string } }).ui.light,
            }

            return (
              <div key={title} className="w-full px-6 my-4 sm:w-1/2 xl:w-1/3">
                <div className="text-gray-500">{title}</div>
                <div className="flex items-center px-5 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-opacity-75 rounded-full bg-primary">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      />
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      />
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {memberships.length}
                    </h4>
                    <div className="text-gray-500">Members</div>
                  </div>

                  <div className="w-full my-4">
                    <div style={themeDark}>&nbsp;</div>
                    <div style={themePrimary}>&nbsp;</div>
                    <div style={themeSecondary}>&nbsp;</div>
                    <div style={themeTertiary}>&nbsp;</div>
                    <div style={themeLight}>&nbsp;</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-8"></div>

      <div className="flex flex-col mt-8">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Title
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Role
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>

              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://placekeanu.com/40/40"
                          alt=""
                        />
                      </div>

                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                          John Doe
                        </div>
                        <div className="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">
                      Software Engineer
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    Owner
                  </td>

                  <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                    <a
                      href="#/"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://placekeanu.com/40/40"
                          alt=""
                        />
                      </div>

                      <div className="ml-4">
                        <div className="text-sm font-medium leading-5 text-gray-900">
                          John Doe
                        </div>
                        <div className="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">
                      Software Engineer
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    Owner
                  </td>

                  <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                    <a
                      href="#/"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
})
