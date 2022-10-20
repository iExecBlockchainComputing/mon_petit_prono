import './homePage.css'
import Home from '../components/homePage/Home'
import League from '../components/homePage/League'
import AddLeague from '../components/homePage/AddLeague'

function HomePage() {
  return (
    <div className="homePage">
      <Home />
      <League />
      <AddLeague />
    </div>
  )
}

export default HomePage
