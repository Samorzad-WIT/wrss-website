import { Link } from 'react-router-dom'
import { events } from '../../data/events'
import { eventBanners } from '../../data/events-banners'
import ourEventsSvg from '../../assets/images/our-events.svg'
import pastEventsSvg from '../../assets/images/past-events.svg'

export default function EventsSection() {
  const renderEventCard = (
    event: (typeof events)[number]
  ) => {
    const fallback =
      event.imageUrl && !event.imageUrl.endsWith('event1.svg') ? event.imageUrl : null
    const imageSrc = eventBanners[event.id] ?? fallback

    const cardContent = (
      <>
        <div className="event-image-container">
          {imageSrc ? (
            <img src={imageSrc} alt={event.name} className="event-image" />
          ) : (
            <div className="event-image-placeholder" style={{ background: '#15222E', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#27303d' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          )}
        </div>
        <div className="event-info">
          <h3 className="event-name">{event.name}</h3>
        </div>
      </>
    )

    return (
      <Link
        key={event.id}
        to={`/wydarzenia#event-${event.id}`}
        className="event-card event-card-link"
      >
        {cardContent}
      </Link>
    )
  }

  return (
    <section id="wydarzenia" className="section-container">
      <div className="section-header">
        <div className="red-divider-wrapper">
          <div className="red-divider"></div>
          <img
            src={ourEventsSvg}
            alt="Nasze Wydarzenia"
            className="section-title-svg"
          />
          <div className="red-divider"></div>
        </div>
      </div>

      <div className="events-grid">
        {events
          .filter((e) => e.status === 'upcoming')
          .slice(0, 3)
          .map((event) => renderEventCard(event))}
      </div>

      <div className="section-header mt-4rem">
        <div className="red-divider-wrapper">
          <div className="red-divider"></div>
          <img
            src={pastEventsSvg}
            alt="Minione Wydarzenia"
            className="section-title-svg"
          />
          <div className="red-divider"></div>
        </div>
      </div>

      <div className="events-grid">
        {events
          .filter((e) => e.status === 'past')
          .slice(0, 3)
          .map((event) => renderEventCard(event))}
      </div>
    </section>
  )
}
