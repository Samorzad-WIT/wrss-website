import { events } from '../../data/events';

export default function EventsSection() {
  return (
    <section id="wydarzenia" className="section-container">
      <div className="section-header">
        <img 
          src="/src/assets/images/figma/NASZE WYDARZENIA.svg" 
          alt="Nasze Wydarzenia" 
          className="section-title-svg"
        />
      </div>

      <div className="events-grid">
        {events.filter(e => e.status === 'upcoming').slice(0, 4).map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.name} className="event-image" />
              ) : (
                <div className="event-image-placeholder">📷 Zdjęcie</div>
              )}
              <div className="event-tag upcoming">NADCHODZI</div>
            </div>
            <div className="event-info">
              <h3 className="event-name">{event.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="section-header" style={{ marginTop: '4rem' }}>
        <img 
          src="/src/assets/images/figma/MINIONE.svg" 
          alt="Minione Wydarzenia" 
          className="section-title-svg"
        />
      </div>

      <div className="events-grid">
        {events.filter(e => e.status === 'past').slice(0, 4).map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.name} className="event-image" />
              ) : (
                <div className="event-image-placeholder">📷 Zdjęcie</div>
              )}
              <div className="event-tag past">MINIONE</div>
            </div>
            <div className="event-info">
              <h3 className="event-name">{event.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
