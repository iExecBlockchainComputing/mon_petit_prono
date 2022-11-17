import './createTeamModal.css'
import { Skeleton } from '@mui/material'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { addLeagueIPFS } from '../../utils/Ipfs'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function CreateTeamModal(props) {
  let { leagueId, teamId } = useParams()
  let elemsLoading = useSelector((state) => state.teamLoading)
  let tabCopy = [...elemsLoading.elemLoading]
  const dispatch = useDispatch()
  const [ipfsImage, setIpfsImage] = useState(undefined)
  const [teamName, setTeamName] = useState(undefined)
  const [teamNameAlreadyExist, setTeamNameAlreadyExist] = useState(false)
  const [playersInfo, setPlayersInfo] = useState([])
  const [playerName, setPlayerName] = useState(undefined)
  const [playerNameAlreadyExist, setPlayerNeamAlreadyExist] = useState(false)
  const [ListIdTeam, setListIdTeam] = useState([])
  const [teamInfo, setTeamInfo] = useState([])
  const [color, setColor] = useState('#ffffff')

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const ListIdTeam = await MonPetitPronoContract.getMyTeamFromOneLeague(
      leagueId,
    )
    setListIdTeam(ListIdTeam)
    let teamInfo = await Promise.all(
      ListIdTeam.map(async (e) => {
        return await MonPetitPronoContract.getTeamsInfos(leagueId, e)
      }),
    )
    setTeamInfo(teamInfo)
    let playersInfo = await Promise.all(
      ListIdTeam.map(async (id) => {
        const playersId = await MonPetitPronoContract.getAllPlayerAddrFromOneTeam(
          leagueId,
          id,
        )
        let playersInfo = await Promise.all(
          playersId.map(async (e) => {
            let info = await MonPetitPronoContract.getPlayerInfo(
              leagueId,
              id,
              e,
            )
            return info[0]
          }),
        )
        return playersInfo
      }),
    )
    setPlayersInfo(playersInfo)
  }

  useEffect(() => {
    verifyTeamName()
  }, [teamName])

  async function verifyTeamName() {
    let teamNameAlreadyExist = teamInfo.filter((e) => e[1].toLowerCase() === teamName.toLowerCase())
    if (teamNameAlreadyExist.length > 0) {
      setTeamNameAlreadyExist(true)
    } else {
      setTeamNameAlreadyExist(false)
    }
  }

  useEffect(() => {
    verifyPlayerName()
  }, [playerName])

  async function verifyPlayerName() {
    let playerNameAlreadyExist = playersInfo.filter((tabPlayers) => {
      for (var name of tabPlayers) {
        if (name.toLowerCase() === playerName.toLowerCase()) {
          return true
        }
      }
    })
    if (playerNameAlreadyExist.length > 0) {
      setPlayerNeamAlreadyExist(true)
    } else {
      setPlayerNeamAlreadyExist(false)
    }
  }

  async function CreateTeamSM() {
    const _TeamId = uuidv4()
    while (ListIdTeam.includes(_TeamId)) {
      _TeamId = uuidv4()
    }
    const _teamName = teamName
    const _TeamColor = color
    const _ipfs = ipfsImage
    const _playerName = playerName
    if (
      _ipfs !== undefined &&
      _teamName !== undefined &&
      _playerName !== undefined
    ) {
      props.onHide()
      const imgPath = await addLeagueIPFS(
        _TeamId,
        _teamName,
        _ipfs,
        _playerName,
        _TeamColor,
      )
      if (imgPath !== null) {
        let tra = await MonPetitPronoContract.addTeam(
          leagueId,
          _TeamId,
          _teamName,
          _playerName,
          imgPath,
        )
        dispatch({
          type: 'teamLoading/updateElemLoading',
          payload: [...tabCopy, 'oneMore'],
        })
        await tra.wait()
        window.location.reload()
      } else {
        alert('Une Erreur est survenue avec le stockage offchain')
      }
    } else {
      alert('Please fill all the fields')
    }
  }

  useEffect(() => {
    setIpfsImage(undefined)
    setTeamName(undefined)
    setColor(undefined)
  }, [props.show === false])

  return (
    <Modal
      id="modalPopup"
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Row id="modalTitle">
          <Col md={1} id="icon">
            <BsPersonCircle size={45} />
          </Col>
          <Col id="title">Create Your Team</Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <Container id="CreationFormTeam">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of your Team</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the name of your team"
                onChange={(e) => setTeamName(e.target.value)}
              />
              {teamNameAlreadyExist && (
                <h3 id="teamNameAlreadySet">This name of team already exist</h3>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Your Player Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Player Name"
              />
            </Form.Group>
            {playerNameAlreadyExist && (
              <h3 id="playerNameAlreadySet">This name of team already exist</h3>
            )}
          </Form>
          <FileInput title={'Choose your Image'} setIpfsImage={setIpfsImage} />
          <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#ffffff"
            title="Choose your color"
            onChange={(e) => setColor(e.target.value)}
          />
          <div id="button">
            <Button
              disabled={
                teamNameAlreadyExist && playerNameAlreadyExist ? true : false
              }
              onClick={CreateTeamSM}
              type="submit"
            >
              Create
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  )
}
