import './league.css'
import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
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
  const [newLeagueCreated, setNewLeagueCreated] = useState(null)
  const [loading, setLoading] = useState(false)
  const wallet = useSelector((state) => state.wallet)
  contract.on('NewLeague', (_LeagueId, _League_name, _ipfs) => {
    console.log('New League Created', _LeagueId)
    setNewLeagueCreated(_LeagueId)
  })

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
    setLoading(true)
    tabLeaguesInfo()
    setLoading(false)
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
        {loading ? (
          <Col>
            <Spinner animation="border" variant="primary" />
          </Col>
        ) : (
          leaguesInfo.map((e) => (
            <Col key={uuidv4()}>
              <OneCardLeague
                key={uuidv4()}
                id={e[0]}
                years={'2012'}
                Name={e[1]}
                ipfs={e[2]}
                StartDate={'20/11/2022'}
                EndDate={'18/11/2022'}
                NbNFT={'68'}
              />
            </Col>
          ))
        )}
        {owner && (
          <Col>
            <AddLeague />
          </Col>
        )}
      </Row>
    </Container>
  )
}
