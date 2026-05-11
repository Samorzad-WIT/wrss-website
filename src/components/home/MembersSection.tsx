import { members } from '../../data/members';

export default function MembersSection() {
  return (
    <section id="czlonkowie" className="section-container">
      <div className="section-content">
        <p className="section-title">
          <span className="callout-num">2</span> Członkowie 
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text)', opacity: 0.5 }}> #czlonkowie</span>
        </p>
        <div style={{ width: '32px', height: '4px', background: 'var(--accent)', borderRadius: '2px', marginBottom: '12px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-h)' }}>Zarząd i koordynatorzy</h2>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="tag tag-accent">Kadencja 2024/2025</span>
          </div>
        </div>
        
        <div className="grid-4-cols">
          {members.map(member => (
            <div key={member.id} className="project-card member-card-content">
              <div className="mock-block avatar member-avatar">
                {member.imageUrl ? <img src={member.imageUrl} alt={member.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : 'foto'}
              </div>
              <p className="member-name">{member.name}</p>
              <p className="member-role">{member.role}</p>
              <div><span className="tag tag-gray">{member.section}</span></div>
              <p className="member-quote">"{member.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
