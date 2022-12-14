import './league.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { v4 as uuidv4 } from 'uuid'
import OneCardLeague from './OneCardLeague'
import AddLeague from './AddLeague'
import { useSelector } from 'react-redux'
const { ethereum } = window

export default function League() {
  const [leaguesInfo, setLeaguesInfo] = useState([])
  const [owner, setOwner] = useState(false)
  const [newLeagueCreated, setNewLeagueCreated] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingContent, setLoadingContent] = useState([])
  const wallet = useSelector((state) => state.wallet)

  MonPetitPronoContract.on('NewLeague', (_LeagueId, _League_name) => {
    console.log('New League Created', _LeagueId)
    setNewLeagueCreated(_LeagueId)
    setLoading(false)
  })

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

  useEffect(() => {
    tabLeaguesInfo()
    console.log('newLeagueCreated : ', newLeagueCreated)
  }, [newLeagueCreated])

  const tabLeaguesInfo = async () => {
    const leagueId = await MonPetitPronoContract.getLeaguesID()
    let leaguesInfo = await Promise.all(
      leagueId.map(async (e) => {
        return await MonPetitPronoContract.getLeagueById(e)
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
              years={'2022'}
              Name={e[1]}
              ipfs={e[2]}
              StartDate={'20/11/2022'}
              EndDate={'18/12/2022'}
              NbNFT={'68'}
            />
          </Col>
        ))}
        {loading &&
          loadingContent.map((elem, index) => <Col key={index}>{elem}</Col>)}
        {owner && (
          <Col>
            <AddLeague
              setLoading={setLoading}
              loadingValues={[loadingContent, setLoadingContent]}
            />
          </Col>
        )}
      </Row>
    </Container>
  )
}
