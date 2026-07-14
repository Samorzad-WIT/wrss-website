import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { events } from '../data/events'
import { eventBanners } from '../data/events-banners'
import gearIcon from '../assets/images/figma/gear-tools.svg'

function EventItem({ event }: { event: (typeof events)[number] }) {
  const imageSrc = eventBanners[event.id] ?? event.imageUrl ?? null
  const hasFb = Boolean(event.facebookUrl && !event.facebookUrl.endsWith('/events/'))

  const inner = (
    <div className="wyd-item" id={`event-${event.id}`}>
      <div className="wyd-item-header">
        <img src={gearIcon} alt="" className="wyd-gear" />
        <h2 className="wyd-item-name">{event.name}</h2>
      </div>
      <div className="wyd-item-body">
        <p className="wyd-item-desc">{event.description}</p>
        {imageSrc && <img src={imageSrc} alt={event.name} className="wyd-item-img" />}
      </div>
    </div>
  )

  if (hasFb) {
    return (
      <a
        href={event.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wyd-item-link"
      >
        {inner}
      </a>
    )
  }
  return inner
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
