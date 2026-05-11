import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoBiale from '../../assets/logos/WRSS WIT Logo Wektor Białe.svg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/" onClick={closeMenu} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logoBiale} alt="WRSS WIT Logo" className="logo-img" />
            <span>WRSS <strong>WIT</strong></span>
          </Link>
        </div>

        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="/#o-nas" onClick={closeMenu}>O nas</a>
          <a href="/#wydarzenia" onClick={closeMenu}>Wydarzenia</a>
          <a href="/#informator" onClick={closeMenu}>Informator</a>
          <a href="/#rekrutacja" onClick={closeMenu}>Rekrutacja</a>
          
          <a href="/#narzedzia" onClick={closeMenu} className="btn-nav">
             ⚙️ Narzędzia ▾
          </a>
        </div>
      </nav>
    </header>
  );
}

