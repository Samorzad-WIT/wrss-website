import { Outlet, Link } from 'react-router-dom';

export default function ToolsLayout() {
  return (
    <div className="tools-layout">
      <div className="tools-back-link">
        <Link to="/" className="btn-secondary">← Powrót na stronę główną</Link>
      </div>
      <h1 className="title">Narzędzia Samorządowe</h1>
      <p style={{ marginBottom: '2rem' }}>Wybierz narzędzie, z którego chcesz skorzystać.</p>
      
      <Outlet />
      
      <p className="section-title"><span className="callout-num">6</span> Narzędzia <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}>/narzedzia</span></p>
      <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>Narzędzia samorządu</h2>
      <p style={{ fontSize: '12px', color: 'var(--text)', marginBottom: '16px' }}>Dostępne z poziomu tej podstrony lub bezpośrednio pod odpowiednim adresem URL.</p>
      
      <div className="grid-4-cols">
        <div className="project-card tool-card">
          <div className="card-icon-box accent">QR</div>
          <p className="tool-card-title">Generator QR</p>
          <p className="tool-card-desc">Szybkie generowanie kodów QR.</p>
          <a href="https://foxjustfox.github.io/qrcode_gen_web/" target="_blank" rel="noopener noreferrer" className="tag tag-gray tool-card-btn">Otwórz w nowej karcie →</a>
        </div>
        
        <div className="project-card tool-card">
          <div className="card-icon-box green">WIN</div>
          <p className="tool-card-title">Winietki WRSS</p>
          <p className="tool-card-desc">System do zarządzania winietkami.</p>
          <a href="https://winietki.pwrnow.pl" target="_blank" rel="noopener noreferrer" className="tag tag-gray tool-card-btn">Otwórz w nowej karcie →</a>
        </div>
        
        <div className="project-card tool-card">
          <div className="card-icon-box amber">PKT</div>
          <p className="tool-card-title">Aplikacja Punktów</p>
          <p className="tool-card-desc">System zarządzania punktami.</p>
          <a href="https://punkty-wit.solvro.pl/dashboard" target="_blank" rel="noopener noreferrer" className="tag tag-gray tool-card-btn">Otwórz w nowej karcie →</a>
        </div>
        
        <div className="project-card tool-card placeholder">
          <div className="card-icon-box gray">🎡</div>
          <p className="tool-card-title">Koło Fortuny</p>
          <p className="tool-card-desc">Losowanie (w przygotowaniu).</p>
          <Link to="/narzedzia/kolo" className="tag tag-accent tool-card-btn">Zbuduj narzędzie ⚙️</Link>
        </div>
      </div>
    </div>
  );
}

