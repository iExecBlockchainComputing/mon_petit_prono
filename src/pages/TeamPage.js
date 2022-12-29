import './teamPage.css'
import React from 'react'
import { Container, Form, Breadcrumb, Button } from 'react-bootstrap'
import Team from '../components/teamPage/Team'
import Top from '../components/teamPage/Top'
import { useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import JoinNewTeamModal from '../components/modal/JoinNewTeamModal'
import { useSelector } from 'react-redux'
import { NftContract } from '../utils/WebProvider'
import { useParams } from 'react-router-dom'

export default function TeamPage() {
  const { leagueName } = useParams()
  const [modalShow, setModalShow] = useState(false)
  const [hide, setHide] = useState(true)
  const wallet = useSelector((state) => state.wallet)
  let keysPressed = {}

  document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true
  })

  document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true
    if ((keysPressed['Meta'] || keysPressed['Control']) && event.key === 'k') {
      setModalShow(true)
    }
  })

  document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key]
  })

  const mintNFTBestTeam = async () => {
    NftContract.safeMint(
      wallet.accountAddress,
      'https://ipfs.io/ipfs/QmcGksLEcietBTfCmqsY41D5ACuxYBikuNiw99Lmm9R1qj',
      {
        from: '0x36Bff5B7877dcD2F80cB333987ABA0D9882f0aC3',
        gasLimit: 1000000,
      },
    )
    console.log('mint NFT by user', wallet.accountAddress)
    setHide(false)
  }

  return (
    <div>
      <Top />
      <Container id="researchBar" fluid>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">{leagueName}</Breadcrumb.Item>
        </Breadcrumb>
        <Form>
          <Form.Group>
            <Form.Label>Join an existing team</Form.Label>
            <Form.Control
              type="search"
              placeholder="Cmd + K"
              className="me-2"
              onClick={() => setModalShow(true)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Container>
      <JoinNewTeamModal show={modalShow} onHide={() => setModalShow(false)} />
      {hide && (
        <div id="bestTeam">
          <GiTrophyCup size={40} />
          <h3>
            Félicitaion you win a League NFT as you be a part of the first best
            team :
          </h3>
          <Button id="mintButtonTeam" onClick={mintNFTBestTeam}>
            Mint
          </Button>
        </div>
      )}
      <Team />
    </div>
  )
}
