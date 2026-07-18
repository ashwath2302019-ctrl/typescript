import { useEffect, useState } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { act, render, screen, within } from './test-utils'
import userEvent from '@testing-library/user-event'
import InternCard from '../components/Interncard'
import AddInternForm from '../components/AddInternForm'

afterEach(() => {
  vi.useRealTimers()
})

describe('Self-learning tests', () => {
  test('fast-forwards a loading delay using fake timers', () => {
    vi.useFakeTimers()

    function LoadingExample() {
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
      }, [])

      return <p>{loading ? 'Loading...' : 'Loaded'}</p>
    }

    render(<LoadingExample />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    act(() => {
      vi.runAllTimers()
    })

    expect(screen.getByText('Loaded')).toBeInTheDocument()

    // vi.useFakeTimers() replaces real timers so setTimeout and setInterval
    // can be controlled without waiting for real time to pass.
  })

  test('uses within to check a score inside one intern card', () => {
    render(
      <>
        <InternCard name="Rahul" score={92} isPresent={true} />
        <InternCard name="Priya" score={85} isPresent={true} />
      </>,
    )

    const rahulCard = screen.getByText('Rahul').closest('div')

    expect(rahulCard).not.toBeNull()

    expect(within(rahulCard!).getByText('Score: 92')).toBeInTheDocument()
    expect(within(rahulCard!).queryByText('Score: 85')).not.toBeInTheDocument()

    // within limits queries to one selected element. It is useful when the
    // same text or element appears in several cards or rows.
  })

  test('moves focus through form fields using tab', async () => {
    const user = userEvent.setup()

    render(<AddInternForm />)

    const nameInput = screen.getByPlaceholderText('Name')
    const scoreInput = screen.getByRole('spinbutton')

    expect(document.body).toHaveFocus()

    await user.tab()
    expect(nameInput).toHaveFocus()

    await user.tab()
    expect(scoreInput).toHaveFocus()

    // user.tab() simulates keyboard tab navigation and toHaveFocus()
    // checks which form element is currently selected.
  })
})

// Replace XX with the percentage shown after running npm run test:coverage.
// useInternForm.ts has XX% line coverage.
// Line coverage shows how many lines were executed, while branch coverage
// checks whether every possible path, such as if/else conditions, was tested.