import './league.css'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { contract } from '../../utils/WebProvider'
import { v4 as uuidv4 } from 'uuid'
import OneCardLeague from './OneCardLeague'
import AddLeague from './AddLeague'
import euro from '../../assets/euro2020.png'

export default function League() {
  const wallet = useSelector((state) => state.wallet)
  const [leaguesInfo, setLeaguesInfo] = useState([])

  useEffect(() => {
    tabLeaguesInfo()
  }, [])

  const tabLeaguesInfo = async () => {
    const leagueId = await contract.getLeaguesID()
    let leaguesInfo = await Promise.all(
      leagueId.map(async (e) => {
        return await contract.getLeagueById(e)
      }),
    )
    console.log(leaguesInfo)
    setLeaguesInfo(leaguesInfo)
  }

 

  return (
    <Container id="league">
      <Row>
        {leaguesInfo.map((e) => (
          <Col key={uuidv4()}>
            <OneCardLeague
              key={uuidv4()}
              id={e[0]}
              years={'2012'}
              Name={e[1]}
              el={e}
              StartDate={'21/09/2022'}
              EndDate={'19/10/2022'}
              NbLeague={'12'}
              NbNFT={'20'}
            />
          </Col>
        ))}
        <Col>
          <AddLeague />
        </Col>
      </Row>
    </Container>
  )
}
