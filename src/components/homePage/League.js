import './league.css'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { contract } from '../../utils/WebProvider'
import OneCardLeague from './OneCardLeague'
import worldCup2022 from '../../assets/worldCup2022.png'
import worldCup2018 from '../../assets/worldCup2018.png'
import worldCup2014 from '../../assets/worldCup2014.png'
import euro2012 from '../../assets/euro2012.png'
import euro2016 from '../../assets/euro2016.png'
import euro2020 from '../../assets/euro2020.png'

export default function League() {
  const wallet = useSelector((state) => state.wallet)
  const [leaguesInfo, setLeaguesInfo] = useState([])
  useEffect(() => {
    LeaguesInfo()
  }, [])

  const LeaguesInfo = async () => {
    const leagueId = await contract.getLeaguesID()
    let leaguesInfo = await Promise.all(
      leagueId.map(async (e) => {
        return await contract.getLeagueById(e)
      }),
    )
    setLeaguesInfo(leaguesInfo)
  }

  return (
    <Container id="league">
      <Row>
        <Col>
          {leaguesInfo.map((e) => (
            <OneCardLeague
              key={e[0]}
              id={e[0]}
              years={'2012'}
              Name={e[1]}
              img={euro2012}
              backgroungColor={'#ffffff'}
              StartDate={'21/09/2022'}
              EndDate={'19/10/2022'}
              NbLeague={'12'}
              NbNFT={'20'}
            />
          ))}
        </Col>
      </Row>
    </Container>
  )
}
