import PropDrillingDemo from "./components/PropDrillingDemo";
import Navbar from "./components/Navbar";
import ThemedCard from "./components/ThemedCard";
import CounterDemo from "./components/CounterDemo";
import ScoreStats             from './components/ScoreStats'
import AddInternForm          from './components/AddInternForm'
import InternListWithCallback from './components/InternListWithCallback'
import InternSearch from "./components/InternSearch";

function App(){
  return(
  <>
     <PropDrillingDemo/>
     <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <ThemedCard name="Rahul" score={92} />
        <ThemedCard name="Priya" score={78} />
        <ThemedCard name="Amit"  score={45} />
      </div>
    </div>
    <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <ScoreStats />
        <AddInternForm />
        <InternSearch/>
        <InternListWithCallback />
      </div>
    </div>
  
    <CounterDemo/>

  </>
  
  )
}

export default App

/*
Contexts manage shared data such as the theme and interns list.
Hooks contain reusable logic such as forms, searching, and counters.
Components handle the user interface and display the data on the screen.
*/