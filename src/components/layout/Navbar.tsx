import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoAnimacja from '../../assets/images/figma/logo_animacja.gif'
import { narzedziaNavItems } from '../../config/narzedzia'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="nav-logo">
          <Link
            to="/"
            onClick={closeMenu}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <img src={logoAnimacja} alt="WRSS WIT Logo" className="logo-img" />
            <span>
              WRSS <strong>WIT</strong>
            </span>
          </Link>
        </div>

        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/#o-nas" onClick={closeMenu}>
            O nas
          </Link>
          <Link to="/wydarzenia" onClick={closeMenu}>
            Wydarzenia
          </Link>
          <Link to="/#informator" onClick={closeMenu}>
            Informator
          </Link>
          <Link to="/#rekrutacja" onClick={closeMenu}>
            Rekrutacja
          </Link>

          <div className="nav-dropdown">
            <Link to="/#narzedzia" onClick={closeMenu} className="btn-nav">
              ⚙️ Narzędzia ▾
            </Link>
            <div className="nav-dropdown-menu">
              {narzedziaNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="nav-dropdown-item"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
