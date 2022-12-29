import './createLeagueModal.css'
import { Modal, Row, Col, Container, Form, Button } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'
import FileInput from '../../utils/FileInput'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { addLeagueIPFS } from '../../utils/Ipfs'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import { Skeleton } from '@mui/material'
import DatePicker from 'react-datepicker'

export default function CreateLeagueModal(props) {
  const [ipfsImage, setIpfsImage] = useState(undefined)
  const [leagueName, setLeagueName] = useState(undefined)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [color, setColor] = useState('#ffffff')
  let loadingContent = props.loadingValues[0]
  let setLoadingContent = props.loadingValues[1]

  async function CreateLeagueSM() {
    let _LeagueId = uuidv4()
    const ListIdLeague = await MonPetitPronoContract.getLeaguesID()
    while (ListIdLeague.includes(_LeagueId)) {
      _LeagueId = uuidv4()
    }
    if (ipfsImage !== undefined && leagueName !== undefined) {
      props.onHide()
      const imgPath = await addLeagueIPFS(
        _LeagueId,
        leagueName,
        ipfsImage,
        color,
        startDate,
        endDate,
      )
      if (imgPath !== null) {
        await MonPetitPronoContract.addLeague(_LeagueId, leagueName, imgPath)
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
    setColor('#ffffff')
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
          <Row style={{ marginBottom: '10px', marginTop: '25px' }}>
            <Col id="colDateTitle">
              <Form.Label>Start Date : </Form.Label>
            </Col>
            <Col id="colDatePicker">
              <DatePicker
                id="createLeagueDatePicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
            <Col id="colDateTitle2">
              <Form.Label>End Date : </Form.Label>
            </Col>
            <Col id="colDatePicker">
              <DatePicker
                id="createLeagueDatePicker"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy"
              />
            </Col>
          </Row>
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
