import './teamPage.css'
import React from 'react'
import { Container, Form } from 'react-bootstrap'
import Team from '../components/teamPage/Team'
import Top from '../components/teamPage/Top'
import { useState } from 'react'
import JoinNewTeamModal from '../components/modal/JoinNewTeamModal'

export default function TeamPage() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Top />
      <Container id="researchBar">
        <Form>
          <Form.Group>
            <Form.Label>Join a new Team</Form.Label>
            <Form.Control
              type="search"
              placeholder="research the name of the team"
              className="me-2"
              onClick={() => setModalShow(true)}
            />
          </Form.Group>
        </Form>
      </Container>
      <JoinNewTeamModal show={modalShow} onHide={() => setModalShow(false)} />
      <Team />
    </>
  )
}
