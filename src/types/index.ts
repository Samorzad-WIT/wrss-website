export interface Member {
  id: number
  name: string
  role: string
  section: string
  quote: string
  imageUrl: string
  phase: 1 | 2
  photoObjectPosition?: string
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
