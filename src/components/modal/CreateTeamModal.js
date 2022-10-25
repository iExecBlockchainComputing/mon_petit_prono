import './createTeamModal.css'
import React from 'react'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'
import { contract } from '../../utils/WebProvider'
import { addLeagueIPFS } from '../../utils/Ipfs'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function CreateTeamModal(props) {
  let { leagueId } = useParams()
  const [ipfsImage, setIpfsImage] = useState(undefined)
  const [teamName, setTeamName] = useState(undefined)
  const [color, setColor] = useState(undefined)

  async function CreateTeamSM() {
    const _TeamId = uuidv4()
    const ListIdTeam = await contract.getMyTeamFromOneLeague(leagueId)
    while (ListIdTeam.includes(_TeamId)) {
      _TeamId = uuidv4()
    }
    const _teamName = teamName
    const _TeamColor = color
    const _ipfs = ipfsImage
    if (
      _ipfs !== undefined &&
      _teamName !== undefined &&
      _TeamColor !== undefined
    ) {
      const imgPath = await addLeagueIPFS(_TeamId, _teamName, _ipfs, _TeamColor)
      if (imgPath !== null) {
        await contract.addTeam(leagueId, _TeamId, _teamName, imgPath)
      }
    } else {
      alert('Please fill all the fields')
    }
    props.onHide()
  }

  useEffect(() => {
    setIpfsImage(undefined)
    setTeamName(undefined)
    setColor(undefined)
  }, [props.show === false])

  return (
    <Modal
      id="modalPopup"
      {...props}
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
              <Form.Label>Password to join your Team</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <FileInput title={'Choose your Image'} addImage={setIpfsImage} />
          <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#563d7c"
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
