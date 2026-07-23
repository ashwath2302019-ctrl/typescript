import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import InternRow from './InternRow'

test('clicking Remove calls onRemove', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  await user.click(screen.getByRole('button', { name: 'Remove' }))

  expect(onRemove).toHaveBeenCalledWith(1)
})


test('calls onRemove with the correct id when Remove is clicked', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  await user.click(screen.getByRole('button', { name: 'Remove' }))

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})

test('does not call onRemove when row is only rendered', () => {
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  // No interaction — callback should not fire
  expect(onRemove).not.toHaveBeenCalled()
})



  // screen.debug() prints the current HTML rendered in the test.
  // It helps us inspect the elements and choose the correct query,
  // such as getByRole, getByText, or getByLabelText.
  // screen.debug()


// **Write a comment** explaining what `vi.fn()` does — how is it different from passing a real function?
  // vi.fn() creates a mock function that records how it is called during a test.
// Unlike a real function, it lets us check how many times it was called and
// what arguments were passed to it.