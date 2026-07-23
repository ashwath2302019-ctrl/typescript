import Avatar from './Avatar'
import Badge from './Badge'
import ScoreBar from './ScoreBar'

interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
  role: string
}

function InternCard({ name, score, isPresent, role }: InternCardProps) {
  const adjustedScore: number = score >= 90 ? score : score + 5

  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <p>Original Score: {score}</p>
      <p>Adjusted Score: {adjustedScore}</p>

      <ScoreBar score={adjustedScore} />

      <div
        style={{
          display: 'flex',
          gap: '6px',
          marginTop: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Badge label={role} color="#4f46e5" />

        <Badge
          label={isPresent ? 'Present' : 'Absent'}
          color={isPresent ? 'green' : '#e53e3e'}
        />

        {adjustedScore >= 90 && (
          <Badge label="Top Performer" color="#d97706" />
        )}
      </div>
    </div>
  )
}

export default InternCard

/*
The props interface is defined separately from the component because it keeps
the component code clean and makes the prop structure easier to understand.

A separate interface can also be reused in other components, functions, tests,
or files. It is easier to update and maintain than writing the full prop type
directly inside the function parameter.

Inline typing is possible, but a separate interface is usually clearer when a
component has several props.
*/