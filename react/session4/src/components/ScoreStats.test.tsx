import { render, screen, waitFor } from '../test/test-utils'
import ScoreStats from './ScoreStats'

test('shows initial statistics', () => {
  render(<ScoreStats />)

  expect(
    screen.getByText(/Highest:\s*0.*Lowest:\s*0.*Avg:\s*0/),
  ).toBeInTheDocument()

  expect(
    screen.getByText(/Passing:\s*0\s*of\s*0/),
  ).toBeInTheDocument()
})

test('shows calculated statistics after interns load', async () => {
  render(<ScoreStats />)

  await waitFor(() => {
    expect(
      screen.getByText(/Highest:\s*95.*Lowest:\s*45.*Avg:\s*78/),
    ).toBeInTheDocument()
  })
})

test('shows the number of passing interns', async () => {
  render(<ScoreStats />)

  await waitFor(() => {
    expect(
      screen.getByText(/Passing:\s*3\s*of\s*4/),
    ).toBeInTheDocument()
  })
})

// Use findBy when waiting for a single element to appear.
// Use waitFor when checking more complex conditions, such as multiple elements,
// an element disappearing, or several assertions that need to become true.