export default function About() {
  return (
    <section id="o-nas" className="section-container white">
      <div className="section-content">
        <p className="section-title">
          <span className="callout-num">1</span> O nas 
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}> #o-nas</span>
        </p>
        <div className="grid-2-cols about-grid">
          <div>
            <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-h)' }}>O organizacji</h2>
            <div style={{ lineHeight: 1.6 }}>
              <p style={{ marginBottom: '1rem' }}>
                Jesteśmy Wydziałową Radą Samorządu Studentów (WRSS) Wydziału Informatyki i Telekomunikacji (WIT). 
                Naszym celem jest dbanie o interesy studentów oraz organizacja wydarzeń integrujących naszą społeczność.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Nasza praca opiera się na <strong>6 wyspecjalizowanych sekcjach</strong>, które wspólnie tworzą mechanizm napędowy wydziału:
              </p>
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
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-value">24</p>
              <p className="stat-label">członków</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">8+</p>
              <p className="stat-label">wydarzeń/rok</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">1990</p>
              <p className="stat-label">rok założenia</p>
            </div>
            <div className="stat-card">
              <p className="stat-value">6</p>
              <p className="stat-label">sekcji</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
