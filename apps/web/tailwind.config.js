const { theme, darkMode } = require('@evoke-ui/react/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    '../../packages/evoke-ui-react/**/*.{js,ts,tsx,mdx}',
  ],
  darkMode,
  theme,
  plugins: [require('@tailwindcss/forms')],
}
