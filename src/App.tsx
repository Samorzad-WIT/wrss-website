import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <main>
        <Routes>
          {/* Strona główna (single page) */}
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
