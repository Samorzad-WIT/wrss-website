import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    if (!API_URL) return
    fetch(`${API_URL}/api/visits`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {})
  }, [])

  if (count === null) return null

  return <p className="visit-counter">Odwiedziny: {count.toLocaleString('pl-PL')}</p>
}
