import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
    </div>
  )
}

export default RefVsState

// useState is used for data that affects the UI. When the state changes,
// React re-renders the component and updates the screen.
//
// useRef is used to store a value or reference without causing a re-render.
// Updating ref.current changes the value, but React does not update the UI.
//
// Use useState for values that should be displayed or change the interface,
// such as counters, form inputs, or user data.
// Use useRef for accessing DOM elements (like focusing an input), storing
// timers, previous values, or other mutable data that does not need to
// trigger a UI update.