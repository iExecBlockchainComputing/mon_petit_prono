import React from 'react'
import './joinNewTeamModal.css'
import {
  TextField,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { contract } from '../../utils/WebProvider'
import { useParams } from 'react-router-dom'

export default function JoinNewTeam(props) {
  let { leagueId } = useParams()
  const [searchInput, setSearchInput] = useState('')
  const [AllTeamsAvailable, setAllTeamsAvailable] = useState([])
  const [researchResults, setResearchResults] = useState([])
  const [newTeamsCreated, setNewTeamsCreated] = useState(null)

  contract.on('NewTeam', (_LeagueId, _TeamId, _Team_name, _ipfs) => {
    console.log('newTeamsCreated : ', _LeagueId)
    setNewTeamsCreated(_TeamId)
  })

  useEffect(() => {
    console.log('I am in useEffect')
    GetAllTeams()
  }, [newTeamsCreated])

  async function GetAllTeams() {
    const AllTeamsId = await contract.getFreeTeamFromOneLeague(leagueId)
    let AllTeams = await Promise.all(
      AllTeamsId.map(async (e) => {
        return await contract.getTeamsInfos(leagueId, e)
      }),
    )
    console.log('AllTeams : ', AllTeams)
    setAllTeamsAvailable(AllTeams)
    setResearchResults(AllTeams)
  }

  useEffect(() => {
    if (searchInput.length > 0) {
      const resultsearch = AllTeamsAvailable.filter((e) => {
        return e[1].match(searchInput)
      })
      setResearchResults(resultsearch)
    } else {
      console.log('ce que je veux savoir : ', AllTeamsAvailable)
      setResearchResults(AllTeamsAvailable)
    }
  }, [])

  return (
    <Modal
    id ='modalJoinNewTeam'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <TextField
          fullWidth
          label="Search for a new team..."
          type="search"
          variant="filled"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Modal.Header>
      <TableBody id="leaguModalBody">
        {researchResults.map((team) => (
          <TableRow hover key={team[0]}>
            <TeamRow team={team} onHide={props.onHide} />
          </TableRow>
        ))}
      </TableBody>
    </Modal>
  )
}

function TeamRow({ team, onHide }) {
  let { leagueId } = useParams()
  const [showOrders, setShowOrders] = useState(false)

  function joinNewTeam() {
    alert('Your Join new Team')
    onHide()
  }

  return (
    <TableCell
      key={team[0]}
      onClick={() => setShowOrders(true)}
      component="th"
      scope="row"
    >
      <Box display="flex" justifyContent="space-between">
        <Typography id="typographie">{team[1]}</Typography>
        <Typography id="typographie">{team[0]}</Typography>
      </Box>
      {showOrders && (
        <Box>
          <Button fullWidth onClick={joinNewTeam} id="test">
            JOIN THIS TEAM
          </Button>
        </Box>
      )}
    </TableCell>
  )
}
