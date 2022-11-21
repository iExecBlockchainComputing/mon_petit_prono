import './oneCardForecast.css'
import { useState, useEffect } from 'react'
import { Row, Col, Card, Form } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'
import { useSelector, useDispatch } from 'react-redux'

export default function OneCardForecast({
  id,
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
  let [score1, setScore1] = useState(null)
  let [score2, setScore2] = useState(null)
  const [notAvailableBet, setNotAvailableBet] = useState(false)
  const playersBets = useSelector((state) => state.forecastProno)
  const dispatch = useDispatch()

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
    if (score1 !== null && score2 !== null && available === 0) {
      if (
        Number.isInteger(score1) &&
        Number.isInteger(score2) &&
        10 > score1 &&
        score1 >= 0 &&
        10 > score2 &&
        score2 >= 0
      ) {
        let test = false
        if (playersBets.prono.length > 0) {
          console.log('no')
          let CopieBets = playersBets.prono
          for (let i = 0; i < CopieBets.length; i++) {
            if (CopieBets[i].id === id) {
              let copieEl = { ...CopieBets[i] }
              CopieBets = CopieBets.filter((el) => el.id !== id)
              test = true
              copieEl.score1 = score1
              copieEl.score2 = score2
              CopieBets.push(copieEl)
            }
          }
          if (!test) {
            console.log('yes')
            dispatch({
              type: 'forecastProno/updateForecastProno',
              payload: [
                ...CopieBets,
                { id: id, score1: score1, score2: score2 },
              ],
            })
          } else {
            console.log('no')
            dispatch({
              type: 'forecastProno/updateForecastProno',
              payload: [{ id: id, score1: score1, score2: score2 }],
            })
          }
        } else {
          console.log('test')
          let test = { id: id, score1: score1, score2: score2 }
          dispatch({
            type: 'forecastProno/updateForecastProno',
            payload: [{ id: id, score1: score1, score2: score2 }],
          })
        }
        console.log('in useEfect', playersBets.prono)
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
