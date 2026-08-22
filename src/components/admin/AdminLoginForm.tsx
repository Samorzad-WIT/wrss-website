
import { useState, type FormEvent } from 'react'
import * as api from '../../lib/adminApi'
import toast from 'react-hot-toast'

export default function AdminLoginForm({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
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
