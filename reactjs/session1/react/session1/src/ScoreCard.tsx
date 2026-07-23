function ScoreCard() {
  const name:  string = 'Priya'
  const score: number = 45 

  return (
    <div>
      <h2>{name}</h2>

      <p>{score >= 50 ? 'Pass' : 'Fail'}</p>
      <p style={{ color: score >= 50 ? 'green' : 'red' }}>
        Score: {score}
      </p>

      {score >= 90
        ? <span>Top Performer</span>
        : <span>Keep it up!</span>
      }
    </div>
  )
}

export default ScoreCard

// WE\e can Use a ternary operator when you need to choose between two values or UI elements
// based on a condition. It can be written directly inside JSX, whereas an if
// statement cannot.