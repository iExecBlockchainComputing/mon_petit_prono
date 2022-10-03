import './teamCreation.css'
import { useState } from 'react'
import { Container, Form, Button, Toast, ToastContainer } from 'react-bootstrap'
import React from 'react'

export default function TeamCreation() {
  const [isShown, setIsShown] = useState(false)

  const CreateTeam = () => {
    setIsShown((val) => !val)
  }

  return (
    <Container fluid>
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
        <div id="button">
          <Button onClick={CreateTeam} type="submit">
            Create
          </Button>
        </div>
      </Container>
      <ToastContainer id="notif" position="top-end">
        <Toast show={isShown}>
          <Toast.Header>
            <img
              src={require('../assets/logo.png')}
              className="rounded me-2"
              style={{ width: '60px' }}
              alt=""
            />
            <strong className="mx-auto">iExec Team</strong>
          </Toast.Header>
          <Toast.Body>The Team has been created</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}
