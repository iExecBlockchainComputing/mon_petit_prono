import './OneCardLeague.css'
import ReactCardFlip from 'react-card-flip'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Container, Card, Button } from 'react-bootstrap'
import { getLeagueIPFS } from '../../utils/Ipfs'
export default function OneCardLeague({
  id,
  el,
  StartDate,
  EndDate,
  NbLeague,
  NbNFT,
  years,
  Name,
}) {
  const [flip, setFlip] = useState(false)
  const [image, setImage] = useState()
  const [color, setColor] = useState()
  const naviguate = useNavigate()
  const handle = () => {
    naviguate('./teamPage')
  }
  const getFilesFromIPFS = async (cid) => {
    const promsess = new Promise((resolve, reject) => {
      console.log('J ai été appelé')
      const jsonObject = getLeagueIPFS(cid)
      console.log('CE QUE JE RECOIS', jsonObject)
      const _color = jsonObject.backgroundColor
      console.log('cid image', jsonObject.image)
      console.log('color', _color)
      const arrayBuffer = getLeagueIPFS(jsonObject.image)
      const blob = new Blob([arrayBuffer], { type: 'image/png' })
      const urlCreator = window.URL || window.webkitURL
      const _imageUrl = urlCreator.createObjectURL(blob)
      resolve({ color: _color, image: _imageUrl })
    })
    return promsess
  }
  useEffect(() => {
    async function fetchData() {
      const res = await getFilesFromIPFS(el[2])
      console.log('color Promesse', res.color)
      console.log('image Promesse', res.image)
      setColor(color)
      setImage(image)
    }
    fetchData()
  }, [])

  return (
    <ReactCardFlip id={id} isFlipped={flip} flipDirection="horizontal">
      <Card
        id="cardLeagueFront"
        onClick={() => setFlip(!flip)}
        style={{ backgroundColor: color }}
      >
        <img src={image} alt="League immage" />
      </Card>
      <Card
        id="cardLeagueBack"
        onMouseLeave={() => setFlip(!flip)}
        style={{ backgroundColor: color }}
      >
        <h1>{Name}</h1>
        <h3>- {years} -</h3>
        <Container id="infos">
          <h2>Start Date: </h2>
          <h3>{id}</h3>
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
