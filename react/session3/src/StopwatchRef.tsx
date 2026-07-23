import { useState, useRef } from 'react'

function StopwatchRef() {
  const [seconds,   setSeconds]   = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function handleStart(): void {
    if (isRunning) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  function handleStop(): void {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
  }

  function handleReset(): void {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <button onClick={handleStop}  disabled={!isRunning}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default StopwatchRef

// We store the interval ID in useRef because changing a ref does not
// re-render the component. The interval ID is only needed so we can
// stop the timer later using clearInterval().
//
// If we stored the interval ID in useState, every new interval ID would
// cause the component to re-render, even though the interval ID is not
// displayed on the screen. This would result in unnecessary re-renders
// and reduce performance.