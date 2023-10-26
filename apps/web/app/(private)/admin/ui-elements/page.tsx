'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'

export default withPageAuthRequired(function UIElements({ user }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- ignore
  const { name, email, picture } = user
  return (
    <>
      <h3 className="text-3xl font-medium text-gray-700">UI Elements</h3>

      <div className="mt-4">
        <h4 className="text-gray-600">Alerts</h4>

        <div className="mt-4">
          <div className="px-4 py-4 overflow-x-auto whitespace-no-wrap bg-white rounded-md">
            <div className="inline-flex w-full max-w-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 bg-green-500">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold text-green-500">Success</span>
                  <p className="text-sm text-gray-600">
                    Your account was registered!
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex w-full max-w-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 bg-blue-500">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                </svg>
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold text-blue-500">Info</span>
                  <p className="text-sm text-gray-600">
                    This channel archived by owner !
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex w-full max-w-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 bg-yellow-500">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                </svg>
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold text-yellow-500">Warning</span>
                  <p className="text-sm text-gray-600">
                    Your image size is to large !
                  </p>
                </div>
              </div>
            </div>

            <div className="inline-flex w-full max-w-sm ml-3 overflow-hidden bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 bg-red-500">
                <svg
                  className="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>
              </div>

              <div className="px-4 py-2 -mx-3">
                <div className="mx-3">
                  <span className="font-semibold text-red-500">Error</span>
                  <p className="text-sm text-gray-600">
                    Your email is already used!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Radio Buttons</h4>

        <div className="mt-4">
          <div className="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="w-5 h-5 text-gray-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-red-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-orange-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-yellow-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-green-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-teal-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-blue-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-indigo-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-purple-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="radio"
                className="w-5 h-5 text-pink-600 form-radio"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Checkboxes</h4>

        <div className="mt-4">
          <div className="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 text-gray-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-red-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-orange-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-yellow-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-green-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-teal-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-indigo-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-purple-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>

            <label className="inline-flex items-center ml-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-pink-600 form-checkbox"
                checked
              />
              <span className="ml-2 text-gray-700">label</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Buttons</h4>

        <div className="mt-4">
          <div className="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
            <button className="px-6 py-3 font-medium tracking-wide text-white bg-gray-600 rounded-md hover:bg-gray-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-red-600 rounded-md hover:bg-red-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-orange-600 rounded-md hover:bg-orange-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-yellow-600 rounded-md hover:bg-yellow-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-green-600 rounded-md hover:bg-green-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-teal-600 rounded-md hover:bg-teal-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-blue-600 rounded-md hover:bg-blue-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-purple-600 rounded-md hover:bg-purple-500">
              Button
            </button>
            <button className="px-6 py-3 ml-3 font-medium tracking-wide text-white bg-pink-600 rounded-md hover:bg-pink-500">
              Button
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-gray-600">Pagnations</h4>

        <div className="mt-4">
          <div className="flex px-4 py-4 overflow-x-auto bg-white rounded-md">
            <div className="flex mr-4 rounded">
              <a
                href="#/"
                className="px-3 py-2 ml-0 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 rounded-l hover:bg-indigo-500 hover:text-white"
              >
                <span>Previous</span>
              </a>
              <a
                href="#/"
                className="px-3 py-2 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
              >
                <span>1</span>
              </a>
              <a
                href="#/"
                className="px-3 py-2 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
              >
                <span>2</span>
              </a>
              <a
                href="#/"
                className="px-3 py-2 leading-tight text-blue-700 bg-white border border-r-0 border-gray-200 hover:bg-indigo-500 hover:text-white"
              >
                <span>3</span>
              </a>
              <a
                href="#/"
                className="px-3 py-2 leading-tight text-blue-700 bg-white border border-gray-200 rounded-r hover:bg-indigo-500 hover:text-white"
              >
                <span>Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
