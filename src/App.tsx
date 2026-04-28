import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ToolsLayout from './pages/tools/ToolsLayout';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />

      <main>
        <Routes>
          {/* Strona główna (single page) */}
          <Route path="/" element={<Home />} />
          
          {/* Narzędzia (oddzielny routing) */}
          <Route path="/narzedzia" element={<ToolsLayout />}>
            {/* W przyszłości tu będą:
            <Route path="kolo" element={<KoloFortuny />} />
            */}
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
