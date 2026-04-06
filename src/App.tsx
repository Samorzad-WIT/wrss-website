import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <section className="hero">
      <h1 className="title">Witamy na stronie Samorządu!</h1>
      <p className="subtitle">Razem tworzymy lepszą społeczność akademicką na WIT.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/o-nas" className="btn-primary">
          Poznaj nas lepiej
        </Link>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="projects-container">
      <h1 className="title">Nasze Projekty</h1>
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-icon">⚡</div>
          <h3>QR Code Generator</h3>
          <p>Narzędzie do szybkiego generowania kodów QR.</p>
          <a href="https://foxjustfox.github.io/qrcode_gen_web/" target="_blank" rel="noopener noreferrer" className="btn-secondary">Otwórz generator</a>
        </div>
        <div className="project-card">
          <div className="project-icon">📂</div>
          <h3>Winietki WRSS</h3>
          <p>System do zarządzania winietkami dla samorządu.</p>
          <a href="https://github.com/FOXjustFOX/winietki_wrss" target="_blank" rel="noopener noreferrer" className="btn-secondary">Zobacz na GitHub</a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about-section">
      <h1 className="title">O nas</h1>
      <div className="about-content">
        <p>Jesteśmy Wydziałową Radą Samorządu Studentów (WRSS) Wydziału Informatyki i Technik Informacyjnych (WIT).</p>
        <p>Naszym celem jest dbanie o interesy studentów oraz organizacja wydarzeń integrujących naszą społeczność.</p>
        <div className="photo-placeholder">
          <span>[ Miejsce na wspólne zdjęcie Samorządu ]</span>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact-section">
      <h1 className="title">Kontakt</h1>
      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <span>E-mail</span>
            <p>samorzad@wit.edu.pl</p>
          </div>
          <div className="contact-item">
            <span>Social Media</span>
            <p>Obserwuj nas na Facebooku i Instagramie, aby być na bieżąco!</p>
          </div>
          <div className="contact-item">
            <span>Biuro</span>
            <p>Sala 0.1, Budynek WIT</p>
          </div>
        </div>
        <div className="contact-fb">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsamorzad.wita&tabs=events%2Ctimeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="100%"
            height="500"
            style={{ border: 'none', overflow: 'hidden', borderRadius: '12px' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="fb-widget"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

function CalendarView() {
  // UWAGA: Podmień "YOUR_CALENDAR_ID" na właściwy ID kalendarza (np. adres e-mail kalendarza w Google)
  const calendarId = "YOUR_CALENDAR_ID";
  const calendarEmbedUrl = `https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=Europe%2FWarsaw&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&color=%23b91c1c`;
  const subscribeUrl = `https://calendar.google.com/calendar/render?cid=${calendarId}`;

  return (
    <section className="calendar-section">
      <h1 className="title">Kalendarz Wydarzeń</h1>
      <p className="subtitle">Bądź na bieżąco z tym, co dzieje się na naszej uczelni.</p>

      <div className="calendar-container">
        <iframe
          src={calendarEmbedUrl}
          className="calendar-iframe"
          scrolling="no"
        ></iframe>
      </div>

      <div className="calendar-actions">
        <a
          href={subscribeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Dodaj do mojego Google Calendar
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/">Start</Link>
          <Link to="/o-nas">O nas</Link>
          <Link to="/projekty">Projekty</Link>
          <Link to="/kalendarz">Kalendarz</Link>
          <Link to="/kontakt">Kontakt</Link>
        </div>
        <p>© {new Date().getFullYear()} Samorząd Studentów WIT. Wszystkie prawa zastrzeżone.</p>
        <p>Stworzone dla studentów, przez studentów.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="app-wrapper">
      <header className="navbar-container">
        <nav className="navbar">
          <div className="nav-logo">
            <img src="/favicon.svg" alt="Logo" className="logo-img" />
            <span>Samorząd WIT</span>
          </div>
          <div className="nav-links">
            <Link to="/">Start</Link>
            <Link to="/o-nas">O nas</Link>
            <Link to="/projekty">Projekty</Link>
            <Link to="/kalendarz">Kalendarz</Link>
            <Link to="/kontakt">Kontakt</Link>
          </div>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/o-nas" element={<About />} />
          <Route path="/projekty" element={<Projects />} />
          <Route path="/kalendarz" element={<CalendarView />} />
          <Route path="/kontakt" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
