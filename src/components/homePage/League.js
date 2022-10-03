import './league.css'
import React from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import worlcupQuatar from '../../assets/worlcupQuatar.png'
import euro2021 from '../../assets/euro2021.png'
import { useNavigate } from 'react-router-dom'
import ReactCardCarousel from 'react-card-carousel'

export default function League() {
  return (
    <Container id="test">
      <Row>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2022'}
            Name={"Coupe d'Europe"}
            img={euro2021}
            backgroungColor={'#23548B'}
          />
        </Col>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2022'}
            Name={'Coupe du Monde'}
            img={worlcupQuatar}
            backgroungColor={'#980b33'}
          />
        </Col>
      </Row>
    </Container>
  )
}

function OneCardLeague({ years, Name, img, backgroungColor }) {
  const [flip, setFlip] = useState(false)
  const naviguate = useNavigate()
  const handle = () => {
    naviguate('./teamPage')
  }

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <Card
        id="cardLeagueFront"
        onMouseEnter={() => setFlip(!flip)}
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
        <Container>
          <h2></h2>
        </Container>
        <Button onClick={handle}>Join Competition</Button>
      </Card>
    </ReactCardFlip>
  )
}
