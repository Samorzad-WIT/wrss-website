import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import toast from 'react-hot-toast'
import gearTools from '../assets/images/gear-tools.svg'

const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSfoLC8Yk4dfgFkEtPP30ukE_K4H1Tl8DwRjyE5-uFewjZDj6w/formResponse'

const ENTRY = {
  mail: 'entry.2075440124',
  imieNazwisko: 'entry.2098921466',
  telefon: 'entry.838746410',
  oSobie: 'entry.237989886',
  oTobie: 'entry.1550430827',
}

const O_TOBIE_OPCJE = ['Opcja 1']

export default function Rekrutacja() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setSending(true)
    try {
      await fetch(FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>),
      })
      setSent(true)
      toast.success('Zgłoszenie wysłane!')
    } catch {
      toast.error('Nie udało się wysłać zgłoszenia. Spróbuj ponownie.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="rekrutacja-page">
      <div className="wyd-hero">
        <h1 className="wyd-hero-title">
          REKRUTACJA <span>WRSS</span>
        </h1>
        <div className="wyd-hero-line" />
      </div>

      <div className="rekrutacja-content">
        <img src={gearTools} alt="" className="rekrutacja-gear" />
        <p className="rekrutacja-desc">
          Chcesz dołączyć do WRSS W4N? Wypełnij poniższy formularz — odezwiemy się do Ciebie!
        </p>

        {sent ? (
          <div className="rekrutacja-success">
            <h2>Dziękujemy za zgłoszenie!</h2>
            <p>Odezwiemy się do Ciebie mailowo.</p>
          </div>
        ) : (
          <form className="rekrutacja-form" onSubmit={handleSubmit}>
            <label className="rekrutacja-field">
              <span>
                E-mail <em>*</em>
              </span>
              <input
                type="email"
                name={ENTRY.mail}
                required
                placeholder="twoj@mail.pl"
                autoComplete="email"
              />
            </label>

            <div className="rekrutacja-row">
              <label className="rekrutacja-field">
                <span>
                  Imię i nazwisko <em>*</em>
                </span>
                <input
                  type="text"
                  name={ENTRY.imieNazwisko}
                  required
                  placeholder="Imię i nazwisko"
                  autoComplete="name"
                />
              </label>

              <label className="rekrutacja-field">
                <span>Numer telefonu</span>
                <input
                  type="tel"
                  name={ENTRY.telefon}
                  placeholder="+48 123 456 789"
                  autoComplete="tel"
                />
              </label>
            </div>

            <label className="rekrutacja-field">
              <span>Coś o sobie</span>
              <textarea
                name={ENTRY.oSobie}
                rows={5}
                placeholder="Napisz kilka słów o sobie…"
              />
            </label>

            <fieldset className="rekrutacja-field rekrutacja-radio-group">
              <span>Coś o tobie</span>
              {O_TOBIE_OPCJE.map((opcja) => (
                <label key={opcja} className="rekrutacja-radio">
                  <input type="radio" name={ENTRY.oTobie} value={opcja} />
                  {opcja}
                </label>
              ))}
            </fieldset>

            <button type="submit" className="btn-primary rekrutacja-submit" disabled={sending}>
              {sending ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
