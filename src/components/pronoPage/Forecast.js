import './forecast.css'

import React from 'react'
import { Container, Row, Col, Card, Form } from 'react-bootstrap'

export default function Forecast() {
  return (
    <Container id="forecast">
      <OneForecast j1={'de'} j2={'br'} />
      <OneForecast j1={'fr'} j2={'pr'} />
      <OneForecast j1={'es'} j2={'us'} />
      <OneForecast j1={'de'} j2={'br'} />
      <OneForecast j1={'al'} j2={'fr'} />
      <OneForecast j1={'de'} j2={'br'} />
      <OneForecast j1={'gb'} j2={'gr'} />
    </Container>
  )
}

function OneForecast({ j1, j2 }) {
  return (
    <Card id="forecastCard">
      <Row>
        <h3>Dim. 14 decembre 20h00</h3>
      </Row>
      <Row>
        <Col id="flagueImage">
          <img
            src={'https://countryflagsapi.com/png/' + j1}
            alt="Germany flag"
          />
          <h2>Allemagne</h2>
        </Col>
        <Col id="scoreContent">
          <Row>
            <Col id='ttt'>
              <Form.Control
                id="score"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="..."
              />
            </Col>
            <Col>
              <h1>-</h1>
            </Col>
            <Col>
              <Form.Control
                id="score"
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder="..."
              />
            </Col>
          </Row>
        </Col>
        <Col id="flagueImage">
          <img
            src={'https://countryflagsapi.com/png/' + j2}
            alt="Brazil flag"
          />
          <h2>Brésil</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>20</Card>
        </Col>
        <Col>
          <Card>25</Card>
        </Col>
        <Col>
          <Card>29</Card>
        </Col>
      </Row>
    </Card>
  )
}
