import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders a login button', () => {
  render(<App />)
  const loginButton = screen.queryByTestId('login-button')
  expect(loginButton).toBeInTheDocument()
})
