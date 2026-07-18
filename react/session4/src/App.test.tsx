import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { ThemeProvider } from './contexts/theme-context'
import { InternProvider } from './contexts/intern-context'

test('renders intern names', () => {
  render(
    <ThemeProvider>
      <InternProvider>
        <App />
      </InternProvider>
    </ThemeProvider>
  )

  expect(screen.getByText('Rahul')).toBeInTheDocument()
  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Amit')).toBeInTheDocument()
})