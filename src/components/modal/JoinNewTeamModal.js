import React from 'react'
import './joinNewTeamModal.css'
import { TextField, Typography, Box, Button } from '@mui/material'
import { Col, Modal, Row, Table, Form } from 'react-bootstrap'
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
      id="modalJoinNewTeam"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="table-responsive overflow-scroll"
      scrollable={true}
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
      <Modal.Body
        id="leaguModalBody"
        style={{
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        <Table id="globalTable">
          {researchResults.map((team) => (
            <TeamRow team={team} onHide={props.onHide} />
          ))}
        </Table>
      </Modal.Body>
    </Modal>
  )
}

function TeamRow({ team, onHide }) {
  let { leagueId } = useParams()
  const [showOrders, setShowOrders] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [nbOfPlayers, setNbOfPlayers] = useState(0)

  async function joinNewTeam() {
    if (playerName.length > 0) {
      await contract.addPlayer(leagueId, team[0], playerName)
      alert('Your Join new Team')
    } else {
      alert('You must enter a Player name')
    }
    onHide()
  }

  useEffect(() => {
    getNbOfPlayers()
  }, [])

  async function getNbOfPlayers() {
    const addressPlayers = await contract.getAllPlayerAddrFromOneTeam(
      leagueId,
      team[0],
    )
    console.log('nb of players : ', addressPlayers.length)
    setNbOfPlayers(addressPlayers.length)
  }

  return (
    <tr key={team[0]} id="OneLigne">
      <Box
        onClick={() => setShowOrders(!showOrders)}
        display="flex"
        justifyContent="space-between"
        id="affichage"
      >
        <Typography id="typographie">{team[1]}</Typography>
        <Typography id="typographie">{team[0]}</Typography>
      </Box>
      {showOrders && (
        <div id="line">
          <Table
            id="tableInfo"
            responsive="sm"
            onClick={() => setShowOrders(false)}
          >
            <tbody>
              <tr>
                <td id="firstCell">RCL Awards</td>
                <td>50 RLC</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td id="firstCell">NFT Awards</td>
                <td>3 NFT</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td id="firstCell">Number of participants</td>
                <td>{nbOfPlayers}</td>
              </tr>
            </tbody>
          </Table>
          <Row id="info">
            <Col>
              <Form.Control
                type="text"
                placeholder="Your Name"
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </Col>
            <Col id="test">
              <Button onClick={joinNewTeam}>JOIN THIS TEAM</Button>
            </Col>
          </Row>
        </div>
      )}
    </tr>
  )
}
