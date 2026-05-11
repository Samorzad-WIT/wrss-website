import logoBiale from '../../assets/logos/WRSS WIT Logo Wektor Białe.svg';
import iconFb from '../../assets/icons/social/facebook.svg';
import iconIg from '../../assets/icons/social/instagram.svg';
import iconDc from '../../assets/icons/social/discord.svg';
import iconLi from '../../assets/icons/social/linkedin.svg';
import iconTt from '../../assets/icons/social/tiktok.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-logo-section">
          <div className="footer-logo-box">
            <img src={logoBiale} alt="WRSS WIT Logo" />
            <h2>Samorząd<br />WITa</h2>
          </div>
        </div>

        <div className="footer-social-section">
          <h3>Odwiedź nasze social media</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/samorzad.wita" className="social-icon-link" target="_blank" rel="noopener noreferrer"><img src={iconFb} alt="Facebook" width="24" style={{ filter: 'brightness(0) invert(1)' }} /></a>
            <a href="https://www.instagram.com/team_w4n/" className="social-icon-link" target="_blank" rel="noopener noreferrer"><img src={iconIg} alt="Instagram" width="24" style={{ filter: 'brightness(0) invert(1)' }} /></a>
            <a href="https://discord.com/invite/kEyNeH32" className="social-icon-link" target="_blank" rel="noopener noreferrer"><img src={iconDc} alt="Discord" width="24" style={{ filter: 'brightness(0) invert(1)' }} /></a>
            <a href="https://pl.linkedin.com/company/samorzad-wita" className="social-icon-link" target="_blank" rel="noopener noreferrer"><img src={iconLi} alt="LinkedIn" width="24" style={{ filter: 'brightness(0) invert(1)' }} /></a>
            <a href="https://www.tiktok.com/@samorzad_wita" className="social-icon-link" target="_blank" rel="noopener noreferrer"><img src={iconTt} alt="TikTok" width="24" style={{ filter: 'brightness(0) invert(1)' }} /></a>
          </div>
        </div>

        <div className="footer-contact-section">
          <h3>Skontaktuj się z nami</h3>
          <a href="mailto:wit@samorzad.pwr.edu.pl" className="contact-email">
            📧 wit@samorzad.pwr.edu.pl
          </a>
        </div>
      </div>
    </footer>
  );
}
