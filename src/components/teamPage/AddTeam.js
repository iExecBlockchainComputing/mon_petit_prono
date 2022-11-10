import './addTeam.css'
import { Card, Container } from 'react-bootstrap'
import React from 'react'
import { useState } from 'react'
import { CgAdd } from 'react-icons/cg'
import CreateTeamModal from '../modal/CreateTeamModal'

export default function AddTeam({ setLoading }) {
  const [modalShow, setModalShow] = useState(false)

  return (
    <Container id="containerAddTeam">
      <Card onClick={() => setModalShow(!modalShow)} id="addCard">
        <CgAdd color="white" size={100} id="addIcon" />
        <div className="explanation">
          <p>Create a new Team</p>
        </div>
      </Card>
      <CreateTeamModal
        setLoading={setLoading}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  )
}
