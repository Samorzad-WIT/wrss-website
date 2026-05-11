export default function About() {
  return (
    <section id="o-nas" className="section-container">
      <div className="section-header">
        <div className="section-gear">⚙️</div>
        <h2 className="section-main-title">O ORGANIZACJI</h2>
      </div>
      
      <div className="org-cards-grid">
        <div className="org-card">
          <div className="org-card-tag">O nas</div>
          <h3 className="org-card-title">Kim jesteśmy?</h3>
          <p className="org-card-desc">
            Reprezentujemy studentów wydziału i dbamy o jakość kształcenia
          </p>
        </div>

        <div className="org-card">
          <div className="org-card-tag">Informacje</div>
          <h3 className="org-card-title">Informator</h3>
          <p className="org-card-desc">
            Wszystkie najważniejsze informacje w jednym miejscu
          </p>
        </div>

        <div className="org-card">
          <div className="org-card-tag">Rekrutacja</div>
          <h3 className="org-card-title">Dołącz do nas!</h3>
          <p className="org-card-desc">
            Zainteresowany członkostwem? Zapoznaj się z procesem rekrutacji
          </p>
        </div>
      </div>
    </section>
  );
}
