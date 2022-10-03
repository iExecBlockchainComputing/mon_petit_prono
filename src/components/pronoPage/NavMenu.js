import './navMenu.css'
import React from 'react'
import { Container, Row, Col, Card, Badge } from 'react-bootstrap'
import {
  BsFillTrophyFill,
  BsArrowUpShort,
  BsArrowDownShort,
} from 'react-icons/bs'
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
              <Card.Title>Forecast</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => handler('ranking')}>
            <Card.Body>
              <Card.Title>
                <Row id="badge">
                  <Col>Ranking</Col>
                  <Col md={3}>
                    <Badge>
                      <BsFillTrophyFill
                        id="iconBadge"
                        size={15}
                        color="white"
                      />
                      Nelly
                    </Badge>
                  </Col>
                </Row>
              </Card.Title>
              <Card.Text>
                <h9>
                  <BsArrowUpShort color="green" size={25} /> Nelly Cornejo
                </h9>
                <br />
                <h9>
                  <BsArrowDownShort color="red" size={25} />
                  Robin Le Caignec
                </h9>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
