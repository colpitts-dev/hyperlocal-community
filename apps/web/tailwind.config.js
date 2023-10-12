const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans, sans-serif)', 'sans-serif'],
      serif: ['var(--font-serif, serif)', 'serif'],
    },
    extend: {
      colors: {
        white: `var(--theme-color-white, ${colors.white})`,
        black: `var(--theme-color-black, ${colors.black})`,

        primary: `var(--theme-color-primary, ${colors.pink['600']})`,
        'primary-variant': `var(--theme-color-primary-variant, ${colors.pink['900']})`,
        secondary: `var(--theme-color-secondary, ${colors.slate['600']})`,
        'secondary-variant': `var(--theme-color-secondary-variant, ${colors.slate['900']})`,

        background: 'var(--theme-color-background, #f6f7f9)',
        surface: 'var(--theme-color-surface, #ffffff)',
        error: `var(--theme-color-error, ${colors.red['500']})`,

        'on-primary': 'var(--theme-color-on-primary, #fbcfe8)',
        'on-secondary': 'var(--theme-color-on-secondary, #e4e4e7)',
        'on-background': 'var(--theme-color-on-background, #000000)',
        'on-surface': 'var(--theme-color-on-surface, #000000)',
        'on-error': 'var(--theme-color-on-error, #ffffff)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
