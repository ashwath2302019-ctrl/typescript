// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Counter from './Counter'
import StateTypes from './StateTypes'
import InternForm from './InternForm'
import TogglePanel from './TogglePanel'
import InternObjectForm from './InternObjectForm'
import InternList from './InternList'
import FilteredInterns from './FilteredInterns'
import InternLoader from './InternLoader'
import EscapeHandler from './EscapeHandler'
import RefVsState from './RefVsState'
import StopwatchRef from './StopwatchRef'
import Dashboard from './Dashboard'
function App() {
  return (
    <>
    <Counter/>
    <StateTypes/>
    <InternForm/>
    <TogglePanel/>
    <InternObjectForm/>
    <InternList/>
    <FilteredInterns/>
    <InternLoader/>
    <EscapeHandler/>
    <RefVsState/>
    <StopwatchRef/>
    <Dashboard/>
    </>
  )
}

export default App
