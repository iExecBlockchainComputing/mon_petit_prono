import './nft.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import OneNft from './OneNft'
import MyImage from '../../assets/iexecWorldCup.png'
import { v4 as uuidv4 } from 'uuid'

export default function Nft() {
  const [nfts, setNfts] = useState([{ id: 1, MyImage: MyImage, Name: 'test' }])
  useEffect(() => {
    //fetchNfts()
  }, [])

  async function fetchNfts() {
    fetch('http://localhost:3000/nfts')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setNfts(data)
      })
  }

  return (
    <Container id="nft">
      <Row>
        {nfts.map((e) => (
          <Col key={e.id}>
            <OneNft key={e.id} MyImage={e.MyImage} Name={e.Name} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
