import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WednesdayPopup from './components/ui/WednesdayPopup'
import Home from './pages/Home'
import Wydarzenia from './pages/Wydarzenia'

function App() {
  return (
    <div className="app-wrapper">
      <WednesdayPopup />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wydarzenia" element={<Wydarzenia />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
