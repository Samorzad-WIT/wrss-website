import { members } from '../../data/members';

export default function MembersSection() {
  return (
    <section id="czlonkowie" className="section-container">
      <div className="section-header">
        <img
          src="/src/assets/images/figma/ZARZĄD.svg"
          alt="Zarząd"
          className="section-title-svg"
        />
      </div>

      <div className="members-grid">
        {members.map((member) => (
          <div key={member.id} className="member-card">
            <div className="member-photo-container">
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="member-photo"
                  style={
                    member.photoObjectPosition
                      ? { objectPosition: member.photoObjectPosition }
                      : undefined
                  }
                />
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
