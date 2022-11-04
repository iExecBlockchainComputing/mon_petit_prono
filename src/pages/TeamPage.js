import './teamPage.css'
import React from 'react'
import { Container, Form } from 'react-bootstrap'
import Team from '../components/teamPage/Team'
import Top from '../components/teamPage/Top'
import { useState } from 'react'
import JoinNewTeamModal from '../components/modal/JoinNewTeamModal'

export default function TeamPage() {
  const [modalShow, setModalShow] = useState(false)
  let keysPressed = {}

  document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true
  })

  document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true
    if ((keysPressed['Meta'] || keysPressed['Control']) && event.key === 'k') {
      setModalShow(true)
    }
  })

  document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key]
  })

  return (
    <div>
      <Top />
      <Container id="researchBar">
        <Form>
          <Form.Group>
            <Form.Label>Join a new Team</Form.Label>
            <Form.Control
              type="search"
              placeholder="Cmd + K"
              className="me-2"
              onClick={() => setModalShow(true)}
            >
            </Form.Control>
          </Form.Group>
        </Form>
      </Container>
      <JoinNewTeamModal show={modalShow} onHide={() => setModalShow(false)} />
      <Team />
    </div>
  )
}
