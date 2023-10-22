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
        light: `var(--theme-color-light, #f8f9fa)`,
        dark: `var(--theme-color-dark, #191919)`,

        primary: `var(--theme-color-primary, #2b65ba)`,
        secondary: `var(--theme-color-secondary, #c22f27)`,
        tertiary: `var(--theme-color-tertiary, #f0da4a)`,

        background: 'var(--theme-color-background, #f8f9fa)',
        surface: 'var(--theme-color-surface, #ffffff)',
        error: `var(--theme-color-error, ${colors.red['500']})`,
        border: `var(--theme-color-border, #f1f1f1)`,
        alert: `var(--theme-color-alert, ${colors.yellow['500']})`,
        header: 'var(--theme-color-header, #ffffff)',
        info: `var(--theme-color-info, ${colors.blue['500']})`,
        success: `var(--theme-color-success, ${colors.green['500']})`,
        warning: `var(--theme-color-warning, ${colors.orange['500']})`,

        'on-primary': 'var(--theme-color-on-primary, #f8f9fa)',
        'on-secondary': 'var(--theme-color-on-secondary, #f8f9fa)',
        'on-tertiary': 'var(--theme-color-on-tertiary, #1a1a1a)',
        'on-background': 'var(--theme-color-on-background, #1a1a1a)',
        'on-surface': 'var(--theme-color-on-surface, #1a1a1a)',
        'on-error': 'var(--theme-color-on-error, #ffffff)',
        'on-alert': 'var(--theme-color-on-error, #ffffff)',
        'on-info': 'var(--theme-color-on-info, #ffffff)',
        'on-success': 'var(--theme-color-on-success, #ffffff)',
        'on-warning': 'var(--theme-color-on-warning, #ffffff)',
      },
      borderRadius: {
        DEFAULT: 'var(--theme-border-radius, 0.25rem)',
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        auto: 'repeat(auto-fit, minmax(1fr))',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
