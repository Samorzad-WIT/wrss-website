import CalendarEmbed from '../components/CalendarEmbed';
import { members } from '../data/members';
import { events } from '../data/events';

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO */}
      <section id="hero" className="hero" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="title">Witamy na stronie Samorządu!</h1>
        <p className="subtitle">Razem tworzymy lepszą społeczność akademicką na WIT.</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <a href="#o-nas" className="btn-primary">Poznaj nas lepiej</a>
          <a href="https://discord.com/invite/kEyNeH32" target="_blank" rel="noopener noreferrer" className="btn-secondary">Dołącz do Discorda</a>
        </div>
      </section>

      {/* O NAS */}
      <section id="o-nas" style={{ padding: '4rem 2rem', background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title"><span className="callout-num">1</span> O nas <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>#o-nas</span></p>
          <div className="grid-2-cols" style={{ alignItems: 'start', marginTop: '2rem' }}>
            <div>
              <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-h)' }}>O organizacji</h2>
              <div style={{ lineHeight: 1.6 }}>
                <p style={{ marginBottom: '1rem' }}>Jesteśmy Wydziałową Radą Samorządu Studentów (WRSS) Wydziału Informatyki i Telekomunikacji (WIT). Naszym celem jest dbanie o interesy studentów oraz organizacja wydarzeń integrujących naszą społeczność.</p>
                <p style={{ marginBottom: '1rem' }}>Nasza praca opiera się na <strong>6 wyspecjalizowanych sekcjach</strong>, które wspólnie tworzą mechanizm napędowy wydziału:</p>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  <li><strong>Sekcja Informatyzacji</strong> – tworzenie narzędzi cyfrowych.</li>
                  <li><strong>Sekcja Grafiki</strong> – projektowanie wizerunku.</li>
                  <li><strong>Sekcja Promocji</strong> – prowadzenie mediów społecznościowych.</li>
                  <li><strong>Sekcja Dydaktyki</strong> – opiniowanie programów studiów.</li>
                  <li><strong>Sekcja HR</strong> – wyjazdy integracyjne.</li>
                  <li><strong>Sekcja ds. Kół Naukowych</strong> – współpraca z kołami.</li>
                </ul>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ background: 'var(--accent-bg)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)', margin: 0 }}>24</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', opacity: 0.8, margin: 0 }}>członków</p>
              </div>
              <div style={{ background: 'var(--accent-bg)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)', margin: 0 }}>8+</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', opacity: 0.8, margin: 0 }}>wydarzeń/rok</p>
              </div>
              <div style={{ background: 'var(--accent-bg)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)', margin: 0 }}>1990</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', opacity: 0.8, margin: 0 }}>rok założenia</p>
              </div>
              <div style={{ background: 'var(--accent-bg)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)', margin: 0 }}>6</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', opacity: 0.8, margin: 0 }}>sekcji</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CZŁONKOWIE */}
      <section id="czlonkowie" style={{ padding: '4rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title"><span className="callout-num">2</span> Członkowie <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>#czlonkowie</span></p>
          <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)' }}>Zarząd i koordynatorzy</h2>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="tag tag-accent">Faza 1 — teraz</span>
            </div>
          </div>
          
          <div className="grid-4-cols">
            {members.map(member => (
              <div key={member.id} className="project-card" style={{ padding: '16px', textAlign: 'center' }}>
                <div className="mock-block avatar" style={{ width: '56px', height: '56px', margin: '0 auto 10px', padding: 0 }}>foto</div>
                <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0', color: 'var(--text-h)' }}>{member.name}</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', margin: '0 0 4px 0' }}>{member.role}</p>
                <div><span className="tag tag-gray">Zarząd</span></div>
                <p style={{ fontSize: '10px', color: 'var(--text)', opacity: 0.6, marginTop: '8px', fontStyle: 'italic' }}>"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WYDARZENIA */}
      <section id="wydarzenia" style={{ padding: '4rem 2rem', background: 'white', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title"><span className="callout-num">3</span> Wydarzenia <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>#wydarzenia</span></p>
          <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)' }}>Nasze wydarzenia</h2>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '6px', background: 'var(--accent)', color: '#fff', cursor: 'pointer' }}>Przeszłe</span>
              <span style={{ fontSize: '12px', padding: '5px 14px', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text)', cursor: 'pointer' }}>Nadchodzące</span>
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

      {/* KALENDARZ */}
      <section id="kalendarz" style={{ padding: '4rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title"><span className="callout-num">4</span> Kalendarz <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>#kalendarz</span></p>
          <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Kalendarz Wydarzeń</h2>
          <CalendarEmbed />
        </div>
      </section>

      {/* INFORMATOR */}
      <section id="informator" style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title"><span className="callout-num">5</span> Informator <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>#informator</span></p>
          <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Informator WRSS</h2>
          <div style={{ width: '100%', height: '800px', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <iframe 
              src="/informator.pdf" 
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
              title="Informator WRSS"
            />
          </div>
        </div>
      </section>
      {/* KONTAKT */}
      <section id="kontakt" style={{ padding: '4rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title"><span className="callout-num">6</span> Kontakt <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>#kontakt</span></p>
          <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Skontaktuj się z nami</h2>
          
          <div className="grid-3-cols" style={{ marginTop: '2rem' }}>
            <div className="project-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div className="card-icon-box accent">✉️</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>E-mail</h3>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>
                <a href="mailto:samorzad.wit@pwr.edu.pl" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'bold' }}>samorzad.wit@pwr.edu.pl</a>
              </p>
            </div>
            
            <div className="project-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div className="card-icon-box accent">📍</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Siedziba</h3>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>Budynek C-3, pok. 014a<br />Politechnika Wrocławska</p>
            </div>

            <div className="project-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div className="card-icon-box accent">📱</div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Social Media</h3>
              <p style={{ fontSize: '14px', color: 'var(--text)' }}>
                <a href="https://www.facebook.com/samorzad.wita" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', marginRight: '10px' }}>Facebook</a>
                <a href="https://www.instagram.com/team_w4n/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Instagram</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
