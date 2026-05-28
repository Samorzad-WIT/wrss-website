import { Link } from 'react-router-dom';
import { events } from '../../data/events';
import { eventBanners } from '../../data/events-banners';

export default function EventsSection() {
  const renderEventCard = (event: (typeof events)[number], tag: 'NADCHODZI' | 'MINIONE', tagClass: 'upcoming' | 'past') => {
    const imageSrc = eventBanners[event.id] ?? event.imageUrl ?? null;

    const cardContent = (
      <>
        <div className="event-image-container">
          {imageSrc ? (
            <img src={imageSrc} alt={event.name} className="event-image" />
          ) : (
            <div className="event-image-placeholder">📷 Zdjęcie</div>
          )}
          <div className={`event-tag ${tagClass}`}>{tag}</div>
        </div>
        <div className="event-info">
          <h3 className="event-name">{event.name}</h3>
        </div>
      </>
    );

    return (
      <Link
        key={event.id}
        to={`/wydarzenia#event-${event.id}`}
        className="event-card event-card-link"
      >
        {cardContent}
      </Link>
    );
  };

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
        {events
          .filter((e) => e.status === 'upcoming')
          .slice(0, 4)
          .map((event) => renderEventCard(event, 'NADCHODZI', 'upcoming'))}
      </div>

      <div className="section-header" style={{ marginTop: '4rem' }}>
        <img
          src="/src/assets/images/figma/MINIONE.svg"
          alt="Minione Wydarzenia"
          className="section-title-svg"
        />
      </div>

      <div className="events-grid">
        {events
          .filter((e) => e.status === 'past')
          .slice(0, 4)
          .map((event) => renderEventCard(event, 'MINIONE', 'past'))}
      </div>

      <div className="show-more-container">
        <Link to="/wydarzenia" className="btn-secondary">
          Zobacz wszystkie wydarzenia →
        </Link>
      </div>
    </section>
  );
}
