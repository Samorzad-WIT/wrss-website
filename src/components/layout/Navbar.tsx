import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoAnimacja from '../../assets/logos/logo-animated.gif'
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
            className="nav-logo-link"
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
          <Link to="/" onClick={closeMenu}>
            Informator
          </Link>
          <Link to="/rekrutacja" onClick={closeMenu}>
            Rekrutacja
          </Link>

          <div className="nav-dropdown">
            <Link to="/#narzedzia" onClick={closeMenu} className="btn-nav">
              <span className="btn-nav-icon" aria-hidden="true">
                ⚙️
              </span>
              Narzędzia
              <svg
                className="btn-nav-caret"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                aria-hidden="true"
              >
                <path
                  d="M1 1l4 4 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
