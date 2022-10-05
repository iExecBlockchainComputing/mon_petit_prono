import './connectionModal.css'
import { BsPersonCircle } from 'react-icons/bs'
import { useEffect } from 'react'
import {
  Card,
  ListGroup,
  Container,
  Modal,
  Row,
  Col,
  Badge,
} from 'react-bootstrap'
import { ConnectProvider } from './WebProvider'

function ConnectionModal(props) {
  {
    /**const [isClicked, setIsClicked] = useEffect(false)*/
  }
  return (
    <Modal
      id="modalPopup"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Row id="modalTitle">
          <Col md={1} id="icon">
            <BsPersonCircle size={45} />
          </Col>
          <Col id="title">My Wallet</Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <p>
          If you don't have a wallet yet, you can select a provider and create
          one now.
        </p>
        <Container id="cardContainer">
          <Card id="selectItem">
            <ListGroup variant="flush">
              <ListGroup.Item action>
                <Row>
                  <Col md={2}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                      alt="can't load the image"
                      style={{ width: '30px' }}
                    />
                  </Col>
                  <Col>MetaMask</Col>
                  <Col md={3}>
                    <Badge id="test">Popular</Badge>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item action>
                <Row>
                  <Col md={2}>
                    <img
                      src="https://avatars.githubusercontent.com/u/18060234?s=280&v=4"
                      alt="can't load the image"
                      style={{ width: '30px' }}
                    />
                  </Col>
                  <Col>CoinBase Wallet</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item action>
                <Row>
                  <Col md={2}>
                    <img
                      src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png"
                      alt="can't load the image"
                      style={{ width: '30px' }}
                    />
                  </Col>
                  <Col>WalletConnect</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item action>
                <Row>
                  <Col md={2}>
                    <img
                      src="https://3632261023-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/spaces%2F-MVOiF6Zqit57q_hxJYp%2Favatar-1615495356537.png?generation=1615495356841399&alt=media"
                      alt="can't load the image"
                      style={{ width: '30px' }}
                    />
                  </Col>
                  <Col>Phantom</Col>
                  <Col md={3}>
                    <Badge bg="secondary" id="test">
                      Solana
                    </Badge>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item action>
                <Row>
                  <Col md={2}>
                    <img
                      src="https://www.xdefi.io/wp-content/uploads/2022/05/logo-4.png"
                      alt="can't load the image"
                      style={{ width: '30px' }}
                    />
                  </Col>
                  <Col>Binance Wallet</Col>
                  <Col md={3}>
                    <Badge bg="secondary" id="test">
                      Binance
                    </Badge>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Container>
      </Modal.Body>
      {/**{isClicked ? <ConnectProvider /> : console.log('not clicked yet')}*/}
    </Modal>
  )
}

export default ConnectionModal
