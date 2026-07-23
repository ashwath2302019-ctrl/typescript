import { render, screen } from '../test/test-utils'
import InternCard from './Interncard'

// getBy — throws if element is not found
test('getByText throws when element is missing', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  // This passes — element exists
  expect(screen.getByText('Rahul')).toBeInTheDocument()

  // Uncommenting the line below would throw an error — try it
  // screen.getByText('Priya')
})

// queryBy — returns null if element is not found (does not throw)
test('queryBy returns null when element is missing', () => {
  render(<InternCard name="Rahul" score={92} isPresent={true} />)

  // Use queryBy when asserting something is NOT present
  expect(screen.queryByText('Absent')).not.toBeInTheDocument()
})

// getAllBy — finds multiple elements
test('getAllBy finds multiple elements', () => {
  render(
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
    </div>
  )

  // Both cards show 'Present' — getAllByText returns an array
  const presentBadges = screen.getAllByText('Present')
  expect(presentBadges).toHaveLength(2)
})

// **Observe:** `getBy` is for things that must be present. `queryBy` is for asserting absence. `findBy` is for async — you will use it in Section 4.

// **Write a comment** explaining when you would use `getAllByRole` vs `getByRole`.

// getByRole is used when you expect only one element with a specific role.
// getAllByRole is used when multiple elements with the same role should be present,
// such as a list of buttons or list items.