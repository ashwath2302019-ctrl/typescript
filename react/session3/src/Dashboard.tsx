import { useEffect, useRef, useState } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [search, setSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsLoading(true)

    const timeoutId = setTimeout(() => {
      setInterns([
        {
          id: 1,
          name: 'Rahul',
          score: 92,
          role: 'Frontend',
          isPresent: true,
        },
        {
          id: 2,
          name: 'Priya',
          score: 78,
          role: 'Backend',
          isPresent: true,
        },
        {
          id: 3,
          name: 'Amit',
          score: 45,
          role: 'Frontend',
          isPresent: false,
        },
        {
          id: 4,
          name: 'Sneha',
          score: 95,
          role: 'Fullstack',
          isPresent: true,
        },
      ])

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  const filteredInterns = interns.filter(intern => {
    const searchText = search.trim().toLowerCase()

    return (
      intern.name.toLowerCase().includes(searchText) ||
      intern.role.toLowerCase().includes(searchText)
    )
  })

  function handleToggleSearch(): void {
    setIsSearchOpen(prev => !prev)
  }

  if (isLoading) {
    return <p>Loading interns...</p>
  }

  return (
    <div>
      <h1>Intern Dashboard</h1>

      <button onClick={handleToggleSearch}>
        {isSearchOpen ? 'Close Search' : 'Open Search'}
      </button>

      {isSearchOpen && (
        <div>
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or role"
          />

          <button onClick={() => setSearch('')}>
            Clear Search
          </button>
        </div>
      )}

      <p>
        Showing {filteredInterns.length} of {interns.length} interns
      </p>

      <div>
        {filteredInterns.map(intern => (
          <div
            key={intern.id}
            style={{
              border: '1px solid #ccc',
              padding: '12px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <h2>{intern.name}</h2>

            <p>Role: {intern.role}</p>

            <p>Score: {intern.score}</p>

            <p>
              Present: {intern.isPresent ? 'Yes' : 'No'}
            </p>

            <span
              style={{
                color: intern.score >= 50 ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {intern.score >= 50 ? 'Pass' : 'Fail'}
            </span>
          </div>
        ))}
      </div>

      {filteredInterns.length === 0 && (
        <p>No interns found.</p>
      )}
    </div>
  )
}

export default Dashboard