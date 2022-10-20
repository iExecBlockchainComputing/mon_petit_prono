import './addLeague.css'
import { Card, Container } from 'react-bootstrap'
import React from 'react'
import { CgAdd } from 'react-icons/cg'
import { useState } from 'react'
import CreateLeagueModal from '../modal/CreateLeagueModal'

export default function AddLeague() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <div>
      <Card onClick={() => setModalShow(!modalShow)} id="addCard">
        <CgAdd color="white" size={100} id="addIcon" />
        <div className="explanation">
          <p>Create your League for an Event</p>
        </div>
      </Card>
      <CreateLeagueModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}
