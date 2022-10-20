import './addTeam.css'
import { Card } from 'react-bootstrap'
import React from 'react'
import { useState } from 'react'
import { CgAdd } from 'react-icons/cg'
import CreateTeamModal from '../modal/CreateTeamModal'

export default function AddTeam() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <div>
      <Card onClick={() => setModalShow(!modalShow)} id="addCard">
        <CgAdd color="white" size={100} id="addIcon" />
        <div className="explanation">
          <p>Create your own team with your friends</p>
        </div>
      </Card>
      <CreateTeamModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}
