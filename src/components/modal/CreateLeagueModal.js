import './createLeagueModal.css'
import React from 'react'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'

export default function CreateLeagueModal({
  show,
  onHide,
  setIpfsImage,
  setLeagueName,
  CreateLeagueSM,
  setColor,
}) {
  return (
    <Modal
      id="modalPopup"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Row id="modalTitle">
          <Col md={1} id="icon">
            <BsPersonCircle size={45} />
          </Col>
          <Col id="title">Create Your League</Col>
        </Row>
      </Modal.Header>
      <Modal.Body id="leaguModalBody">
        <Container id="CreationFormLeague">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of your League</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your League"
                onChange={(e) => setLeagueName(e.target.value)}
              />
            </Form.Group>
          </Form>
          <FileInput title={'Choose your Image'} setIpfsImage={setIpfsImage} />
          <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#fcd15a"
            title="Choose your color"
            onChange={(e) => setColor(e.target.value)}
          />
          <div id="button">
            <Button onClick={() => CreateLeagueSM()} type="submit">
              Create
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  )
}
