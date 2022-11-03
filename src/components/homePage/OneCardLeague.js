import './OneCardLeague.css'
import ReactCardFlip from 'react-card-flip'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { getLeagueIPFSJson, getIPFSImage } from '../../utils/Ipfs'

export default function OneCardLeague({
  id,
  ipfs,
  StartDate,
  EndDate,
  NbLeague,
  NbNFT,
  years,
  Name,
}) {
  const [flip, setFlip] = useState(false)
  const [metadata, setMetadata] = useState({
    backgroundColor: '#FFFFFF',
    image: 'QmVERfcU8E4TBCMTk2cK6fVvqRbRoGkWRYPdkwGwQ8CFbW',
  })
  const [image, setImage] = useState(
    `https://gateway.pinata.cloud/ipfs/${metadata.image}`,
  )
  const naviguate = useNavigate()
  const handle = () => {
    naviguate(`./${id}/teamPage`)
  }

  useEffect(() => {
    getMetadata()
  }, [metadata])

  async function getMetadata() {
    let JsonMetadata = null
    try {
      JsonMetadata = await getLeagueIPFSJson(ipfs)
    } catch (err) {
      console.log(err)
    }
    if (
      JsonMetadata !== null &&
      JSON.stringify(JsonMetadata) !== JSON.stringify(metadata)
      && JsonMetadata.image !== undefined
      && JsonMetadata.backgroundColor !== undefined
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
    if (img !== null && img !== image) {
      setImage(img)
    }
  }

  return (
    <ReactCardFlip id={id} isFlipped={flip} flipDirection="horizontal">
      <Card
        id="cardLeagueFront"
        onClick={() => setFlip(!flip)}
        style={{ backgroundColor: metadata.backgroundColor }}
      >
        <img src={`${image}`} alt="League image" />
      </Card>
      <Card
        id="cardLeagueBack"
        onMouseLeave={() => setFlip(!flip)}
        style={{ backgroundColor: metadata.backgroundColor }}
      >
        <h1>{Name}</h1>
        <h3>- {years} -</h3>
        <Container id="infos">
          <h2>Start Date: </h2>
          <h3>{StartDate}</h3>
          <br />
          <h2>End Date: </h2>
          <h3>{EndDate}</h3>
          <br />
          <h2>Nb of League: </h2>
          <h3>{NbLeague}</h3>
          <br />
          <h2>NFT to Win: </h2>
          <h3>{NbNFT}</h3>
        </Container>
        <Button onClick={handle}>Join Competition</Button>
      </Card>
    </ReactCardFlip>
  )
}
