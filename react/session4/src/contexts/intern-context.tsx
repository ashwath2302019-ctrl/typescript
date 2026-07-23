import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export interface Intern {
  id: number;
  name: string;
  score: number;
  role: string;
  isPresent: boolean;
}

interface InternContextType {
  interns: Intern[];
  isLoading: boolean;
  addIntern: (intern: Intern) => void;
  removeIntern: (id: number) => void;
}

const InternContext =
  createContext<InternContextType | null>(null);

const fallbackInterns: Intern[] = [
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
];

export function InternProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  useEffect(() => {
    async function loadInterns(): Promise<void> {
      try {
        const response = await fetch('/api/interns');

        if (!response.ok) {
          throw new Error('Failed to load interns');
        }

        const data = (await response.json()) as Intern[];

        setInterns(data);
      } catch {
        setInterns(fallbackInterns);
      } finally {
        setIsLoading(false);
      }
    }

    void loadInterns();
  }, []);

  function addIntern(intern: Intern): void {
    setInterns((previousInterns) => [
      ...previousInterns,
      intern,
    ]);
  }

  function removeIntern(id: number): void {
    setInterns((previousInterns) =>
      previousInterns.filter(
        (intern) => intern.id !== id,
      ),
    );
  }

  return (
    <InternContext.Provider
      value={{
        interns,
        isLoading,
        addIntern,
        removeIntern,
      }}
    >
      {children}
    </InternContext.Provider>
  );
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext);

  if (!context) {
    throw new Error(
      'useInterns must be used inside InternProvider',
    );
  }

  return context;
}

// Intern data is requested through fetch('/api/interns') so Playwright
// can intercept the request with page.route() during E2E testing.
// The fallback data keeps the application working without a real backend.