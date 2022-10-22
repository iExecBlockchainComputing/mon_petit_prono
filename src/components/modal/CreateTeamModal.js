import './createTeamModal.css'
import React from 'react'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import { useState } from 'react'
import FileInput from '../../utils/FileInput'

export default function CreateTeamModal(props) {
  const [ipfsImage, setIpfsImage] = useState()

  function addImage(image) {
    setIpfsImage(image)
  }

  function CreateTeamSM() {}

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
