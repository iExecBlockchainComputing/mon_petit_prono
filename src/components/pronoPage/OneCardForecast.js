import './oneCardForecast.css'
import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

export default function OneCardForecast({ j1, j2, pays1, pays2, date }) {
  return (
    <Card id="forecastCard">
      <Row>
        <h3>{date}</h3>
      </Row>
      <Row>
        <Col id="flagueImage">
          <img
            src={'https://countryflagsapi.com/png/' + j1}
            alt={pays1 + ' flag'}
          />
          <h2>{pays1}</h2>
        </Col>
        <Col id="scoreContent">
          <Row>
            <Col id="ttt">
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
            alt={pays2 + ' flag'}
          />
          <h2>{pays2}</h2>
        </Col>
      </Row>
    </Card>
  )
}
