import { useNavigate } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import './team.css'

function Team() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('./pronoPage')
  }
  return (
    <Card onClick={handleClick} id="TeamCard">
      <Card.Img
        variant="top"
        src="https://cdn-images-1.medium.com/max/1200/1*H9Olt4-lI3UWf4mdacCbkg.jpeg"
      />
      <Card.Body>
        <Card.Title>iExec Team</Card.Title>
      </Card.Body>
    </Card>
  )
}
export default Team
