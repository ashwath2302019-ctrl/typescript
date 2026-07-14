import { useState } from 'react'

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>

      {isOpen && (
        <div>
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}
    </div>
  )
}

export default TogglePanel

// Both setIsOpen(!isOpen) and setIsOpen(prev => !prev) work in simple cases.
// However, the functional update form is safer because React always provides
// the latest state value as 'prev'. This avoids problems when multiple state
// updates happen quickly or asynchronously, ensuring the state is updated correctly.