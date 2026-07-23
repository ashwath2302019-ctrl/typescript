// 1. Statements – percentage of executable statements tested.
// 2. Branches – percentage of conditions such as if, else, and ternary paths tested.
// 3. Functions – percentage of functions called by tests.
// 4. Lines – percentage of source-code lines executed.
//
// The lowest value must be copied from your own coverage report.
// In many projects, branch coverage is the lowest because every possible
// condition and alternative path must be tested separately.


if (form.name.trim() === '') {
  setError('Name is required')
  return false
}

if (form.score < 0 || form.score > 100) {
  setError('Score must be between 0 and 100')
  return false
}

// The yellow branch appears in useInternForm.ts.
// The condition for a score greater than 100 was not tested.
// A score such as 101 would trigger the uncovered branch.


[name]: type === 'checkbox'
  ? checked
  : name === 'score'
    ? Number(value)
    : value


    // The yellow branch appears in useInternForm.ts.
// The checkbox path in handleChange was not tested.
// A change event with type: 'checkbox' and checked: false
// would trigger the uncovered branch.

Task 5.4 — The 100% trap

test('just to hit the line', () => {
  const form = {
    name: '',
    score: 0,
    isPresent: true,
    role: 'Frontend',
  }

  JSON.stringify(form)

  expect(true).toBe(true)
})


// This test may increase line or statement coverage because the code runs.
// However, it does not improve test quality because it does not verify
// any useful behaviour.
//
// expect(true).toBe(true) can never fail, even when the application has
// a real bug. Therefore, this test cannot detect defects and gives a
// misleading impression that the code is properly tested.
//
// High coverage only shows that code was executed. It does not prove that
// the correct behaviour was verified. This test should be deleted.


Task 6.1
// The test "returns true when the name is Sneha and the score is 88"
// could be improved.
//
// It partially violates the Self-validating principle because it only
// checks the return value of isValid().
//
// A better version would also verify that no error message is present,
// making the expected behaviour clearer.


test('updates the name field', () => {
  expect.hasAssertions()

  // Arrange
  ...

  // Act
  ...

  // Assert
  expect(result.current.form.name).toBe('Sneha')
})


// All tests passed after adding expect.hasAssertions().
// No tests failed because every test already contained at least one real assertion.