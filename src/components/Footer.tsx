export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://www.facebook.com/samorzad.wita" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/team_w4n/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <p>© {new Date().getFullYear()} Samorząd Studentów WIT. Wszystkie prawa zastrzeżone.</p>
        <p>Stworzone dla studentów, przez studentów.</p>
      </div>
    </footer>
  );
}
