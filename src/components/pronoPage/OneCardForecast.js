import './oneCardForecast.css'
import { useState, useEffect } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'
import { MonPetitPronoContract, OracleContract } from '../../utils/WebProvider'
import { useParams } from 'react-router-dom'

export default function OneCardForecast({
  id,
  setCardInfo,
  countryCode1,
  countryCode2,
  countryName1,
  countryName2,
  prono,
  date,
  available,
  score,
  nbPoints,
  checkFinaleScoreSet,
}) {
  let { leagueId, teamId } = useParams()
  const [score1, setScore1] = useState(null)
  const [score2, setScore2] = useState(null)
  const [notAvailableBet, setNotAvailableBet] = useState(false)
  const playersBets = setCardInfo[0]
  const setPlayersBets = setCardInfo[1]

  useEffect(() => {
    if (prono[0].toNumber() !== 100 && prono[1].toNumber() !== 100) {
      setScore1(prono[0].toNumber())
      setScore2(prono[1].toNumber())
    }
    if (available === 1) {
      setNotAvailableBet(true)
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
          <Col id="pronoContent">
            <Row>
              <Col>
                <Form.Control
                  id="prono"
                  type="number"
                  defaultValue={prono[0].toNumber() === 100 ? null : prono[0]}
                  placeholder="..."
                  onChange={(e) => {
                    e.preventDefault()
                    console.log(e.target.value)
                    if (e.target.value === '') {
                      setScore1(null)
                    } else {
                      setScore1(parseFloat(e.target.value))
                    }
                  }}
                  disabled={notAvailableBet}
                />
              </Col>
              <Col>
                <h1>-</h1>
              </Col>
              <Col>
                <Form.Control
                  id="prono"
                  type="number"
                  defaultValue={prono[1].toNumber() === 100 ? null : prono[1]}
                  placeholder="..."
                  onChange={(e) => {
                    e.preventDefault()
                    console.log(e.target.value)
                    if (e.target.value === '') {
                      setScore2(null)
                    } else {
                      setScore2(parseFloat(e.target.value))
                    }
                  }}
                  disabled={notAvailableBet}
                />
              </Col>
            </Row>
            {checkFinaleScoreSet && (
              <Row>
                <h3>
                  Score : {score[0].toNumber()} - {score[1].toNumber()}
                </h3>
                <h3>Point : {nbPoints.toNumber()}</h3>
              </Row>
            )}
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
