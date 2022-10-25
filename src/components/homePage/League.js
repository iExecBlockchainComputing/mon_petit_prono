import './league.css'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { contract } from '../../utils/WebProvider'
import { v4 as uuidv4 } from 'uuid'
import OneCardLeague from './OneCardLeague'
import AddLeague from './AddLeague'
const { ethereum } = window

export default function League() {
  const [leaguesInfo, setLeaguesInfo] = useState([])
  const [owner, setOwner] = useState(false)
  const wallet = useSelector((state) => state.wallet)
  let newLeagueCreated = contract.on(
    'NewLeague',
    (_LeagueId, _League_name, _ipfs) => {
      console.log('New League Created')
      return _LeagueId
    },
  )

  useEffect(() => {
    async function getOwner() {
      let actualAccount = wallet.accountAddress.toLowerCase()
      let ownerContractAddress = (await contract.owner()).toLowerCase()
      if (actualAccount === ownerContractAddress) {
        setOwner(true)
        console.log('Your are the owner of the smart Contract')
      }
    }
    getOwner()
  }, [wallet.accountAddress])

  useEffect(() => {
    tabLeaguesInfo()
    console.log('newLeagueCreated : ', newLeagueCreated)
  }, [newLeagueCreated])

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
              el={e[2]}
              StartDate={'21/09/2022'}
              EndDate={'19/10/2022'}
              NbLeague={'12'}
              NbNFT={'20'}
            />
          </Col>
        ))}
        {owner && (
          <Col>
            <AddLeague />
          </Col>
        )}
      </Row>
    </Container>
  )
}
