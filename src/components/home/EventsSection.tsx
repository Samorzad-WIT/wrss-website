import { events } from '../../data/events';

export default function EventsSection() {
  return (
    <section id="wydarzenia" className="section-container white">
      <div className="section-content">
        <p className="section-title">
          <span className="callout-num">3</span> Wydarzenia 
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}> #wydarzenia</span>
        </p>
        <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)' }}>Nasze wydarzenia</h2>
          <div className="events-filter">
            <button className="filter-btn active">Przeszłe</button>
            <button className="filter-btn outline">Nadchodzące</button>
          </div>
        </div>

        <div className="grid-3-cols">
          {events.map(event => (
            <div key={event.id} className="project-card card-compact">
              <div className="mock-block" style={{ height: '120px', borderRadius: '20px 20px 0 0', border: 'none', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <p style={{ margin: 0 }}>📷 {event.isCyclic ? 'Galeria zdjęć' : 'Zdjęcie z wydarzenia'}</p>
                </div>
              </div>
              <div className="card-compact-content">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-h)', margin: 0 }}>{event.name}</p>
                  <span className={event.isCyclic ? "tag tag-accent" : "tag tag-gray"}>{event.date}</span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '8px', lineHeight: 1.5 }}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
