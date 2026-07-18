import { render, screen } from '../test/test-utils'
import InternCard from './Interncard'

test('renders the intern name', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()
})

test('renders the score', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.getByText('Score: 92')).toBeInTheDocument()
})

test('shows Present when isPresent is true', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.getByText('Present')).toBeInTheDocument()
})

test('shows Absent when isPresent is false', () => {
  render(<InternCard name="Amit" score={45} isPresent={false} />)

  expect(screen.getByText('Absent')).toBeInTheDocument()
})

test('does not show Absent when intern is present', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(screen.queryByText('Absent')).not.toBeInTheDocument()
})

test('does not show Present when intern is absent', () => {
  render(<InternCard name="Amit" score={45} isPresent={false} />)

  expect(screen.queryByText('Present')).not.toBeInTheDocument()
})

test('renders score of 0 correctly', () => {
  render(<InternCard name="Neha" score={0} isPresent={false} />)

  expect(screen.getByText('Score: 0')).toBeInTheDocument()
  expect(screen.getByText('Absent')).toBeInTheDocument()
})

test('renders score of 100 correctly', () => {
  render(<InternCard name="Neha" score={100} isPresent={true} />)

  expect(screen.getByText('Score: 100')).toBeInTheDocument()
  expect(screen.getByText('Present')).toBeInTheDocument()
})

test('renders a different name and score without mixing up values', () => {
  render(<InternCard name="Priya" score={75} isPresent={true} />)

  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Score: 75')).toBeInTheDocument()
})

test('no console errors during InternCard render', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  expect(spy).not.toHaveBeenCalled()
  spy.mockRestore()
})

// We import render and screen from ../test/test-utils because it wraps components
// with the required providers (such as context providers), so every test uses the
// same setup without repeating code.

// **Write a comment** explaining the difference between `toBeInTheDocument()` and `not.toBeInTheDocument()` — when do you use `getBy` vs `queryBy` for each?
// toBeInTheDocument() checks that an element exists in the page, so we use getBy
// because it throws an error if the element is not found.
// not.toBeInTheDocument() checks that an element does not exist, so we use queryBy
// because it returns null instead of throwing an error.


// **Write a comment** explaining why it matters to test `score={0}` and `score={100}` separately from a typical middle value like `score={92}`.

// Testing score={0} and score={100} helps verify that the component works
// correctly at the minimum and maximum values. Edge cases often reveal bugs
// that may not appear when testing a normal value like score={92}.

// **Write a comment** explaining the difference between `vi.fn()`, `vi.mock()`, and `vi.spyOn()` — one sentence each.

// vi.fn() creates a mock function that records how it is called during a test.
// vi.mock() replaces an entire module with a mocked version.
// vi.spyOn() watches an existing function, allowing you to track or replace its behavior.