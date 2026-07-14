import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default Counter

// **Write a comment** explaining why you cannot update the count by writing `count = count + 1` directly and must use the setter instead.
// Because count is read-only. It represents the current state value managed by React. Assigning to it directly only changes a local variable (and in fact, React prevents this),
//  so React has no way to know that it should re-render the component.