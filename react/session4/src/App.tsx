import PropDrillingDemo from './components/PropDrillingDemo';
import Navbar from './components/Navbar';
import CounterDemo from './components/CounterDemo';
import ScoreStats from './components/ScoreStats';
import AddInternForm from './components/AddInternForm';
import InternSearch from './components/InternSearch';

function App() {
  return (
    <>
      <h1>Intern Dashboard</h1>

      <Navbar />

      <main style={{ padding: '16px' }}>
        <PropDrillingDemo />

        <ScoreStats />

        <AddInternForm />

        <InternSearch />

        <CounterDemo />
      </main>
    </>
  );
}

export default App;

/*
Contexts manage shared data such as the theme and interns list.
Hooks contain reusable logic such as forms, searching and counters.
Components handle the user interface and display the data on the screen.
*/