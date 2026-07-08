import Greeting from "./Greeting"
import TsxRules from "./TsxRules"
import StyledCard from "./StyledCard"
import "./App.css"
import SkillList from "./SkillList"
import Profile from "./Profile"
import ScoreCard from "./ScoreCard"
import StatusBadge from "./StatusBadge"
import InternCard from "./InternCard"
import Dashboard from "./Dashboard"

//**Write a comment** above the function explaining what a React component is in your own words.
// React component are considered to be the javascript modules which built using the html , css and 
// and typescript language's.
  function App() {
  return (
    <>
      <h1>Hello React</h1>
      <Greeting />
      <TsxRules/>
      <StyledCard/>
      <Profile/>
      <SkillList/>
      <ScoreCard/>
      <StatusBadge/>
      <InternCard/>
      <Dashboard/>
    </>
  )
}


export default App


// A <div> creates an actual HTML element in the DOM, while a Fragment (<>...</>)
// groups multiple elements without adding an extra HTML element. I would use a
// Fragment when I only need to group elements and don't need styling or attributes.
// I would use a <div> when I need to apply CSS, className, id, or layout styles.




