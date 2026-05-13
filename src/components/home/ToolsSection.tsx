import iconWinietki from '../../assets/icons/tools/winietki.svg';
import iconPunkty from '../../assets/icons/tools/punkty.svg';
import iconQr from '../../assets/icons/tools/qr.svg';

import headerTools from '../../assets/images/figma/NARZĘDZIA.svg';
import gearTools from '../../assets/images/figma/GEAR_NARZEDZIA.svg';

const tools = [
  { 
    id: 1, 
    name: 'Generator winietek', 
    icon: iconWinietki, 
    link: import.meta.env.VITE_WINIETKI_LINK || 'https://winietki.pwrnow.pl' 
  },
  { 
    id: 2, 
    name: 'Aplikacja punktowa', 
    icon: iconPunkty, 
    link: import.meta.env.VITE_PUNKTY_LINK || 'https://punkty-wit.solvro.pl/dashboard' 
  },
  { 
    id: 3, 
    name: 'Generator kodów QR', 
    icon: iconQr, 
    link: import.meta.env.VITE_QR_LINK || 'https://foxjustfox.github.io/qrcode_gen_web/' 
  },
];

export default function ToolsSection() {
  return (
    <section id="narzedzia" className="section-container">
      <div className="section-header-svg">
        <img src={gearTools} alt="" className="section-title-gear" />
        <img src={headerTools} alt="NARZĘDZIA" className="section-title-svg" />
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
