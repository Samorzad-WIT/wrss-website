import { events } from '../../data/events';

export default function EventsSection() {
  return (
    <section id="wydarzenia" className="section-container">
      <div className="section-header">
        <div className="section-gear">⚙️</div>
        <h2 className="section-main-title">NASZE WYDARZENIA</h2>
      </div>

      <div className="events-grid">
        {events.slice(0, 4).map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.name} className="event-image" />
              ) : (
                <div className="event-image-placeholder">📷 Zdjęcie</div>
              )}
              <div className={`event-tag ${event.isCyclic ? 'upcoming' : 'past'}`}>
                {event.isCyclic ? 'NADCHODZI' : 'MINIONE'}
              </div>
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
