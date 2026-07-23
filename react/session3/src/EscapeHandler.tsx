import { useState, useEffect } from 'react'

function EscapeHandler() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Panel</button>

      {isOpen && (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginTop: '8px' }}>
          <p>Panel is open. Press Escape to close.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  )
}

export default EscapeHandler

// Dependency Array Findings:
//
// 1. No dependency array:
//    useEffect runs after every render. Since this effect updates state,
//    it causes another render, which can lead to repeated executions or
//    an infinite render loop.
//
// 2. Empty dependency array ([]):
//    useEffect runs only once when the component first loads.
//    Changing the dropdown updates the 'role' state, but the filtering
//    effect does not run again, so the displayed list never changes.
//
// 3. Dependency array ([role]):
//    useEffect runs when the component first loads and again whenever
//    the 'role' state changes. This keeps the filtered list synchronized
//    with the selected dropdown value.