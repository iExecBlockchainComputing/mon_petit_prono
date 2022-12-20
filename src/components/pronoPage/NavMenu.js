import './navMenu.css'
import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function NavMenu() {
  const naviguate = useNavigate()

  const handler = (props) => {
    if (props === 'forecast') naviguate('./forecast')
    else naviguate('./ranking')
  }

  useEffect(() => {
    naviguate('./forecast')
  }, [])

  return (
    <Container id="navMenu">
      <Row>
        <Col>
          <Card onClick={() => handler('forecast')}>
            <Card.Body>
              <Card.Title>Match Forecast</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handler('ranking')}>
            <Card.Body>
              <Card.Title>Player Ranking</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
