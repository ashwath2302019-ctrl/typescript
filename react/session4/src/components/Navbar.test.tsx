import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import Navbar from './Navbar'
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from '../contexts/theme-context'

test('renders the dashboard title', () => {
  render(<Navbar />)

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

test('theme toggle button is visible', () => {
  render(<Navbar />)

  expect(
    screen.getByRole('button', { name: /switch to dark mode/i })
  ).toBeInTheDocument()
})

test('theme toggle button label changes after click', async () => {
  const user = userEvent.setup()
  render(<Navbar />)

  await user.click(screen.getByRole('button', { name: /switch to dark mode/i }))

  expect(
    screen.getByRole('button', { name: /switch to light mode/i })
  ).toBeInTheDocument()
})

test('renders correctly when wrapped manually in ThemeProvider', () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})


// **Write a comment** explaining what would happen if you imported 
// `render` from `@testing-library/react` directly instead of from `../test/test-utils` — what error would appear and why.

// Importing render directly from @testing-library/react would not include the
// required providers (such as InternProvider). This would cause an error like
// "useInterns must be used inside InternProvider" because the component depends on context.

// This test checks the same behavior as the earlier tests, but uses customRender
// to provide the required providers automatically. In a real project, customRender
// is preferred because it avoids repeating the same setup in every test.