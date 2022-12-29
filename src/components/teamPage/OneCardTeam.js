import './oneCardTeam.css'
import React from 'react'
import { getLeagueIPFSJson, getIPFSImage } from '../../utils/Ipfs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
    
export default function OneCardTeam({ id, el, Name }) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`./${id}/${Name}`)
  }
  const [metadata, setMetadata] = useState({
    backgroundColor: '#FFFFFF',
    image: 'QmVERfcU8E4TBCMTk2cK6fVvqRbRoGkWRYPdkwGwQ8CFbW',
  })
  const [image, setImage] = useState(
    `https://gateway.pinata.cloud/ipfs/${metadata.image}`,
  )
  useEffect(() => {
    getMetadata()
  }, [metadata])

  async function getMetadata() {
    let JsonMetadata = null
    try {
      JsonMetadata = await getLeagueIPFSJson(el)
      console.log('JsonMetadata', JsonMetadata)
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
    console.log('chose cid image', metadata.image)
    try {
      img = await getIPFSImage(metadata.image)
      console.log('blob img', img)
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
      <Card
        onClick={handleClick}
        id="TeamCard"
        style={{ backgroundColor: metadata.backgroundColor }}
      >
        <Container>
          <Card.Img variant="top" src={image} />
        </Container>
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}
