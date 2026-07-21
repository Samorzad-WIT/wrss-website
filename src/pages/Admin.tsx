import { useEffect, useState, type FormEvent } from 'react'
import * as api from '../lib/adminApi'
import { getToken, clearToken } from '../lib/adminApi'

interface SectionRow {
  id: number
  slug: string
  title: string
  size: 'large' | 'small'
  source: 'auto' | 'manual'
  sort_order: number
}

interface MemberRow {
  id: number
  section_id: number
  name: string
  role: string
  image_url: string
  photo_object_position: string | null
  sort_order: number
}

export default function Admin() {
  const [token, setTokenState] = useState<string | null>(getToken())

  if (!token) return <LoginForm onLoggedIn={() => setTokenState(getToken())} />
  return (
    <Dashboard
      onLogout={() => {
        clearToken()
        setTokenState(null)
      }}
    />
  )
}

function LoginForm({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      await api.login(username, password)
      onLoggedIn()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd logowania')
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
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" disabled={busy}>
          {busy ? 'Logowanie...' : 'Zaloguj'}
        </button>
      </form>
    </div>
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [sections, setSections] = useState<SectionRow[]>([])
  const [members, setMembers] = useState<MemberRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)

  async function reload() {
    try {
      const [s, m] = await Promise.all([
        api.adminFetch('/api/admin/sections') as Promise<SectionRow[]>,
        api.adminFetch('/api/admin/members') as Promise<MemberRow[]>,
      ])
      setSections(s)
      setMembers(m)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd wczytywania danych')
    }
  }

  useEffect(() => {
    let ignore = false

    Promise.all([
      api.adminFetch('/api/admin/sections') as Promise<SectionRow[]>,
      api.adminFetch('/api/admin/members') as Promise<MemberRow[]>,
    ])
      .then(([s, m]) => {
        if (ignore) return
        setSections(s)
        setMembers(m)
      })
      .catch((err) => {
        if (ignore) return
        setError(err instanceof Error ? err.message : 'Błąd wczytywania danych')
      })

    return () => {
      ignore = true
    }
  }, [])

  async function handleSync() {
    setSyncing(true)
    setSyncMsg(null)
    try {
      const result = (await api.adminFetch('/api/admin/sync-members', { method: 'POST' })) as {
        created: number
        updated: number
        total: number
      }
      setSyncMsg(`Zsynchronizowano: ${result.created} nowych, ${result.updated} zaktualizowanych`)
      await reload()
    } catch (err) {
      setSyncMsg(err instanceof Error ? err.message : 'Błąd synchronizacji')
    } finally {
      setSyncing(false)
    }
  }

  async function addSection() {
    const title = prompt('Tytuł nowej sekcji (np. "Zarząd 2023/2024")')
    if (!title) return
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    try {
      await api.adminFetch('/api/admin/sections', {
        method: 'POST',
        body: JSON.stringify({ slug, title, size: 'small', source: 'manual' }),
      })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd dodawania sekcji')
    }
  }

  async function updateSection(id: number, patch: Partial<SectionRow>) {
    try {
      await api.adminFetch(`/api/admin/sections/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd zapisu sekcji')
    }
  }

  async function deleteSection(id: number) {
    if (!confirm('Usunąć sekcję razem ze wszystkimi jej osobami?')) return
    try {
      await api.adminFetch(`/api/admin/sections/${id}`, { method: 'DELETE' })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd usuwania sekcji')
    }
  }

  async function moveSection(id: number, direction: -1 | 1) {
    const ordered = [...sections].sort((a, b) => a.sort_order - b.sort_order)
    const idx = ordered.findIndex((s) => s.id === id)
    const swapWith = idx + direction
    if (swapWith < 0 || swapWith >= ordered.length) return
    ;[ordered[idx], ordered[swapWith]] = [ordered[swapWith], ordered[idx]]
    try {
      await api.adminFetch('/api/admin/sections/reorder', {
        method: 'POST',
        body: JSON.stringify({ ids: ordered.map((s) => s.id) }),
      })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd zmiany kolejności')
    }
  }

  async function addMember(sectionId: number) {
    const name = prompt('Imię i nazwisko')
    if (!name) return
    const role = prompt('Rola') ?? ''
    try {
      await api.adminFetch('/api/admin/members', {
        method: 'POST',
        body: JSON.stringify({ section_id: sectionId, name, role }),
      })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd dodawania osoby')
    }
  }

  async function updateMember(id: number, patch: Partial<MemberRow>) {
    try {
      await api.adminFetch(`/api/admin/members/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd zapisu osoby')
    }
  }

  async function deleteMember(id: number) {
    if (!confirm('Usunąć tę osobę?')) return
    try {
      await api.adminFetch(`/api/admin/members/${id}`, { method: 'DELETE' })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd usuwania osoby')
    }
  }

  async function moveMember(sectionId: number, id: number, direction: -1 | 1) {
    const ordered = members
      .filter((m) => m.section_id === sectionId)
      .sort((a, b) => a.sort_order - b.sort_order)
    const idx = ordered.findIndex((m) => m.id === id)
    const swapWith = idx + direction
    if (swapWith < 0 || swapWith >= ordered.length) return
    ;[ordered[idx], ordered[swapWith]] = [ordered[swapWith], ordered[idx]]
    try {
      await api.adminFetch('/api/admin/members/reorder', {
        method: 'POST',
        body: JSON.stringify({ section_id: sectionId, ids: ordered.map((m) => m.id) }),
      })
      await reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd zmiany kolejności')
    }
  }

  const orderedSections = [...sections].sort((a, b) => a.sort_order - b.sort_order)

  return (
    <div className="admin-wrap">
      <div className="admin-topbar">
        <h1>Panel administracyjny — Członkowie</h1>
        <div className="admin-topbar-actions">
          <button onClick={handleSync} disabled={syncing}>
            {syncing ? 'Synchronizuję...' : 'Synchronizuj z PWr'}
          </button>
          <button onClick={addSection}>+ Nowa sekcja</button>
          <button onClick={onLogout} className="admin-logout">
            Wyloguj
          </button>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {syncMsg && <p className="admin-info">{syncMsg}</p>}

      {orderedSections.map((section) => (
        <div key={section.id} className="admin-section">
          <div className="admin-section-header">
            <input
              className="admin-section-title-input"
              value={section.title}
              onChange={(e) =>
                setSections((prev) =>
                  prev.map((s) => (s.id === section.id ? { ...s, title: e.target.value } : s)),
                )
              }
              onBlur={(e) => updateSection(section.id, { title: e.target.value })}
            />
            <select
              value={section.size}
              onChange={(e) =>
                updateSection(section.id, { size: e.target.value as 'large' | 'small' })
              }
            >
              <option value="large">duża</option>
              <option value="small">mała</option>
            </select>
            <span className="admin-section-source">{section.source}</span>
            <button onClick={() => moveSection(section.id, -1)}>↑</button>
            <button onClick={() => moveSection(section.id, 1)}>↓</button>
            <button onClick={() => addMember(section.id)}>+ Osoba</button>
            <button onClick={() => deleteSection(section.id)} className="admin-danger">
              Usuń sekcję
            </button>
          </div>

          <div className="admin-members-list">
            {members
              .filter((m) => m.section_id === section.id)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((member) => (
                <div key={member.id} className="admin-member-row">
                  <input
                    defaultValue={member.name}
                    onBlur={(e) => updateMember(member.id, { name: e.target.value })}
                    placeholder="Imię i nazwisko"
                  />
                  <input
                    defaultValue={member.role}
                    onBlur={(e) => updateMember(member.id, { role: e.target.value })}
                    placeholder="Rola"
                  />
                  <input
                    defaultValue={member.image_url}
                    onBlur={(e) => updateMember(member.id, { image_url: e.target.value })}
                    placeholder="URL zdjęcia"
                  />
                  <input
                    defaultValue={member.photo_object_position ?? ''}
                    onBlur={(e) =>
                      updateMember(member.id, { photo_object_position: e.target.value || null })
                    }
                    placeholder="np. center top"
                  />
                  <select
                    value={member.section_id}
                    onChange={(e) =>
                      updateMember(member.id, { section_id: Number(e.target.value) })
                    }
                  >
                    {orderedSections.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => moveMember(section.id, member.id, -1)}>↑</button>
                  <button onClick={() => moveMember(section.id, member.id, 1)}>↓</button>
                  <button onClick={() => deleteMember(member.id)} className="admin-danger">
                    Usuń
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
