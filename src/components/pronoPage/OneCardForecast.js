import './oneCardForecast.css'
import { useState, useEffect } from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'

export default function OneCardForecast({
  id,
  setCardInfo,
  countryCode1,
  countryCode2,
  countryName1,
  countryName2,
  date,
}) {
  const [score1, setScore1] = useState(null)
  const [score2, setScore2] = useState(null)
  const playersBets = setCardInfo[0]
  const setPlayersBets = setCardInfo[1]

  useEffect(() => {
    if (score1 !== null && score2 !== null) {
      let test = false
      for (let i = 0; i < playersBets.length; i++) {
        if (playersBets[i].id === id) {
          test = true
          playersBets[i].score1 = score1
          playersBets[i].score2 = score2
        }
      }
      if (!test) {
        setPlayersBets([
          ...playersBets,
          { id: id, score1: score1, score2: score2, date: date },
        ])
      }
    }
  }, [score1, score2])

  return (
    <Card id="forecastCard">
      <Row>
        <h3>{date}</h3>
      </Row>
      <Row>
        <Col id="flagueImage">
          <ReactCountryFlag
            countryCode={countryCode1()}
            style={{
              fontSize: '6em',
            }}
          />
          <h2>{countryName1}</h2>
        </Col>
        <Col id="scoreContent">
          <Row>
            <Col id="ttt">
              <Form.Control
                id="score"
                type="number"
                placeholder="..."
                onChange={(e) => setScore1(e.target.value)}
              />
            </Col>
            <Col>
              <h1>-</h1>
            </Col>
            <Col>
              <Form.Control
                id="score"
                type="number"
                placeholder="..."
                onChange={(e) => setScore2(e.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col id="flagueImage">
          <ReactCountryFlag
            countryCode={countryCode2()}
            style={{
              fontSize: '6em',
            }}
          />
          <h2>{countryName2}</h2>
        </Col>
      </Row>
    </Card>
  )
}
