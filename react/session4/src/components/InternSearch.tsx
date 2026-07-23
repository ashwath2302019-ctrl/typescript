import useInternSearch from '../hooks/useInternSearch';
import { useInterns } from '../contexts/intern-context';
import { useTheme } from '../contexts/theme-context';

function InternSearch() {
  const {
    interns,
    removeIntern,
    isLoading,
  } = useInterns();

  const { theme } = useTheme();

  const {
    search,
    setSearch,
    filtered,
  } = useInternSearch(interns);

  if (isLoading) {
    return <p>Loading interns...</p>;
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <input
        type="text"
        placeholder="Search by name or role"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No interns found</p>
      ) : (
        <div>
          {filtered.map((intern) => (
            <div
              key={intern.id}
              style={{
                background:
                  theme === 'light' ? '#ffffff' : '#2a2a2a',
                color:
                  theme === 'light' ? '#000000' : '#eeeeee',
                padding: '8px',
                margin: '4px 0',
              }}
            >
              <h3>{intern.name}</h3>

              <p>Score: {intern.score}</p>

              <p>Role: {intern.role}</p>

              <p>
                Status:{' '}
                {intern.score >= 50 ? 'Pass' : 'Fail'}
              </p>

              <button
                type="button"
                onClick={() => removeIntern(intern.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InternSearch;