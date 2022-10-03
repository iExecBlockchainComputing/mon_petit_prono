import './teamPage.css'
import NavMenu from '../components/pronoPage/NavMenu'
import { Outlet } from 'react-router-dom'

export default function TeamPage() {
  return (
    <div>
      <NavMenu/>
      <Outlet/>
    </div>
  )
}
