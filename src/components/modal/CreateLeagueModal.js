import './createLeagueModal.css'
import React from 'react'
import {
  Modal,
  Row,
  Col,
  Container,
  Form,
  Button,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'
import { useState } from 'react'

export default function CreateLeagueModal(props) {
  const [isShown, setIsShown] = useState(false)
  const [ipfsImage, setIpfsImage] = useState()

  function addImage(image) {
    setIpfsImage(image)
  }

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
          <Col id="title">My Wallet</Col>
        </Row>
      </Modal.Header>
      <Modal.Body id="leaguModalBody">
        <Container id="CreationFormLeague">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of your League</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter the name of your League"
              />
            </Form.Group>
          </Form>
          <FileInput title={'Choose your Image'} addImage={setIpfsImage}/>
          <div id="button">
            <Button onClick={() => setIsShown(!isShown)} type="submit">
              Create
            </Button>
          </div>
        </Container>
        <ToastContainer id="notif" position="top-end">
          <Toast show={isShown}>
            <Toast.Header>
              <img
                src={require('../../assets/logo.png')}
                className="rounded me-2"
                style={{ width: '60px' }}
                alt=""
              />
              <strong className="mx-auto">iExec Team</strong>
            </Toast.Header>
            <Toast.Body>The League has been created</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal.Body>
    </Modal>
  )
}
