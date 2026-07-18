import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import AddInternForm from './AddInternForm'

describe('AddInternForm', () => {

  describe('initial state', () => {
    test('name input is empty', () => {
      render(<AddInternForm />)
      expect(screen.getByPlaceholderText('Name')).toHaveValue('')
    })

    test('score input starts at 0', () => {
      render(<AddInternForm />)
      expect(screen.getByPlaceholderText('Score')).toHaveValue(0)
    })

    test('role defaults to Frontend', () => {
      render(<AddInternForm />)
      expect(screen.getByRole('combobox', { name: 'Role' })).toHaveValue('Frontend')
    })
  })

  describe('validation', () => {
    test('shows error when name is empty on submit', async () => {
      const user = userEvent.setup()
     render(<AddInternForm />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    test('shows error when score is above 100', async () => {
      const user = userEvent.setup()
     render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '150')
      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(
  screen.getByText('Score must be 0–100'),
).toBeInTheDocument()
    })

    test('clears error when valid name is entered', async () => {
      const user = userEvent.setup()
     render(<AddInternForm />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))
      expect(screen.getByText('Name is required')).toBeInTheDocument()

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

      await waitFor(() => {
        expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
      })
    })
  })

  describe('on successful submit', () => {
    test('form inputs clear after submission', async () => {
      const user = userEvent.setup()
      render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '92')
      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Name')).toHaveValue('')
      })
    })
  })
})


// import { render, screen, waitFor } from '../test/test-utils'
// import userEvent from '@testing-library/user-event'
// import AddInternForm from './AddInternForm'

// test('updates name when user types', async () => {
//   const user = userEvent.setup()
//   render(<AddInternForm />)

//   await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

//   expect(screen.getByDisplayValue('Rahul')).toBeInTheDocument()
// })

// test('updates score when user types', async () => {
//   const user = userEvent.setup()
//   render(<AddInternForm />)

//   await user.clear(screen.getByPlaceholderText('Score'))
//   await user.type(screen.getByPlaceholderText('Score'), '92')

//   expect(screen.getByDisplayValue('92')).toBeInTheDocument()
// })

// test('resets name input when Reset is clicked', async () => {
//   const user = userEvent.setup()
//   render(<AddInternForm />)

//   await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
//   await user.click(screen.getByRole('button', { name: 'Reset' }))

//   expect(screen.getByPlaceholderText('Name')).toHaveValue('')
// })

// test('shows error when name is empty on submit', async () => {
//   const user = userEvent.setup()
//   render(<AddInternForm />)

//   await user.click(screen.getByRole('button', { name: 'Add Intern' }))

//   expect(screen.getByText('Name is required')).toBeInTheDocument()
// })

// test('shows error when score is above 100', async () => {
//   const user = userEvent.setup()
//   render(<AddInternForm />)

//   await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
//   await user.clear(screen.getByPlaceholderText('Score'))
//   await user.type(screen.getByPlaceholderText('Score'), '150')
//   await user.click(screen.getByRole('button', { name: 'Add Intern' }))

//   expect(screen.getByText('Score must be between 0 and 100')).toBeInTheDocument()
// })

// test('error clears when valid name is entered after failed submit', async () => {
//   const user = userEvent.setup()
//   render(<AddInternForm />)

//   // Trigger the validation error
//   await user.click(screen.getByRole('button', { name: 'Add Intern' }))
//   expect(screen.getByText('Name is required')).toBeInTheDocument()

//   // Fix the error
//   await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

//   // Wait until the error disappears
//   await waitFor(() => {
//     expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
//   })
// })



// userEvent is preferred over fireEvent because it simulates real user actions
// like typing, clicking, and focusing on elements. This makes tests behave
// more like how users actually interact with the application.

// **Observe:** `vi.fn()` creates a tracked mock function. You can assert how many times it was called and with what arguments.

// **Write a comment** explaining what `expect.objectContaining(...)` does and why it is more flexible than asserting an exact object match.
// expect.objectContaining(...) checks only the properties we care about,
// while ignoring any extra properties in the object. This makes the test
// more flexible and less likely to fail because of unrelated changes.

// toHaveBeenCalledTimes(0) checks that a function was called exactly zero times.
// not.toHaveBeenCalled() checks that it was never called at all.
// not.toHaveBeenCalled() is usually clearer because it directly expresses the intent.


  // **Observe:** When a test fails, Vitest shows the full path: `AddInternForm > validation > shows error when name is empty on submit`. This pinpoints exactly what broke without reading the test body.

  // **Write a comment** explaining the rule: nest `describe` blocks two levels deep at most. Why does deeper nesting become a problem?

// Keep describe blocks no more than two levels deep so tests stay easy to read
// and locate. Too much nesting makes test names long and the test structure
// harder to understand and maintain.