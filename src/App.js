import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ToolBar from './components/navBar/NavBar'
import Footer from './components/footer/Footer'
import PronoPage from './pages/PronoPage'
import TeamPage from './pages/TeamPage'
import TeamCreation from './pages/TeamCreation'
import Forecast from './components/pronoPage/Forecast'
import Ranking from './components/pronoPage/Ranking'
import WebProvider from './components/modal/WebProvider'

function App() {
  return (
    <div className="app">
      <WebProvider />
      <ToolBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teamPage" element={<TeamPage />} />
        <Route path="/teamPage/pronoPage" element={<PronoPage />}>
          <Route path="/teamPage/pronoPage/forecast" element={<Forecast />} />
          <Route path="/teamPage/pronoPage/ranking" element={<Ranking />} />
        </Route>
        <Route path="/teamPage/createTeam" element={<TeamCreation />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
