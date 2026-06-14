import Hero from '../components/home/Hero'
import About from '../components/home/About'
import MembersSection from '../components/home/MembersSection'
import EventsSection from '../components/home/EventsSection'
import ToolsSection from '../components/home/ToolsSection'

export default function Home() {
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
