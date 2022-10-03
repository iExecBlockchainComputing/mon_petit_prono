import './teamPage.css'
import { Container, Row } from 'react-bootstrap'
import React from 'react'
import Team from '../components/teamPage/Team'
import AddTeam from '../components/teamPage/AddTeam'
import Top from '../components/teamPage/Top'

export default function TeamPage() {
  return (
    <Container>
      <Top />
      <Row id="teamPool">
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
        <Team />
        <AddTeam />
      </Row>
    </Container>
  )
}
