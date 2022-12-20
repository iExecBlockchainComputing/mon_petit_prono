import './oneNft.css'
import { Card, Container } from 'react-bootstrap'
import { getLeagueIPFSJson, getIPFSImage } from '../../utils/Ipfs'
import EtherumAdress from '../../utils/EthAddress'
import { useState, useEffect } from 'react'

export default function OneNft({ tokenID, owner, tokenURI }) {
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
      JsonMetadata = await getLeagueIPFSJson(tokenURI)
      console.log('JsonMetadata', JsonMetadata)
    } catch (err) {
      console.log(err)
    }
    if (
      JsonMetadata !== null &&
      JSON.stringify(JsonMetadata) !== JSON.stringify(metadata) &&
      JsonMetadata.image !== undefined
    ) {
      setMetadata(JsonMetadata)
    }

    let img = null
    try {
      img = await getIPFSImage(metadata.image.split('/')[4])
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
      <Card id="NftCard">
        <Container>
          <Card.Img variant="top" src={image} />
        </Container>
        <Card.Body>
          <Card.Title id="nftTitle">Collection Qatar # {tokenID}</Card.Title>
          <div>
            <h3 id="TxtethAddress">Owner:</h3>
            <EtherumAdress address={owner} nb={15} />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
