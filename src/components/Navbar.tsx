import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/favicon.svg" alt="Logo" className="logo-img" />
            <span>Samorząd WIT</span>
          </Link>
        </div>
        <div className="nav-links">
          <a href="/#hero">Start</a>
          <a href="/#o-nas">O nas</a>
          <a href="/#czlonkowie">Członkowie</a>
          <a href="/#wydarzenia">Wydarzenia</a>
          <a href="/#kalendarz">Kalendarz</a>
          <a href="/#informator">Informator</a>
          <a href="/#kontakt">Kontakt</a>
          
          {/* Prosty Dropdown dla Narzędzi */}
          <div style={{ position: 'relative', display: 'inline-block' }} className="dropdown">
            <Link to="/narzedzia" style={{ fontWeight: 'bold' }}>Narzędzia ▾</Link>
            {/* W przyszłości można tu dodać rozwijane menu (ul li) */}
          </div>
          
          <a href="https://discord.com/invite/kEyNeH32" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </nav>
    </header>
  );
}
