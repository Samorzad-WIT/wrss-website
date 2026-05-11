export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <h1 className="title">Witamy na stronie Samorządu!</h1>
      <p className="subtitle">Razem tworzymy lepszą społeczność akademicką na WIT.</p>
      <div className="hero-buttons">
        <a href="#o-nas" className="btn-primary">Poznaj nas lepiej</a>
        <a href="https://discord.com/invite/kEyNeH32" target="_blank" rel="noopener noreferrer" className="btn-secondary">Dołącz do Discorda</a>
      </div>
    </section>
  );
}
