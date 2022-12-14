import { useNavigate } from 'react-router-dom'
import './navBar.css'
import WalletConnection from './WalletConnection'
import { Navbar, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import EtherumAdress from '../../utils/EthAddress'

function ToolBar() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  const wallet = useSelector((state) => state.wallet)

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
        {wallet.isConnected && (
          <Col md={1} id="wallet">
            <EtherumAdress
              address={wallet.accountAddress}
              nb={6}
              color={'white'}
            />
          </Col>
        )}
        <Col md={1} id="wallet">
          <WalletConnection />
        </Col>
      </Row>
    </Navbar>
  )
}

export default ToolBar
