import headerTools from '../../assets/images/figma/tools-header.svg'
import gearTools from '../../assets/images/figma/gear-tools.svg'
import { narzedziaNavItems } from '../../config/narzedzia'

export default function ToolsSection() {
  return (
    <section id="narzedzia" className="section-container">
      <div className="section-header-svg">
        <img src={gearTools} alt="" className="section-title-gear" />
        <img src={headerTools} alt="NARZĘDZIA" className="section-title-svg" />
      </div>

      <div className="tools-grid">
        {narzedziaNavItems.map((tool) => (
          <a
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            key={tool.id}
            className="tool-card-new"
          >
            <div className="tool-icon-box">
              {tool.icon && (
                <img src={tool.icon} alt={tool.name} style={{ width: '64px', height: '64px' }} />
              )}
            </div>
            <h3 className="tool-name">{tool.name}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}
