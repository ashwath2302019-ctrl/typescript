import { useState } from 'react'

function InternForm() {
  const [name,  setName]  = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setScore(Number(e.target.value))
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />
      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />
      <p>Name: {name} | Score: {score}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternForm


// **Write a comment** explaining why `e.target.value` must be wrapped in `Number()` for the score input even though the input has `type="number"`
// / Even if the input type is "number", e.target.value always returns
// the value as a string. Number() converts the string into a number
// so it matches the state type (number).
// 
// .

// **Write a comment** explaining what a controlled input is and why the input's value is always driven by state.

// A controlled input is an input whose value is completely controlled
// by React state. The value shown inside the textbox always comes from
// the state variable, and every change made by the user updates the
// state using the setter function. This keeps the UI and the state
// synchronized at all times.