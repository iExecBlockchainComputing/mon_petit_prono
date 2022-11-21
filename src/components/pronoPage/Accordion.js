import './accordion.css'
import OneCardForecast from './OneCardForecast'
import countryList from 'react-select-country-list'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function Accordion({
  date,
  diffDate,
  forecast,
  convertTimestampToDate,
}) {
  let { leagueId, teamId } = useParams()
  const wallet = useSelector((state) => state.wallet)
  const [isOpen, setIsOpen] = useState(false)
  const [owner, setOwner] = useState(false)
  const [score1, setScore1] = useState(null)
  const [score2, setScore2] = useState(null)

  function OpenAccordion() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (date === diffDate[diffDate.length - 1]) {
      setIsOpen(true)
    }

  }, [])

  useEffect(() => {
    async function getOwner() {
      let actualAccount = wallet.accountAddress.toLowerCase()
      let ownerContractAddress = (
        await MonPetitPronoContract.owner()
      ).toLowerCase()
      if (actualAccount === ownerContractAddress) {
        setOwner(true)
        console.log('Your are the owner of the smart Contract')
      }
    }
    getOwner()
  }, [wallet.accountAddress])

  async function saveScoreMatch(id) {
    if (score1 !== null && score2 !== null) {
      const tra = await MonPetitPronoContract.setForecastResult(leagueId, id, [
        score1,
        score2,
      ])
      await tra.wait()

      window.location.reload()
    }
    console.log(id)
  }

  return (
    <div>
      <Row id="lineDate" onClick={OpenAccordion}>
        <h3 id="date">
          {!isOpen && (
            <IoIosArrowForward id="arrowIcon" color="#fcd15a" size={15} />
          )}
          {isOpen && (
            <IoIosArrowDown id="arrowIcon" color="#fcd15a" size={15} />
          )}
          {date}
        </h3>
        <Row></Row>
      </Row>
      <Row>
        {isOpen &&
          forecast.map(
            (elem) =>
              convertTimestampToDate(elem[5]).split(' ')[0] === date && (
                <div key={elem[0]}>
                  <OneCardForecast
                    id={elem[0]}
                    countryCode1={() => countryList().getValue(elem[1][0])}
                    countryCode2={() => countryList().getValue(elem[1][1])}
                    countryName1={elem[1][0]}
                    countryName2={elem[1][1]}
                    prono={elem[2]}
                    date={() => convertTimestampToDate(elem[5])}
                    available={elem[6]}
                    score={elem[3]}
                    nbPoints={elem[4]}
                    checkFinaleScoreSet={elem[7]}
                  />
                  {owner && !elem[7] && (
                    <Row id="sendScore">
                      <Col
                        style={{
                          maxWidth: '15%',
                          margin: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <Form.Control
                          id="score"
                          type="number"
                          placeholder="..."
                          onChange={(e) => {
                            e.preventDefault()
                            if (e.target.value === '') {
                              setScore1(null)
                            } else {
                              setScore1(parseFloat(e.target.value))
                            }
                          }}
                        />
                      </Col>
                      <Col
                        style={{
                          maxWidth: '10%',
                          margin: 'auto',
                          textAlign: 'center',
                          color: '#fcd15a',
                        }}
                      >
                        <h1>-</h1>
                      </Col>
                      <Col
                        style={{
                          maxWidth: '15%',
                          margin: 'auto',
                          textAlign: 'center',
                        }}
                      >
                        <Form.Control
                          id="score"
                          type="number"
                          placeholder="..."
                          onChange={(e) => {
                            e.preventDefault()
                            if (e.target.value === '') {
                              setScore2(null)
                            } else {
                              setScore2(parseFloat(e.target.value))
                            }
                          }}
                        />
                      </Col>
                      <Col
                        style={{
                          maxWidth: '50%',
                          margin: 'auto',
                          textAlign: 'start',
                        }}
                      >
                        <Button
                          id="sendScoreButton"
                          onClick={() => saveScoreMatch(elem[0])}
                        >
                          Save Score
                        </Button>
                      </Col>
                    </Row>
                  )}
                </div>
              ),
          )}
      </Row>
    </div>
  )
}
