import { useEffect, useState } from 'react'
import type { Section } from '../../types'
import boardSvg from '../../assets/images/board.svg'

const API_URL = import.meta.env.VITE_API_URL

export default function MembersSection() {
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    if (!API_URL) return
    fetch(`${API_URL}/api/members`)
      .then((res) => res.json())
      .then(setSections)
      .catch(() => {})
  }, [])

  return (
    <section id="czlonkowie" className="section-container">
      <div className="section-header">
        <img src={boardSvg} alt="Zarząd" className="section-title-svg" />
      </div>

      {sections.map((section) => (
        <div key={section.id} className={`members-section members-section--${section.size}`}>
          {section.size === 'small' && <h3 className="members-section-title">{section.title}</h3>}

          <div className={`members-grid members-grid--${section.size}`}>
            {section.members.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-photo-container">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={member.name}
                      className="member-photo"
                      style={
                        member.photo_object_position
                          ? { objectPosition: member.photo_object_position }
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
        </div>
      ))}
    </section>
  )
}
