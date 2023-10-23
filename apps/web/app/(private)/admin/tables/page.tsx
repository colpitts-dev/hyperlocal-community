'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

export default withPageAuthRequired(function Tables({ user }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- ignore
  const { name, email, picture } = user
  return (
    <>
      <h3 className="text-3xl font-medium text-gray-700">Tables</h3>

      <div className="mt-4">
        <h4 className="text-gray-600">Simple Table</h4>

        <div className="mt-6">
          <div className="my-6 overflow-hidden bg-white rounded-md shadow">
            <table className="w-full text-left border-collapse">
              <thead className="border-b">
                <tr>
                  <th className="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800">
                    City
                  </th>
                  <th className="px-5 py-3 text-sm font-medium text-gray-100 uppercase bg-indigo-800">
                    Total orders
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-200">
                  <td className="px-6 py-4 text-lg text-gray-700 border-b">
                    New York
                  </td>
                  <td className="px-6 py-4 text-gray-500 border-b">200,120</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="px-6 py-4 text-lg text-gray-700 border-b">
                    Manchester
                  </td>
                  <td className="px-6 py-4 text-gray-500 border-b">632,310</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="px-6 py-4 text-lg text-gray-700 border-b">
                    London
                  </td>
                  <td className="px-6 py-4 text-gray-500 border-b">451,110</td>
                </tr>
                <tr className="hover:bg-gray-200">
                  <td className="px-6 py-4 text-lg text-gray-700 border-b">
                    Madrid
                  </td>
                  <td className="px-6 py-4 text-gray-500 border-b">132,524</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Table with pagination</h4>

        <div className="mt-6">
          <h2 className="text-xl font-semibold leading-tight text-gray-700">
            Users
          </h2>

          <div className="flex flex-col mt-3 sm:flex-row">
            <div className="flex">
              <div className="relative">
                <select className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select className="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                  <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative block mt-2 sm:mt-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-gray-500 fill-current"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>

              <input
                placeholder="Search"
                className="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      User
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Rol
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Created at
                    </th>
                    <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>

                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Vera Carpenter
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 21, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {' '}
                            Blake Bowman
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 01, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">Activo</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Dana Moore
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 10, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-orange-900">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-orange-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">Suspended</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-5 text-sm bg-white">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Alonzo Cox
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white">
                      <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white">
                      <p className="text-gray-900 whitespace-no-wrap">
                        Jan 18, 2020
                      </p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white">
                      <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900">
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-red-200 rounded-full opacity-50"
                        ></span>
                        <span className="relative">Inactive</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
                <span className="text-xs text-gray-900 xs:text-sm">
                  Showing 1 to 4 of 50 Entries
                </span>

                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-l hover:bg-gray-400">
                    Prev
                  </button>
                  <button className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-r hover:bg-gray-400">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Wide Table</h4>

        <div className="flex flex-col mt-6">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                      Title
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-100 border-b border-gray-200">
                      Role
                    </th>
                    <th className="px-6 py-3 bg-gray-100 border-b border-gray-200"></th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        href="#"
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
      </div>
    </>
  )
})
