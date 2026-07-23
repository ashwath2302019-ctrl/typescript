import { useMemo, useState } from 'react';

interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface UseInternSearchReturn {
  search: string;
  setSearch: (value: string) => void;
  filtered: Intern[];
  stats: {
    total: number;
    present: number;
    avg: number;
  };
}

function useInternSearch(
  interns: Intern[],
): UseInternSearchReturn {
  const [search, setSearch] = useState<string>('');

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return interns.filter((intern) => {
      const nameMatches = intern.name
        .toLowerCase()
        .includes(normalizedSearch);

      const roleMatches = intern.role
        .toLowerCase()
        .includes(normalizedSearch);

      return nameMatches || roleMatches;
    });
  }, [interns, search]);

  const stats = useMemo(() => {
    const total = interns.length;

    const present = interns.filter(
      (intern) => intern.isPresent,
    ).length;

    const avg =
      total > 0
        ? Math.round(
            interns.reduce(
              (sum, intern) => sum + intern.score,
              0,
            ) / total,
          )
        : 0;

    return {
      total,
      present,
      avg,
    };
  }, [interns]);

  return {
    search,
    setSearch,
    filtered,
    stats,
  };
}

export default useInternSearch;