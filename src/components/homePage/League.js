import './league.css'
import React from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

import worldCup2022 from '../../assets/worldCup2022.png'
import worldCup2018 from '../../assets/worldCup2018.png'
import worldCup2014 from '../../assets/worldCup2014.png'
import euro2012 from '../../assets/euro2012.png'
import euro2016 from '../../assets/euro2016.png'
import euro2020 from '../../assets/euro2020.png'

export default function League() {
  const wallet = useSelector((state) => state.wallet)
  
  useEffect(() => {
    console.log(wallet.contract)
  }, [])


  return (
    <Container id="league">
      <Row>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2012'}
            Name={'Coupe du Monde'}
            img={euro2012}
            backgroungColor={'#ffffff'}
            StartDate={'21/09/2022'}
            EndDate={'19/10/2022'}
            NbLeague={'12'}
            NbNFT={'20'}
          />
        </Col>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2014'}
            Name={'Coupe du Monde'}
            img={worldCup2014}
            backgroungColor={'#f4f4cd'}
            StartDate={'21/09/2022'}
            EndDate={'19/10/2022'}
            NbLeague={'12'}
            NbNFT={'20'}
          />
        </Col>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2016'}
            Name={'Coupe du Monde'}
            img={euro2016}
            backgroungColor={'#bec4c9'}
            StartDate={'21/09/2022'}
            EndDate={'19/10/2022'}
            NbLeague={'12'}
            NbNFT={'20'}
          />
        </Col>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2018'}
            Name={'Coupe du Monde'}
            img={worldCup2018}
            backgroungColor={'#0e7ab8'}
            StartDate={'21/09/2022'}
            EndDate={'19/10/2022'}
            NbLeague={'12'}
            NbNFT={'20'}
          />
        </Col>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2020'}
            Name={"Coupe d'Europe"}
            img={euro2020}
            backgroungColor={'#bcf0fb'}
            StartDate={'21/06/2022'}
            EndDate={'19/07/2022'}
            NbLeague={'11'}
            NbNFT={'15'}
          />
        </Col>
        <Col>
          <OneCardLeague
            id="OneCardLeague"
            years={'2022'}
            Name={'Coupe du Monde'}
            img={worldCup2022}
            backgroungColor={'#980b33'}
            StartDate={'21/09/2022'}
            EndDate={'19/10/2022'}
            NbLeague={'12'}
            NbNFT={'20'}
          />
        </Col>
      </Row>
    </Container>
  )
}

function OneCardLeague({
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
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
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
          <h3>{StartDate}</h3>
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
