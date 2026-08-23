import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import MembersSection from '../components/home/MembersSection'
import EventsSection from '../components/home/EventsSection'
import ToolsSection from '../components/home/ToolsSection'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(location.hash)
    if (el) {
      setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: 'smooth' })
      }, 80)
    }
  }, [location])

  return (
    <div className="home-container">
      <Hero />
      <About />
      <MembersSection />
      <EventsSection />
      <ToolsSection />
    </div>
  )
}
