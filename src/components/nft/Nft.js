import './nft.css'
import { Container, Row, Col } from 'react-bootstrap'
import OneNft from './OneNft'
import { useQuery, gql } from '@apollo/client'
import { useSelector } from 'react-redux'

function hexToDec(hex) {
  return parseInt(hex, 16)
}

export default function Nft() {
  const wallet = useSelector((state) => state.wallet)
  let walletAddress = wallet.accountAddress
  const erc721ContractId = '0x0eecb30e216cf645e08ea9bd1e3bf81090cbb0c7'
  const GET_NFT = gql`
    query MyNFT($walletAddress: String!, $erc721ContractId: ID!) {
      erc721Contract(id: $erc721ContractId) {
        id
        name
        tokens(where: { owner: $walletAddress }) {
          owner {
            id
          }
          id
          uri
        }
      }
    }
  `
  let { loading, error, data } = useQuery(GET_NFT, {
    variables: { erc721ContractId, walletAddress },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ margin: '2%' }}>Error : {error.message}.</p>
  let tokens = [...data?.erc721Contract?.tokens]
  if (!error) {
    tokens?.sort(
      (b, a) =>
        parseInt(hexToDec(b.id.split('/0x')[1])) -
        parseInt(hexToDec(a.id.split('/0x')[1])),
    )
  }
  return (
    <Container id="nft">
      <Row>
        {tokens !== [] ? (
          tokens.map(({ owner, id, uri }) => (
            <Col key={id}>
              <OneNft
                key={id}
                tokenID={hexToDec(id.split('/0x')[1])}
                owner={owner.id}
                tokenURI={uri.split('/')[4]}
              />
            </Col>
          ))
        ) : (
          <h1 style={{ textAlign: 'center' }}>No NFTs found</h1>
        )}
      </Row>
    </Container>
  )
}
