import { useEffect, useState } from 'react'

export default function WednesdayPopup() {
  const [open, setOpen] = useState(() => new Date().getDay() === 3)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  if (!open) return null

  return (
    <div className="wednesday-overlay" onClick={() => setOpen(false)}>
      <div className="wednesday-content" onClick={(e) => e.stopPropagation()}>
        <button className="wednesday-close" onClick={() => setOpen(false)} aria-label="Zamknij">
          X
        </button>
        <img src="/images/wednesday.jpg" alt="Dziś jest środa" />
      </div>
    </div>
  )
}

