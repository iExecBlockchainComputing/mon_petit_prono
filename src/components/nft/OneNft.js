import './oneNft.css'
import { Card, Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'

export default function OneNft({ MyImage, Name }) {
  function handleClick() {
    console.log('The link was clicked.')
  }

  return (
    <>
      <Card onClick={handleClick} id="NftCard">
        <Container>
          <Card.Img variant="top" src={MyImage} />
        </Container>
        <Card.Body>
          <Card.Title>{Name}</Card.Title>
        </Card.Body>
      </Card>
    </>
  )
}
