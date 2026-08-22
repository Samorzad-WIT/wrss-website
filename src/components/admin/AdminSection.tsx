
import { type SectionRow, type MemberRow } from './types'
import AdminMemberRow from './AdminMemberRow'

interface Props {
  section: SectionRow
  members: MemberRow[]
  orderedSections: SectionRow[]
  onUpdateSection: (id: number, patch: Partial<SectionRow>) => void
  onMoveSection: (id: number, direction: -1 | 1) => void
  onDeleteSection: (id: number) => void
  onAddMember: (sectionId: number) => void
  onUpdateMember: (id: number, patch: Partial<MemberRow>) => void
  onMoveMember: (sectionId: number, memberId: number, direction: -1 | 1) => void
  onDeleteMember: (id: number) => void
  onLocalTitleChange: (id: number, newTitle: string) => void
}

export default function AdminSection({
  section,
  members,
  orderedSections,
  onUpdateSection,
  onMoveSection,
  onDeleteSection,
  onAddMember,
  onUpdateMember,
  onMoveMember,
  onDeleteMember,
  onLocalTitleChange
}: Props) {
  const sectionMembers = members
    .filter((m) => m.section_id === section.id)
    .sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <input
          className="admin-section-title-input"
          value={section.title}
          onChange={(e) => onLocalTitleChange(section.id, e.target.value)}
          onBlur={(e) => {
            // We can just rely on the parent state for title since it's controlled
            onUpdateSection(section.id, { title: e.target.value })
          }}
        />
        <select
          value={section.size}
          onChange={(e) => onUpdateSection(section.id, { size: e.target.value as 'large' | 'small' })}
        >
          <option value="large">duża</option>
          <option value="small">mała</option>
        </select>
        <span className="admin-section-source">{section.source}</span>
        <button onClick={() => onMoveSection(section.id, -1)}>↑</button>
        <button onClick={() => onMoveSection(section.id, 1)}>↓</button>
        <button onClick={() => onAddMember(section.id)}>+ Osoba</button>
        <button onClick={() => onDeleteSection(section.id)} className="admin-danger">
          Usuń sekcję
        </button>
      </div>

      <div className="admin-members-list">
        {sectionMembers.map((member) => (
          <AdminMemberRow
            key={member.id}
            member={member}
            orderedSections={orderedSections}
            onUpdate={onUpdateMember}
            onMove={(id, dir) => onMoveMember(section.id, id, dir)}
            onDelete={onDeleteMember}
          />
        ))}
      </div>
    </div>
  )
}
