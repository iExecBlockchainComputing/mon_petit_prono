import { useNavigate } from 'react-router-dom'
import './navBar.css'
import WalletConnection from './WalletConnection'
import { Navbar, Col, Row } from 'react-bootstrap'
import { LinearProgress } from '@mui/material'
import { useState, useEffect } from 'react'

function ToolBar() {
  const [progressBar, setProgressBar] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <Navbar id="navbar">
      <Row>
        <Col id="iexecIcon" md={1}>
          <img
            onClick={handleClick}
            src={require('../../assets/logo.png')}
            alt="The immage can't be loaded"
            id="logo"
          />
        </Col>
        <Col>
          <h1>DAPP</h1>
        </Col>
        <Col md={1} id="wallet">
          <WalletConnection />
        </Col>
      </Row>

      {progressBar && (
        <Row>
          <LinearProgress id="progress" />
        </Row>
      )}
    </Navbar>
  )
}

export default ToolBar
