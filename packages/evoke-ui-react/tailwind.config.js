/* eslint-disable no-undef -- ignore */
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['../../apps/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['var(--theme-font-sans, sans-serif)', 'sans-serif'],
      serif: ['var(--theme-font-serif, serif)', 'serif'],
      mono: ['var(--theme-font-mono, mono)', 'mono'],
    },
    extend: {
      colors: {
        white: `var(--theme-color-white, ${colors.white})`,
        black: `var(--theme-color-black, ${colors.black})`,

        primary: `var(--theme-color-primary, #7baa47)`,
        'primary-variant': `var(--theme-color-primary-variant, #547430)`,
        secondary: `var(--theme-color-secondary, ${colors.slate['600']})`,
        'secondary-variant': `var(--theme-color-secondary-variant, ${colors.slate['900']})`,

        background: 'var(--theme-color-background, #f6f7f9)',
        surface: 'var(--theme-color-surface, #ffffff)',
        error: `var(--theme-color-error, ${colors.red['500']})`,
        border: `var(--theme-color-border, #f1f1f1)`,
        alert: `var(--theme-color-alert, ${colors.yellow['500']})`,
        header: 'var(--theme-color-header, #ffffff)',
        info: `var(--theme-color-info, ${colors.blue['500']})`,
        success: `var(--theme-color-success, ${colors.green['500']})`,
        warning: `var(--theme-color-warning, ${colors.orange['500']})`,

        'on-primary': 'var(--theme-color-on-primary, #ffffff)',
        'on-secondary': 'var(--theme-color-on-secondary, #e4e4e7)',
        'on-background': 'var(--theme-color-on-background, #121212)',
        'on-surface': 'var(--theme-color-on-surface, #121212)',
        'on-error': 'var(--theme-color-on-error, #ffffff)',
        'on-alert': 'var(--theme-color-on-error, #ffffff)',
        'on-info': 'var(--theme-color-on-info, #ffffff)',
        'on-success': 'var(--theme-color-on-success, #ffffff)',
        'on-warning': 'var(--theme-color-on-warning, #ffffff)',
      },
      borderRadius: {
        DEFAULT: 'var(--theme-border-radius, 0.25rem)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
