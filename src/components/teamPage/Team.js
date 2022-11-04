import './team.css'
import { Container, Row, Col } from 'react-bootstrap'
import AddTeam from './AddTeam'
import { useSelector } from 'react-redux'
import { contract } from '../../utils/WebProvider'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OneCardTeam from './OneCardTeam'

export default function Team() {
  let { leagueId } = useParams()
  const [teamInfo, setTeamInfo] = useState([])
  const [newTeamsCreated, setNewTeamsCreated] = useState(null)
  const wallet = useSelector((state) => state.wallet)

  contract.on('NewTeam', (_LeagueId, _TeamId, _Team_name) => {
    console.log('newTeamsCreated : ', _TeamId)
    setNewTeamsCreated(_TeamId)
  })

  useEffect(() => {
    tabLeaguesInfo()
  }, [newTeamsCreated])

  const tabLeaguesInfo = async () => {
    const teamId = await contract.getMyTeamFromOneLeague(leagueId)
    let teamInfo = await Promise.all(
      teamId.map(async (e) => {
        return await contract.getTeamsInfos(leagueId, e)
      }),
    )
    console.log(teamInfo)
    setTeamInfo(teamInfo)
  }

  return (
    <Container id="teamPool">
      <Row>
        {teamInfo.map((e) => (
          <Col key={uuidv4()}>
            <OneCardTeam key={uuidv4()} id={e[0]} el={e[2]} Name={e[1]} />
          </Col>
        ))}
        <Col>
          <AddTeam />
        </Col>
      </Row>
    </Container>
  )
}
