import useInternSearch from '../hooks/useInternSearch'
import { useInterns } from '../contexts/intern-context'

function InternSearch() {
  const { interns } = useInterns()

  const { search, setSearch } = useInternSearch(interns)

  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Search intern..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default InternSearch