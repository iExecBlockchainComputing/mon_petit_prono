import './oneCardForecast.css'
import { useState, useEffect } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'

export default function OneCardForecast({
  id,
  setCardInfo,
  countryCode1,
  countryCode2,
  countryName1,
  countryName2,
  date,
  available,
}) {
  const [score1, setScore1] = useState(null)
  const [score2, setScore2] = useState(null)
  const [availableBet, setAvailableBet] = useState(false)
  const playersBets = setCardInfo[0]
  const setPlayersBets = setCardInfo[1]

  useEffect(() => {
    if (available === 1) {
      setAvailableBet(true)
    }
  }, [])

  useEffect(() => {
    if (score1 !== null && score2 !== null) {
      if (
        Number.isInteger(score1) &&
        Number.isInteger(score2) &&
        10 > score1 &&
        score1 >= 0 &&
        10 > score2 &&
        score2 >= 0
      ) {
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
      } else {
        alert('Please enter a valid score')
      }
    }
  }, [score1, score2])

  return (
    <>
      <Card id="forecastCard">
        <Row>
          <h3>{date()}</h3>
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
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setScore1(null)
                    } else {
                      setScore1(parseFloat(e.target.value))
                    }
                  }}
                  disabled={availableBet}
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
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setScore1(null)
                    } else {
                      setScore2(parseFloat(e.target.value))
                    }
                  }}
                  disabled={availableBet}
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
    </>
  )
}
