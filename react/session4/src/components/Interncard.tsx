interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
}

function InternCard({ name, score, isPresent }: InternCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Score: {score}</p>
      <p>{isPresent ? 'Present' : 'Absent'}</p>
    </div>
  )
}

export default InternCard