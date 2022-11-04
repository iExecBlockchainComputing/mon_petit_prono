import './oneCardForecast.css'
import React from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'

export default function OneCardForecast({ countryCode1, countryCode2, countryName1, countryName2, date }) {
  return (
    <Card id="forecastCard">
      <Row>
        <h3>{date}</h3>
      </Row>
      <Row>
        <Col id="flagueImage">
          <ReactCountryFlag
            countryCode={countryCode1()}
            style={{
              fontSize: '6em',
            }}
          />
          <h2>{countryName1}</h2>
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
          <ReactCountryFlag
            countryCode={countryCode2()}
            style={{
              fontSize: '6em',
            }}
          />
          <h2>{countryName2}</h2>
        </Col>
      </Row>
    </Card>
  )
}
