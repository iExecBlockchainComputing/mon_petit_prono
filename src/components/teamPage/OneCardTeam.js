import './oneCardTeam.css'
import React from 'react'
import { getLeagueIPFSJson, getIPFSImage } from '../../utils/Ipfs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import MyImage from '../../assets/logo.png'

export default function OneCardTeam({ id, el, Name }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`./${id}/pronoPage`)
  }
  const [metadata, setMetadata] = useState({
    backgroundColor: '#FFFFFF',
    image: 'QmVERfcU8E4TBCMTk2cK6fVvqRbRoGkWRYPdkwGwQ8CFbW',
  })
  const [image, setImage] = useState(
    `https://gateway.pinata.cloud/ipfs/${metadata.image}`,
  )
  useEffect(() => {
    //getMetadata()
  }, [metadata])

  async function getMetadata() {
    let JsonMetadata = null
    try {
      JsonMetadata = await getLeagueIPFSJson(el)
    } catch (err) {
      console.log(err)
    }
    if (
      JsonMetadata !== null &&
      JSON.stringify(JsonMetadata) !== JSON.stringify(metadata) &&
      JsonMetadata.image !== undefined &&
      JsonMetadata.backgroundColor !== undefined
    ) {
      setMetadata(JsonMetadata)
    }

    let img = null
    try {
      img = await getIPFSImage(metadata.image)
      const blob = new Blob([img], { type: 'image/png' })
      const urlCreator = window.URL || window.webkitURL
      img = urlCreator.createObjectURL(blob)
    } catch (err) {
      console.log(err)
    }
    if (
      img !== null &&
      metadata.image !== 'QmVERfcU8E4TBCMTk2cK6fVvqRbRoGkWRYPdkwGwQ8CFbW'
    ) {
      setImage(img)
    }
  }
  return (
    <>
      <Card onClick={handleClick} id="TeamCard">
        <Container>
          <Card.Img id="test2" variant="top" src={`${MyImage}`} />
        </Container>
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}
