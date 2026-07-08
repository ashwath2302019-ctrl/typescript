function InternCard() {
  const name:      string  = 'Amit'
  const score:     number  = 45
  const isPresent: boolean = false

  return (
    <div className="intern-card">
      <h2>{name}</h2>

      <p style={{ color: score >= 50 ? 'green' : 'red' }}>
        Score: {score} — {score >= 50 ? 'Pass' : 'Fail'}
      </p>

      {score >= 90 && <span>Top Performer</span>}

      {isPresent
        ? <p>Present today</p>
        : <p>Absent today</p>
      }
    </div>
  )
}

export default InternCard

// && is used when you only need something to happen if a condition is true.
// Ternary (? :) is used when you need one result for true and another result for false.