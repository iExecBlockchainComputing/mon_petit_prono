import './ranking.css'
import { Container, Button } from 'react-bootstrap'
import { Stack, LinearProgress } from '@mui/material'
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from 'react'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Ranking() {
  let { leagueId, teamId } = useParams()
  const [ranking, setRanking] = useState([])
  const [loadingRanking, setLoadingRanking] = useState(false)
  const naviguate = useNavigate()

  useEffect(() => {
    getRanking()
  }, [])

  const getRanking = async () => {
    const playersId = await MonPetitPronoContract.getAllPlayerAddrFromOneTeam(
      leagueId,
      teamId,
    )
    let forecastInfo = await Promise.all(
      playersId.map(async (e) => {
        let info = await MonPetitPronoContract.getPlayerInfo(
          leagueId,
          teamId,
          e,
        )
        let OnePlayer = [...info]
        OnePlayer[1] = OnePlayer[1].toNumber()
        return [...OnePlayer, e]
      }),
    )
    forecastInfo.sort((a, b) => b[1] - a[1])
    setRanking(forecastInfo)
    console.log('forecast Ranking: ', forecastInfo)
  }

  const UpdateScore = async () => {
    setLoadingRanking(true)
    const tr = await MonPetitPronoContract.updateScore(leagueId, teamId)
    await tr.wait()
    window.location.reload()
  }

  return (
    <Container id="ranking">
      {!loadingRanking && (
        <Button id="updateScore" onClick={UpdateScore}>
          <h1 id="linear-wide">Update Your Rank</h1>
        </Button>
      )}
      {loadingRanking && (
        <Stack sx={{ width: '100%', color: 'grey.500', margin: 'auto', marginBottom: '5%' }}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      <Table striped>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Number of Points</th>
            <th>Player Name</th>
            <th>Wallet ID</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((e, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{e[1]}</td>
              <td>{e[0]}</td>
              <td id="walletID">{e[2]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}
