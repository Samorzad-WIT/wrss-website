import Hero from '../components/home/Hero';
import About from '../components/home/About';
import MembersSection from '../components/home/MembersSection';
import EventsSection from '../components/home/EventsSection';
import CalendarSection from '../components/home/CalendarSection';
import InformatorSection from '../components/home/InformatorSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <div className="home-container">
      <Hero />
      <About />
      <MembersSection />
      <EventsSection />
      <CalendarSection />
      <InformatorSection />
      <ContactSection />
    </div>
  );
}

