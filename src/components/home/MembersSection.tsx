import { members } from '../../data/members';

export default function MembersSection() {
  return (
    <section id="czlonkowie" className="section-container">
      <div className="section-header">
        <div className="section-gear">⚙️</div>
        <h2 className="section-main-title">ZARZĄD</h2>
      </div>

      <div className="members-grid">
        {members.map(member => (
          <div key={member.id} className="member-card">
            <div className="member-photo-container">
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} className="member-photo" />
              ) : (
                <div className="member-photo-placeholder">foto</div>
              )}
            </div>
            <h3 className="member-name">{member.name}</h3>
            <p className="member-role">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
