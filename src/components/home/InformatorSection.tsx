export default function InformatorSection() {
  return (
    <section id="informator" className="section-container white">
      <div className="section-content">
        <p className="section-title">
          <span className="callout-num">5</span> Informator 
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}> #informator</span>
        </p>
        <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)', marginBottom: '12px' }}>Informator WRSS</h2>
        <div className="pdf-viewer-container">
          <iframe 
            src="/informator.pdf" 
            width="100%" 
            height="100%" 
            style={{ border: 'none' }}
            title="Informator WRSS"
          />
        </div>
      </div>
    </section>
  );
}
