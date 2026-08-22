
export interface SectionRow {
  id: number
  slug: string
  title: string
  size: 'large' | 'small'
  source: 'auto' | 'manual'
  sort_order: number
}

export interface MemberRow {
  id: number
  section_id: number
  name: string
  role: string
  image_url: string
  photo_object_position: string | null
  sort_order: number
}
