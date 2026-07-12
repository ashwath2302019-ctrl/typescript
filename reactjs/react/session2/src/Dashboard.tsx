import Card from './Card'
import InternCard from './InternCard'

interface Intern {
  id: number
  name: string
  score: number
  isPresent: boolean
  role: string
}

const interns: Intern[] = [
  {
    id: 1,
    name: 'Rahul',
    score: 92,
    isPresent: true,
    role: 'Frontend',
  },
  {
    id: 2,
    name: 'Priya',
    score: 78,
    isPresent: true,
    role: 'Backend',
  },
  {
    id: 3,
    name: 'Amit',
    score: 45,
    isPresent: false,
    role: 'Frontend',
  },
  {
    id: 4,
    name: 'Sneha',
    score: 95,
    isPresent: true,
    role: 'Fullstack',
  },
]

function Dashboard() {
  const totalInterns: number = interns.length

  const presentInterns: Intern[] = interns.filter(
    (intern: Intern): boolean => intern.isPresent
  )

  const presentCount: number = presentInterns.length

  const totalScore: number = interns.reduce(
    (sum: number, intern: Intern): number => {
      return sum + intern.score
    },
    0
  )

  const averageScore: number =
    totalInterns > 0 ? totalScore / totalInterns : 0

  return (
    <Card title="Intern Dashboard">
      <div className="dashboard-summary">
        <h3>Summary</h3>

        <p>
          <strong>Total:</strong> {totalInterns}
        </p>

        <p>
          <strong>Present:</strong> {presentCount}
        </p>

        <p>
          <strong>Average Score:</strong> {averageScore.toFixed(2)}
        </p>
      </div>

      <div className="dashboard-cards">
        {interns.map((intern: Intern) => (
          <InternCard
            key={intern.id}
            name={intern.name}
            score={intern.score}
            isPresent={intern.isPresent}
            role={intern.role}
          />
        ))}
      </div>
    </Card>
  )
}

export default Dashboard