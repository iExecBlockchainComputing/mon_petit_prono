import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import ToolBar from './components/navBar/NavBar.js'
import Footer from './components/footer/Footer.js'
import PronoPage from './pages/PronoPage.js'
import TeamPage from './pages/TeamPage.js'
import Forecast from './components/pronoPage/Forecast.js'
import Ranking from './components/pronoPage/Ranking.js'

function App() {
  return (
    <div className="app">
      <ToolBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teamPage" element={<TeamPage />} />
        <Route path="/teamPage/pronoPage" element={<PronoPage />}>
          <Route path="/teamPage/pronoPage/forecast" element={<Forecast />} />
          <Route path="/teamPage/pronoPage/ranking" element={<Ranking />} />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
