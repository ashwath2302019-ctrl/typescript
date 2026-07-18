import InternRow from './InternRow'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternListProps {
  interns: Intern[]
  onRemove: (id: number) => void
}

function InternList({ interns, onRemove }: InternListProps) {
  return (
    <div>
      {interns.map((intern) => (
        <InternRow
          key={intern.id}
          id={intern.id}
          name={intern.name}
          score={intern.score}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

export default InternList


// **Write a comment** explaining the rule: "mock as little as possible." When is it acceptable to mock your own code vs when should you let it run for real?


// Mock as little as possible so the test runs with the real application logic.
// Mock your own code only when it depends on external services, APIs, or complex
// components that are not being tested. Otherwise, let the real code run.