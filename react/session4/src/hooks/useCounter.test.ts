import { renderHook, act } from '@testing-library/react'
import useCounter from './useCounter'



test('initialises with the default value of 0', () => {
  const { result } = renderHook(() => useCounter())

  expect(result.current.count).toBe(0)
})

test('initialises with a custom initial value', () => {
  const { result } = renderHook(() => useCounter({ initial: 10 }))

  expect(result.current.count).toBe(10)
})

test('increment increases count by 1', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})

test('decrement decreases count by 1', () => {
  const { result } = renderHook(() => useCounter({ initial: 5 }))

  act(() => {
    result.current.decrement()
  })

  expect(result.current.count).toBe(4)
})

test('reset returns count to the initial value', () => {
  const { result } = renderHook(() => useCounter({ initial: 10 }))

  act(() => {
    result.current.increment()
    result.current.increment()
    result.current.reset()
  })

  expect(result.current.count).toBe(10)
})


// **Observe:** No DOM, no rendering, no queries — just typed inputs and typed outputs. Custom hooks are the easiest things to test in React.

// **Write a comment** explaining what `result.current` contains and why you must read it after the `act` call, not before.

// result.current contains the current values and functions returned by the hook.
// After calling act(), the hook state is updated, so reading result.current afterward
// gives the latest state instead of the old value.