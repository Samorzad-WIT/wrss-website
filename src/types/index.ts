export interface Member {
  id: number
  section_id: number
  name: string
  role: string
  image_url: string
  photo_object_position: string | null
  sort_order: number
}

export interface Section {
  id: number
  slug: string
  title: string
  size: 'large' | 'small'
  source: 'auto' | 'manual'
  sort_order: number
  members: Member[]
}

export interface Event {
  id: number
  name: string
  description: string
  date: string
  status: 'past' | 'upcoming'
  images: string[]
  facebookUrl?: string
  imageUrl?: string
  isCyclic: boolean
}

export interface HistoryEntry {
  year: number
  description: string
  chairman?: string
}
