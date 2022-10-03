import './walletConnection.css'
import { useState } from 'react'
import { Card, ListGroup, Container} from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import ConnectionModal from '../modal/ConnectionModal'

function WalletConnection() {
  const [style, setStyle] = useState({ display: 'none' })
  const [modalShow, setModalShow] = useState(false)

  return (
    <div id="father">
      <BsPersonCircle
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
            <ListGroup.Item
              id="walletItems"
              onClick={() => setModalShow(true)}
              action
            >
              Connexion
            </ListGroup.Item>
            <ListGroup.Item id="walletItems" action>
              Deconnexion
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <Container
        fluid
        id="blurBackground"
        style={{ display: modalShow ? 'block' : 'none' }}
      />
      <ConnectionModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}
export default WalletConnection
