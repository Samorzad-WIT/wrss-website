import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu} style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/favicon.svg" alt="Logo" className="logo-img" />
            <span>Samorząd WIT</span>
          </Link>
        </div>

        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="/#hero" onClick={closeMenu}>Start</a>
          <a href="/#o-nas" onClick={closeMenu}>O nas</a>
          <a href="/#czlonkowie" onClick={closeMenu}>Członkowie</a>
          <a href="/#wydarzenia" onClick={closeMenu}>Wydarzenia</a>
          <a href="/#kalendarz" onClick={closeMenu}>Kalendarz</a>
          <a href="/#informator" onClick={closeMenu}>Informator</a>
          <a href="/#kontakt" onClick={closeMenu}>Kontakt</a>
          
          <div style={{ position: 'relative', display: 'inline-block' }} className="dropdown">
            <Link to="/narzedzia" onClick={closeMenu} style={{ fontWeight: 'bold' }}>Narzędzia ▾</Link>
          </div>
          
          <a href="https://discord.com/invite/kEyNeH32" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Discord</a>
        </div>
      </nav>
    </header>
  );
}

