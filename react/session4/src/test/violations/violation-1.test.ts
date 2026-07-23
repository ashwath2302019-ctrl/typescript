import { test, expect } from 'vitest'

const interns: { id: number; name: string }[] = []

test('can add first intern', () => {
  interns.push({ id: 1, name: 'Rahul' })
  expect(interns).toHaveLength(1)
})

test('can add second intern', () => {
  interns.push({ id: 2, name: 'Priya' })
  expect(interns).toHaveLength(2)   // fails if run alone
})


// Violates the Independent principle.
// The second test depends on the first test adding Rahul to the shared interns array.
// When the second test runs alone, the array contains only Priya, so its length is 1 instead of 2.



// test('score report has today's date', () => {
//   const report = { date: new Date().toISOString().slice(0, 10) }
//   expect(report.date).toBe('2024-11-15')   // hardcoded — fails tomorrow
// })

// Violates the Repeatable principle.
// The result depends on the current system date, but the expected date is hardcoded.
// It passes only on 2024-11-15 and fails on every other date, including today.


test('calculates average score', () => {
  const scores = [92, 78, 45, 95]
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  console.log('Average:', avg)    // no assertion
})

// Violates the Self-validating principle.
// The test has no expect() assertion, so it always passes even when the calculated average is incorrect.
// This is dangerous because it can hide calculation errors and give a false successful test result.



test('loads interns from API', async () => {
  const response = await fetch('http://localhost:5173/api/interns')
  const data = await response.json()
  expect(data).toHaveLength(4)
})


// Violates the Fast and Repeatable principles.
// It is slow because it makes a real network request instead of using mocked data.
// It is not repeatable because it depends on the local API server being available and returning exactly four interns.
// It will fail in CI when the server is not running at localhost:5173.