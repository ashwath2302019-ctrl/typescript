import { useRef } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus(): void {
    inputRef.current?.focus()
  }

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear and Focus</button>
    </div>
  )
}

export default FocusInput

// Optional chaining (?.) is used because inputRef.current may be null.
// When the component first renders, React has not yet connected the
// ref to the <input> element, so current is null. It can also become
// null if the input is removed from the page (unmounted). Using ?. ensures
// that focus() is only called when the input element exists, preventing
// runtime errors.