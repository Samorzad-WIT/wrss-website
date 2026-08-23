import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { events } from '../data/events'
import { eventBanners } from '../data/events-banners'
import gearIcon from '../assets/images/gear-tools.svg'

function EventItem({ event }: { event: (typeof events)[number] }) {
  const fallback =
    event.imageUrl && !event.imageUrl.endsWith('event1.svg') ? event.imageUrl : null
  const imageSrc = eventBanners[event.id] ?? fallback
  const hasFb = Boolean(event.facebookUrl && !event.facebookUrl.endsWith('/events/'))

  const media = imageSrc ? (
    <img src={imageSrc} alt={event.name} className="wyd-item-img" />
  ) : (
    <div className="wyd-item-img wyd-item-img-placeholder">
      <img src={gearIcon} alt="" />
    </div>
  )

  return (
    <div className="wyd-item" id={`event-${event.id}`}>
      <div className="wyd-item-header">
        <img src={gearIcon} alt="" className="wyd-gear" />
        <h2 className="wyd-item-name">{event.name}</h2>
      </div>
      <div className="wyd-item-body">
        <p className="wyd-item-desc">{event.description}</p>
        {hasFb && imageSrc ? (
          <a
            href={event.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wyd-item-link"
            title={`${event.name} na Facebooku`}
          >
            {media}
          </a>
        ) : (
          media
        )}
      </div>
    </div>
  )
}

export default function Wydarzenia() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }
    const el = document.querySelector(hash)
    if (el) {
      setTimeout(() => {
        const top = el.getBoundingClientRect().top + window.scrollY - 100
        window.scrollTo({ top, behavior: 'smooth' })
      }, 80)
    }
  }, [hash])

  return (
    <div className="wyd-page">
      <div className="wyd-hero">
        <h1 className="wyd-hero-title">
          WYDARZENIA <span>WRSS</span>
        </h1>
        <div className="wyd-hero-line" />
      </div>

      <div className="wyd-list">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
