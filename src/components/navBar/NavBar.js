import { useNavigate } from 'react-router-dom'
import './navBar.css'
import WalletConnection from './WalletConnection'
import { Navbar, Col, Row } from 'react-bootstrap'

function ToolBar() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <Navbar id="navbar">
      <Row id='innerRow'>
        <Col id='iexecIcon' md={2}>
          <img
            onClick={handleClick}
            src={require('../../assets/logo.png')}
            alt="The immage can't be loaded"
            id="logo"
          />
        </Col>
        <Col >
          <h1>DAPP</h1>
        </Col>
        <Col md={1} id="wallet">
          <WalletConnection />
        </Col>
      </Row>
    </Navbar>
  )
}

export default ToolBar
