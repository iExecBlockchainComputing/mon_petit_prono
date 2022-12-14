import './walletConnection.css'
import { useState } from 'react'
import { Card, ListGroup, Container } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { ConnectButton, Web3Modal } from '@web3modal/react'

function WalletConnection() {
  const [style, setStyle] = useState({ display: 'none' })
  const naviguate = useNavigate()
  const handle = () => {
    naviguate(`./account/nft`)
  }

  const test = () => {
    console.log('test')
  }

  return (
    <div id="father">
      <BsPersonCircle
        id="iconConnect"
        color="white"
        size={35}
        onMouseEnter={(e) => {
          setStyle({ display: 'block' })
        }}
      />
      <div
        onMouseLeave={(e) => {
          setStyle({ display: 'none' })
        }}
        style={style}
      >
        <Card id="walletCard">
          <ListGroup id="walletItems">
            <ConnectButton id="walletItems" />
            <ListGroup.Item id="walletItems" onClick={test} action>
              Connexion
            </ListGroup.Item>
            <ListGroup.Item id="walletItems" action>
              Deconnexion
            </ListGroup.Item>
            <ListGroup.Item id="walletItems" action onClick={handle}>
              NFT Portfolio
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  )
}
export default WalletConnection
