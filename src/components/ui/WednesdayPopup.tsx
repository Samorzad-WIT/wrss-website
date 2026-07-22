import { useEffect, useState } from 'react'

export default function WednesdayPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (new Date().getDay() === 3) setOpen(true)
  }, [])

  if (!open) return null

  return (
    <div className="wednesday-overlay" onClick={() => setOpen(false)}>
      <div className="wednesday-content" onClick={(e) => e.stopPropagation()}>
        <button className="wednesday-close" onClick={() => setOpen(false)} aria-label="Zamknij">
          X
        </button>
        <img src="/images/sroda.jpeg" alt="Dziś jest środa" />
      </div>
    </div>
  )
}
