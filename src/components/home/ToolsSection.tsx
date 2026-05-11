import iconWinietki from '../../assets/icons/tools/winietki.svg';
import iconPunkty from '../../assets/icons/tools/punkty.svg';
import iconQr from '../../assets/icons/tools/qr.svg';

const tools = [
  { id: 1, name: 'Generator winietek', icon: iconWinietki, link: 'https://winietki.pwrnow.pl' },
  { id: 2, name: 'Aplikacja punktowa', icon: iconPunkty, link: 'https://punkty-wit.solvro.pl/dashboard' },
  { id: 3, name: 'Generator kodów QR', icon: iconQr, link: 'https://foxjustfox.github.io/qrcode_gen_web/' },
];

export default function ToolsSection() {
  return (
    <section id="narzedzia" className="section-container">
      <div className="section-header">
        <div className="section-gear">⚙️</div>
        <h2 className="section-main-title">NARZĘDZIA</h2>
      </div>

      <div className="tools-grid">
        {tools.map(tool => (
          <a href={tool.link} target="_blank" rel="noopener noreferrer" key={tool.id} className="tool-card-new">
            <div className="tool-icon-box">
              <img src={tool.icon} alt={tool.name} style={{ width: '64px', height: '64px' }} />
            </div>
            <h3 className="tool-name">{tool.name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
