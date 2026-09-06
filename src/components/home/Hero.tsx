export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          WITaj w <strong>WRSS</strong> <span>W4N</span>
        </h1>
        <p className="hero-subtitle">
          Wydziałowa Rada Samorządu Studenckiego
          <br />
          Wydziału Informatyki i Telekomunikacji. <br />
          Działamy dla Was z pasją i zaangażowaniem.
        </p>
        <div className="hero-buttons">
          <a href="/informator.pdf" className="btn-hero-outline" download>
            ⬇ Pobierz Informator PDF
          </a>
        </div>
      </div>
    </section>
  )
}
