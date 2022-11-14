import './addLeague.css'
import { Card, Container } from 'react-bootstrap'
import React from 'react'
import { CgAdd } from 'react-icons/cg'
import CreateLeagueModal from '../modal/CreateLeagueModal'
import { useState, useEffect } from 'react'

export default function AddLeague({ setLoading, loadingValues }) {
  const [modalShow, setModalShow] = useState(false)


  return (
    <>
      <Card onClick={() => setModalShow(!modalShow)} id="addCardLeague">
        <CgAdd color="white" size={120} id="addIconLeague" />
        <div className="explanationLeague">
          <p>Create your League for an Event</p>
        </div>
      </Card>
      <CreateLeagueModal
        setLoading={setLoading}
        show={modalShow}
        onHide={() => setModalShow(false)}
        loadingValues={loadingValues}
      />
    </>
  )
}
