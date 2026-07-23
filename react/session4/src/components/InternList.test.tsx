import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '../test/test-utils'
import InternList from './InternList'

const interns = [
  {
    id: 1,
    name: 'Rahul',
    score: 92,
    role: 'Frontend',
    isPresent: true,
  },
  {
    id: 2,
    name: 'Priya',
    score: 85,
    role: 'Backend',
    isPresent: true,
  },
]

describe('InternList', () => {
  test('renders all interns', () => {
    render(<InternList interns={interns} onRemove={vi.fn()} />)

    expect(screen.getByText('Rahul')).toBeInTheDocument()
    expect(screen.getByText('Priya')).toBeInTheDocument()
  })

  test('renders correct number of intern cards', () => {
    render(<InternList interns={interns} onRemove={vi.fn()} />)

    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(2)
  })
})