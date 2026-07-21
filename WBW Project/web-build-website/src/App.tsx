import './App.css'
import Booking from './components/Booking'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import PlanWebsite from './components/PlanWebsite'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import Reviews from './components/Reviews'
import Templates from './components/Templates'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Templates />
        <Pricing />
        <Portfolio />
        <Reviews />
        <PlanWebsite />
        <Booking />
      </main>

      <Footer />
    </>
  )
}

export default App