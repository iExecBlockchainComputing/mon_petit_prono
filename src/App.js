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
import NftViewer from './pages/NftViewer'

function App() {
  return (
    <div className="app">
      <ToolBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account/nft" element={<NftViewer />} />
        <Route path="/:leagueId/:leagueName" element={<TeamPage />} />
        <Route
          path="/:leagueId/:leagueName/:teamId/:teamName"
          element={<PronoPage />}
        >
          <Route
            path="/:leagueId/:leagueName/:teamId/:teamName/forecast"
            element={<Forecast />}
          />
          <Route
            path="/:leagueId/:leagueName/:teamId/:teamName/ranking"
            element={<Ranking />}
          />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
