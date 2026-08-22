import type { ReactNode } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WednesdayPopup from './components/ui/WednesdayPopup'
import Home from './pages/Home'
import Wydarzenia from './pages/Wydarzenia'
import Admin from './pages/Admin'

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-wrapper">
      <WednesdayPopup />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Routes>
        <Route
          path="/"
          element={
            <SiteLayout>
              <Home />
            </SiteLayout>
          }
        />
        <Route
          path="/wydarzenia"
          element={
            <SiteLayout>
              <Wydarzenia />
            </SiteLayout>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
