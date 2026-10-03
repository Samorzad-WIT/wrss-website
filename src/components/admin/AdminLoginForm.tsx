
import { useState, type FormEvent } from 'react'
import * as api from '../../lib/adminApi'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL

export default function AdminLoginForm({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!API_URL) {
      toast.error('Brak skonfigurowanego serwera API (VITE_API_URL).')
      return
    }
    setBusy(true)
    try {
      await api.login(username, password)
      onLoggedIn()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Błąd logowania')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-login-wrap">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h1>Panel administracyjny</h1>
        {!API_URL && (
          <div
            style={{
              background: 'rgba(255, 28, 55, 0.15)',
              border: '1px solid rgba(255, 28, 55, 0.4)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '13px',
              color: '#fca5a5',
              marginBottom: '16px',
              lineHeight: '1.4',
            }}
          >
            ⚠️ <strong>Tryb statyczny (GitHub Pages):</strong> Serwer backendu nie jest podłączony. Aby korzystać z panelu admina, skonfiguruj zmienną środowiskową <code>VITE_API_URL</code>.
          </div>
        )}
        <input
          placeholder="Login"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <input
          placeholder="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Logowanie...' : 'Zaloguj'}
        </button>
      </form>
    </div>
  )
}
