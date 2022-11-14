import './createLeagueModal.css'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { addLeagueIPFS } from '../../utils/Ipfs'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { Skeleton } from '@mui/material'

export default function CreateLeagueModal(props) {
  const [ipfsImage, setIpfsImage] = useState(undefined)
  const [leagueName, setLeagueName] = useState(undefined)
  const [color, setColor] = useState('#ffffff')
  let loadingContent = props.loadingValues[0]
  let setLoadingContent = props.loadingValues[1]

  async function CreateLeagueSM() {
    const _LeagueId = uuidv4()
    const ListIdLeague = await MonPetitPronoContract.getLeaguesID()
    while (ListIdLeague.includes(_LeagueId)) {
      _LeagueId = uuidv4()
    }
    const _LeagueName = leagueName
    const _LeagueColor = color
    const _ipfs = ipfsImage
    if (_ipfs !== undefined && _LeagueName !== undefined) {
      props.onHide()
      const imgPath = await addLeagueIPFS(
        _LeagueId,
        _LeagueName,
        _ipfs,
        _LeagueColor,
      )
      if (imgPath !== null) {
        await MonPetitPronoContract.addLeague(_LeagueId, _LeagueName, imgPath)
        props.setLoading(true)
        setLoadingContent([
          ...loadingContent,
          <Skeleton id="leagueCardCharging" variant="rectangular" />,
        ])
      } else {
        alert('Une Erreur est survenue avec le stockage offchain')
      }
    } else {
      alert('Please fill all the fields')
    }
  }

  useEffect(() => {
    setIpfsImage(undefined)
    setLeagueName(undefined)
    setColor(undefined)
  }, [props.show === false])

  return (
    <Modal
      id="modalPopup"
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Row id="modalTitle">
          <Col md={1} id="icon">
            <BsPersonCircle size={45} />
          </Col>
          <Col id="title">Create Your League</Col>
        </Row>
      </Modal.Header>
      <Modal.Body id="leaguModalBody">
        <Container id="CreationFormLeague">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name of your League</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your League"
                onChange={(e) => setLeagueName(e.target.value)}
              />
            </Form.Group>
          </Form>
          <FileInput title={'Choose your Image'} setIpfsImage={setIpfsImage} />
          <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#ffffff"
            title="Choose your color"
            onChange={(e) => setColor(e.target.value)}
          />
          <div id="button">
            <Button onClick={CreateLeagueSM} type="submit">
              Create
            </Button>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  )
}
