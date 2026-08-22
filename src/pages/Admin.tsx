
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import * as api from '../lib/adminApi'
import { getToken, clearToken } from '../lib/adminApi'
import type { SectionRow, MemberRow } from '../components/admin/types'
import AdminLoginForm from '../components/admin/AdminLoginForm'
import AdminSection from '../components/admin/AdminSection'

export default function Admin() {
  const [token, setTokenState] = useState<string | null>(getToken())

  if (!token) return <AdminLoginForm onLoggedIn={() => setTokenState(getToken())} />
  return (
    <Dashboard
      onLogout={() => {
        clearToken()
        setTokenState(null)
      }}
    />
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [sections, setSections] = useState<SectionRow[]>([])
  const [members, setMembers] = useState<MemberRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  async function reload() {
    try {
      const [s, m] = await Promise.all([
        api.adminFetch('/api/admin/sections') as Promise<SectionRow[]>,
        api.adminFetch('/api/admin/members') as Promise<MemberRow[]>,
      ])
      setSections(s)
      setMembers(m)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Błąd wczytywania danych')
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
    await toast.promise(
      api.adminFetch('/api/admin/sync-members', { method: 'POST' }).then(async (result: any) => {
        await reload()
        return `Zsynchronizowano: ${result.created} nowych, ${result.updated} zaktualizowanych`
      }),
      {
        loading: 'Synchronizacja z PWr...',
        success: (msg) => msg,
        error: (err) => err instanceof Error ? err.message : 'Błąd synchronizacji'
      }
    )
    setSyncing(false)
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
      
    await toast.promise(
      api.adminFetch('/api/admin/sections', {
        method: 'POST',
        body: JSON.stringify({ slug, title, size: 'small', source: 'manual' }),
      }).then(() => reload()),
      { loading: 'Dodawanie...', success: 'Dodano', error: 'Błąd' }
    )
  }

  async function updateSection(id: number, patch: Partial<SectionRow>) {
    await toast.promise(
      api.adminFetch(`/api/admin/sections/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      }).then(() => reload()),
      { loading: 'Zapisywanie sekcji...', success: 'Zapisano sekcję', error: 'Błąd zapisu' }
    )
  }

  async function deleteSection(id: number) {
    if (!confirm('Usunąć sekcję razem ze wszystkimi jej osobami?')) return
    await toast.promise(
      api.adminFetch(`/api/admin/sections/${id}`, { method: 'DELETE' }).then(() => reload()),
      { loading: 'Usuwanie...', success: 'Usunięto sekcję', error: 'Błąd usuwania' }
    )
  }

  async function moveSection(id: number, direction: -1 | 1) {
    const ordered = [...sections].sort((a, b) => a.sort_order - b.sort_order)
    const idx = ordered.findIndex((s) => s.id === id)
    const swapWith = idx + direction
    if (swapWith < 0 || swapWith >= ordered.length) return
    ;[ordered[idx], ordered[swapWith]] = [ordered[swapWith], ordered[idx]]
    
    await toast.promise(
      api.adminFetch('/api/admin/sections/reorder', {
        method: 'POST',
        body: JSON.stringify({ ids: ordered.map((s) => s.id) }),
      }).then(() => reload()),
      { loading: 'Zmiana kolejności...', success: 'Zmieniono', error: 'Błąd' }
    )
  }

  async function addMember(sectionId: number) {
    const name = prompt('Imię i nazwisko')
    if (!name) return
    const role = prompt('Rola') ?? ''
    
    await toast.promise(
      api.adminFetch('/api/admin/members', {
        method: 'POST',
        body: JSON.stringify({ section_id: sectionId, name, role }),
      }).then(() => reload()),
      { loading: 'Dodawanie...', success: 'Dodano', error: 'Błąd' }
    )
  }

  async function updateMember(id: number, patch: Partial<MemberRow>) {
    await toast.promise(
      api.adminFetch(`/api/admin/members/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      }).then(() => reload()),
      { loading: 'Zapisywanie osoby...', success: 'Zapisano', error: 'Błąd zapisu' }
    )
  }

  async function deleteMember(id: number) {
    if (!confirm('Usunąć tę osobę?')) return
    await toast.promise(
      api.adminFetch(`/api/admin/members/${id}`, { method: 'DELETE' }).then(() => reload()),
      { loading: 'Usuwanie...', success: 'Usunięto', error: 'Błąd usuwania' }
    )
  }

  async function moveMember(sectionId: number, id: number, direction: -1 | 1) {
    const ordered = members
      .filter((m) => m.section_id === sectionId)
      .sort((a, b) => a.sort_order - b.sort_order)
    const idx = ordered.findIndex((m) => m.id === id)
    const swapWith = idx + direction
    if (swapWith < 0 || swapWith >= ordered.length) return
    ;[ordered[idx], ordered[swapWith]] = [ordered[swapWith], ordered[idx]]
    
    await toast.promise(
      api.adminFetch('/api/admin/members/reorder', {
        method: 'POST',
        body: JSON.stringify({ section_id: sectionId, ids: ordered.map((m) => m.id) }),
      }).then(() => reload()),
      { loading: 'Zmiana kolejności...', success: 'Zmieniono', error: 'Błąd' }
    )
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

      {orderedSections.map((section) => (
        <AdminSection
          key={section.id}
          section={section}
          members={members}
          orderedSections={orderedSections}
          onUpdateSection={updateSection}
          onMoveSection={moveSection}
          onDeleteSection={deleteSection}
          onAddMember={addMember}
          onUpdateMember={updateMember}
          onMoveMember={moveMember}
          onDeleteMember={deleteMember}
          onLocalTitleChange={(id, newTitle) => 
            setSections((prev) =>
              prev.map((s) => (s.id === id ? { ...s, title: newTitle } : s))
            )
          }
        />
      ))}
    </div>
  )
}
