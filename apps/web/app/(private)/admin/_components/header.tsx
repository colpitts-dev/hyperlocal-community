/* eslint-disable @next/next/no-img-element -- ignore */
export default function Header(): JSX.Element {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-primary">
      <div className="flex items-center">
        <button
          className="text-gray-500 focus:outline-none lg:hidden"
          type="button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        <div className="relative mx-4 lg:mx-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>

          <input
            className="w-64 pl-10 pr-4 rounded-md form-input focus:border-primary"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button
            className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
            type="button"
          >
            <img
              alt="Your avatar"
              className="object-cover w-full h-full"
              src="https://placekeanu.com/80/80"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
