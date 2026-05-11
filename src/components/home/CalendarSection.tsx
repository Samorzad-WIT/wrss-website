import CalendarEmbed from '../layout/CalendarEmbed';

export default function CalendarSection() {
  return (
    <section id="kalendarz" className="section-container">
      <div className="section-content">
        <p className="section-title">
          <span className="callout-num">4</span> Kalendarz 
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}> #kalendarz</span>
        </p>
        <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Kalendarz Wydarzeń</h2>
        <CalendarEmbed />
      </div>
    </section>
  );
}
