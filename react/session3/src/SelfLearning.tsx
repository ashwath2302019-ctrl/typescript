import { useEffect, useState } from 'react'

function LiveTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <h2>Live Timer</h2>
      <p>Seconds: {seconds}</p>
    </div>
  )
}

function SelfLearning() {
  const [showTimer, setShowTimer] = useState(true)

  return (
    <div>
      <h1>Self Learning</h1>

      <button onClick={() => setShowTimer(prev => !prev)}>
        {showTimer ? 'Hide Timer' : 'Show Timer'}
      </button>

      {showTimer && <LiveTimer />}
    </div>
  )
}

export default SelfLearning


// React.StrictMode runs components and effects an extra time in development.
// I noticed that the effect ran twice in the console. This is done by React
// to help developers find bugs and missing cleanup functions. It does not
// affect the production build.

// useEffect runs after the page is displayed to the user.
// useLayoutEffect runs before the browser paints the screen.
// I would use useEffect for API calls and timers, and useLayoutEffect
// when I need to measure or change the layout before it is shown.

// If useEffect has no dependency array, it runs after every render.
// If it updates state, React renders the component again, which runs
// the effect again. This keeps repeating and can lead to an infinite loop.

// useState is easier for simple state like counters, inputs and booleans.
// useReducer is better when the state becomes more complex or when many
// actions update the same state. It keeps all update logic in one place,
// making larger components easier to manage.

// The cleanup function stops the interval when the component is removed.
// This prevents unnecessary timers from running in the background.
// Without clearInterval(), multiple timers can continue running and
// may cause unexpected behavior or memory leaks.