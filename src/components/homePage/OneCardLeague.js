import './OneCardLeague.css'
import ReactCardFlip from 'react-card-flip'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Container, Card, Button } from 'react-bootstrap'

export default function OneCardLeague({
  id,
  StartDate,
  EndDate,
  NbLeague,
  NbNFT,
  years,
  Name,
  img,
  backgroungColor,
}) {
  const [flip, setFlip] = useState(false)
  const naviguate = useNavigate()
  const handle = () => {
    naviguate('./teamPage')
  }
  
  return (
    <ReactCardFlip id={id} isFlipped={flip} flipDirection="horizontal">
      <Card
        id="cardLeagueFront"
        onClick={() => setFlip(!flip)}
        style={{ backgroundColor: backgroungColor }}
      >
        <img src={img} alt="League immage" />
      </Card>
      <Card
        id="cardLeagueBack"
        onMouseLeave={() => setFlip(!flip)}
        style={{ backgroundColor: backgroungColor }}
      >
        <h1>{Name}</h1>
        <h3>- {years} -</h3>
        <Container id="infos">
          <h2>Start Date: </h2>
          <h3>{id}</h3>
          <br />
          <h2>End Date: </h2>
          <h3>{EndDate}</h3>
          <br />
          <h2>Nb of League: </h2>
          <h3>{NbLeague}</h3>
          <br />
          <h2>NFT to Win: </h2>
          <h3>{NbNFT}</h3>
        </Container>
        <Button onClick={handle}>Join Competition</Button>
      </Card>
    </ReactCardFlip>
  )
}
