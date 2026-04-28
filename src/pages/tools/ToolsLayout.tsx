import { Outlet, Link } from 'react-router-dom';

export default function ToolsLayout() {
  return (
    <div className="tools-layout" style={{ minHeight: '70vh', padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/" className="btn-secondary">← Powrót na stronę główną</Link>
      </div>
      <h1 className="title">Narzędzia Samorządowe</h1>
      <p style={{ marginBottom: '2rem' }}>Wybierz narzędzie, z którego chcesz skorzystać.</p>
      
      {/* Tutaj będą renderowane poszczególne narzędzia */}
      <Outlet />
      
      {/* Domyślny widok wyboru narzędzi, gdy jesteśmy na /narzedzia */}
      <p className="section-title"><span className="callout-num">6</span> Narzędzia <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>/narzedzia</span></p>
      <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Narzędzia samorządu</h2>
      <p style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '16px' }}>Dostępne z poziomu tej podstrony lub bezpośrednio pod odpowiednim adresem URL.</p>
      
      <div className="grid-4-cols">
        <div className="project-card" style={{ padding: '16px', textAlign: 'center' }}>
          <div className="card-icon-box accent">QR</div>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Generator QR</p>
          <p style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.8, marginBottom: '10px' }}>Szybkie generowanie kodów QR.</p>
          <a href="https://foxjustfox.github.io/qrcode_gen_web/" target="_blank" rel="noopener noreferrer" className="tag tag-gray" style={{ textDecoration: 'none', display: 'block', padding: '6px', marginBottom: '10px' }}>Otwórz w nowej karcie →</a>
        </div>
        <div className="project-card" style={{ padding: '16px', textAlign: 'center' }}>
          <div className="card-icon-box green">WIN</div>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Winietki WRSS</p>
          <p style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.8, marginBottom: '10px' }}>System do zarządzania winietkami.</p>
          <a href="https://winietki.pwrnow.pl" target="_blank" rel="noopener noreferrer" className="tag tag-gray" style={{ textDecoration: 'none', display: 'block', padding: '6px', marginBottom: '10px' }}>Otwórz w nowej karcie →</a>
        </div>
        <div className="project-card" style={{ padding: '16px', textAlign: 'center' }}>
          <div className="card-icon-box amber">PKT</div>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Aplikacja Punktów</p>
          <p style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.8, marginBottom: '10px' }}>System zarządzania punktami.</p>
          <a href="https://punkty-wit.solvro.pl/dashboard" target="_blank" rel="noopener noreferrer" className="tag tag-gray" style={{ textDecoration: 'none', display: 'block', padding: '6px', marginBottom: '10px' }}>Otwórz w nowej karcie →</a>
        </div>
        <div className="project-card" style={{ padding: '16px', textAlign: 'center', background: 'var(--bg)', borderStyle: 'dashed' }}>
          <div className="card-icon-box gray">🎡</div>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Koło Fortuny</p>
          <p style={{ fontSize: '11px', color: 'var(--text)', opacity: 0.8, marginBottom: '10px' }}>Losowanie (w przygotowaniu).</p>
          <Link to="/narzedzia/kolo" className="tag tag-accent" style={{ textDecoration: 'none', display: 'block', padding: '6px' }}>Zbuduj narzędzie ⚙️</Link>
        </div>
      </div>
    </div>
  );
}
