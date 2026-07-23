import { renderHook, act } from '@testing-library/react'
import useInternForm from './useInternForm'



test('initialises with empty form state', () => {
  const { result } = renderHook(() => useInternForm())

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

test('isValid returns false and sets error when name is empty', () => {
  const { result } = renderHook(() => useInternForm())

  let valid: boolean
  act(() => { valid = result.current.isValid() })

  expect(valid!).toBe(false)
  expect(result.current.error).toBe('Name is required')
})

test('isValid returns true when name and score are valid', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: { name: 'score', value: '92', type: 'number' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  let valid: boolean
  act(() => { valid = result.current.isValid() })

  expect(valid!).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleReset clears form values and error', () => {
  const { result } = renderHook(() => useInternForm())

  // Set a value, trigger a validation error, then reset
  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => result.current.isValid())
  act(() => result.current.handleReset())

  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})



test('shows an error when the name is empty', () => {

  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.isValid()
  })

  expect(result.current.error).toBe('Name is required')
})

test('returns true when the name is Sneha and the score is 88', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: {
        name: 'name',
        value: 'Sneha',
        type: 'text',
      },
    } as React.ChangeEvent<HTMLInputElement>)

    result.current.handleChange({
      target: {
        name: 'score',
        value: '88',
        type: 'number',
      },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  // Act
  let isFormValid = false

  act(() => {
    isFormValid = result.current.isValid()
  })

  // Assert
  expect(isFormValid).toBe(true)
})


test('updates the name field when handleChange receives a name change event', () => {
  // Arrange
  const { result } = renderHook(() => useInternForm())

  const nameChangeEvent = {
    target: {
      name: 'name',
      value: 'Sneha',
      type: 'text',
    },
  } as React.ChangeEvent<HTMLInputElement>

  // Act
  act(() => {
    result.current.handleChange(nameChangeEvent)
  })

  // Assert
  expect(result.current.form.name).toBe('Sneha')
})


// The three AAA phases are clearly separated.
// Arrange creates the hook before it is used.
// Act calls isValid() with the default empty name.
// Assert checks only the error produced by isValid().

// Hook tests check the logic directly without involving the UI.
// They make it easier to verify state changes and quickly identify whether
// a bug is in the hook logic or in the component that uses the hook.