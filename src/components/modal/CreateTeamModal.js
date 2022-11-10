import './createTeamModal.css'
import React from 'react'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { addLeagueIPFS } from '../../utils/Ipfs'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function CreateTeamModal(props) {
  let { leagueId } = useParams()
  const [ipfsImage, setIpfsImage] = useState(undefined)
  const [teamName, setTeamName] = useState(undefined)
  const [playerName, setPlayerName] = useState(undefined)
  const [color, setColor] = useState('#ffffff')

  async function CreateTeamSM() {
    const _TeamId = uuidv4()
    const ListIdTeam = await MonPetitPronoContract.getMyTeamFromOneLeague(leagueId)
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
        await MonPetitPronoContract.addTeam(
          leagueId,
          _TeamId,
          _teamName,
          _playerName,
          imgPath,
        )
        props.setLoading(true)
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Your Player Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Player Name"
              />
            </Form.Group>
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
            <Button onClick={CreateTeamSM} type="submit">
              Create
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  )
}
