export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">WITaj w <span>WRSS</span> <strong>W4N</strong></h1>
        <p className="hero-subtitle">
          Wydziałowa Rada Samorządu Studenckiego<br />
          Wydziału Informatyki i Telekomunikacji. <br />
          Działamy dla was od 2137 lat.
        </p>
        <div className="hero-buttons">
          <a href="/docs/Informator.pdf" className="btn-hero-outline" download>
            ⬇ Pobierz Informator PDF
          </a>
        </div>
      </div>
    </section>
  );
}
