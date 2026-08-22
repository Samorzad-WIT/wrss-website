
import { type MemberRow, type SectionRow } from './types'

interface Props {
  member: MemberRow
  orderedSections: SectionRow[]
  onUpdate: (id: number, patch: Partial<MemberRow>) => void
  onMove: (id: number, direction: -1 | 1) => void
  onDelete: (id: number) => void
}

export default function AdminMemberRow({ member, orderedSections, onUpdate, onMove, onDelete }: Props) {
  return (
    <div className="admin-member-row">
      <input
        defaultValue={member.name}
        onBlur={(e) => {
          if (e.target.value !== member.name) {
            onUpdate(member.id, { name: e.target.value })
          }
        }}
        placeholder="Imię i nazwisko"
      />
      <input
        defaultValue={member.role}
        onBlur={(e) => {
          if (e.target.value !== member.role) {
            onUpdate(member.id, { role: e.target.value })
          }
        }}
        placeholder="Rola"
      />
      <input
        defaultValue={member.image_url}
        onBlur={(e) => {
          if (e.target.value !== member.image_url) {
            onUpdate(member.id, { image_url: e.target.value })
          }
        }}
        placeholder="URL zdjęcia"
      />
      <input
        defaultValue={member.photo_object_position ?? ''}
        onBlur={(e) => {
          if ((e.target.value || null) !== member.photo_object_position) {
            onUpdate(member.id, { photo_object_position: e.target.value || null })
          }
        }}
        placeholder="np. center top"
      />
      <select
        value={member.section_id}
        onChange={(e) => onUpdate(member.id, { section_id: Number(e.target.value) })}
      >
        {orderedSections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))}
      </select>
      <button onClick={() => onMove(member.id, -1)}>↑</button>
      <button onClick={() => onMove(member.id, 1)}>↓</button>
      <button onClick={() => onDelete(member.id)} className="admin-danger">
        Usuń
      </button>
    </div>
  )
}
