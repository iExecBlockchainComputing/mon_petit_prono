import './team.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Skeleton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import AddTeam from './AddTeam'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import OneCardTeam from './OneCardTeam'

export default function Team() {
  let { leagueId } = useParams()
  let elemsLoading = useSelector((state) => state.teamLoading)
  const dispatch = useDispatch()
  const [teamInfo, setTeamInfo] = useState([])
  const [newTeamsCreated, setNewTeamsCreated] = useState(null)

  MonPetitPronoContract.on('NewTeam', (_LeagueId, _TeamId, _Team_name) => {
    setNewTeamsCreated(_TeamId)
  })

  useEffect(() => {
    tabLeaguesInfo()
    if (elemsLoading.elemLoading.length > 0) {
      let tabCopy = [...elemsLoading.elemLoading]
      dispatch({
        type: 'teamLoading/updateElemLoading',
        payload: tabCopy.pop(),
      })
    }
  }, [newTeamsCreated])

  const tabLeaguesInfo = async () => {
    const teamId = await MonPetitPronoContract.getMyTeamFromOneLeague(leagueId)
    let teamInfo = await Promise.all(
      teamId.map(async (e) => {
        return await MonPetitPronoContract.getTeamsInfos(leagueId, e)
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
        {elemsLoading.elemLoading.length > 0 &&
          elemsLoading.elemLoading.map((elem, index) => (
            <Col key={index}>
              <Skeleton id="teamCardCharging" variant="rectangular" />
            </Col>
          ))}
        <Col>
          <AddTeam />
        </Col>
      </Row>
    </Container>
  )
}
