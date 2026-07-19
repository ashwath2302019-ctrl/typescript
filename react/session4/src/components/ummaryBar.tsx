// src/test/SummaryBar.test.ts
import { render, screen } from '@testing-library/react'
import { vi, test, expect } from 'vitest'
import SummaryBar from '../components/SummaryBar'   

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      {
        id: 1,
        name: 'Rahul',
        score: 92,
        isPresent: true,
        role: 'Frontend',
      },
      {
        id: 2,
        name: 'Priya',
        score: 78,
        isPresent: true,
        role: 'Backend',
      },
      {
        id: 3,
        name: 'Amit',
        score: 45,
        isPresent: false,
        role: 'Frontend',
      },
    ],
    isLoading: false,
    addIntern: vi.fn(),
    removeIntern: vi.fn(),
  }),
}))

test('shows the total intern count as 3', () => {
  // Arrange
  render(<SummaryBar />)

  // Act
  const totalCount = screen.getByText(/total.*3/i)

  // Assert
  expect(totalCount).toBeInTheDocument()
})

test('shows the present intern count as 2', () => {
  // Arrange
  render(<SummaryBar />)

  // Act
  const presentCount = screen.getByText(/present.*2/i)

  // Assert
  expect(presentCount).toBeInTheDocument()
})

test('shows the average intern score as 71.7', () => {
  // Arrange
  render(<SummaryBar />)

  // Act
  const averageScore = screen.getByText(/average.*71\.7/i)

  // Assert
  expect(averageScore).toBeInTheDocument()
})






// SummaryBar dependencies:
//
// 1. useInterns()
//    - A custom hook imported from the intern context.
//    - It provides the interns array and possibly isLoading,
//      addIntern, and removeIntern.
//
// 2. InternContext
//    - useInterns() normally reads its values from InternProvider.
//
// 3. React calculations such as useMemo, if used inside SummaryBar.
//    - These are internal React features and do not need to be mocked.
//
// Using the real InternProvider could make the test less isolated.
// If the provider loads data asynchronously or uses an API, the test
// could become slow and non-repeatable.
//
// Shared or changing context data could also make the test depend on
// the state created by another test, making it order-dependent.


// 1. We did not mock useState or useMemo because they are internal React
// features, not external dependencies of SummaryBar. Mocking them would
// test React's implementation instead of the behaviour of SummaryBar.

// 2. We provided mock functions for addIntern and removeIntern because
// they may be required by the useInterns return type. This test does not
// verify them. If SummaryBar accidentally called one of these functions,
// vi.fn() would prevent a real state change, but the test would not fail
// unless we explicitly asserted that the function was not called.

// 3. The mock may break if the Intern interface receives a new required
// field and the mock data is type-checked as Intern[]. TypeScript would
// show an error explaining that the new property is missing. If the mock
// is not typed, it might not break until the component tries to use the
// missing field.