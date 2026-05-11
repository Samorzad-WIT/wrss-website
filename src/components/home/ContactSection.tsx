export default function ContactSection() {
  return (
    <section id="kontakt" className="section-container">
      <div className="section-content">
        <p className="section-title">
          <span className="callout-num">6</span> Kontakt 
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}> #kontakt</span>
        </p>
        <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Skontaktuj się z nami</h2>
        
        <div className="grid-3-cols" style={{ marginTop: '2rem' }}>
          <div className="project-card contact-card-content">
            <div className="card-icon-box accent">✉️</div>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>E-mail</h3>
            <p style={{ fontSize: '14px', color: 'var(--text)' }}>
              <a href="mailto:samorzad.wit@pwr.edu.pl" className="contact-link">samorzad.wit@pwr.edu.pl</a>
            </p>
          </div>
          
          <div className="project-card contact-card-content">
            <div className="card-icon-box accent">📍</div>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Siedziba</h3>
            <p style={{ fontSize: '14px', color: 'var(--text)' }}>Budynek C-3, pok. 014a<br />Politechnika Wrocławska</p>
          </div>

          <div className="project-card contact-card-content">
            <div className="card-icon-box accent">📱</div>
            <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Social Media</h3>
            <p style={{ fontSize: '14px', color: 'var(--text)' }}>
              <a href="https://www.facebook.com/samorzad.wita" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ marginRight: '10px' }}>Facebook</a>
              <a href="https://www.instagram.com/team_w4n/" target="_blank" rel="noopener noreferrer" className="contact-link">Instagram</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
