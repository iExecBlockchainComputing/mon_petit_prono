import './forecast.css'
import OneCardForecast from './OneCardForecast'
import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import AddForecast from './AddForecast'
import { contract } from '../../utils/WebProvider'
import { useSelector } from 'react-redux'

export default function Forecast() {
  const [owner, setOwner] = useState(false)
  const wallet = useSelector((state) => state.wallet)

  useEffect(() => {
    async function getOwner() {
      let actualAccount = wallet.accountAddress.toLowerCase()
      let ownerContractAddress = (await contract.owner()).toLowerCase()
      if (actualAccount === ownerContractAddress) {
        setOwner(true)
        console.log('Your are the owner of the smart Contract')
      }
    }
    getOwner()
  }, [wallet.accountAddress])

  return (
    <Container id="forecast">
      <OneCardForecast
        j1={'de'}
        j2={'br'}
        pays1={'Allemagne'}
        pays2={'Brésil'}
        date={'Dim. 14 decembre 20h00'}
      />
      <OneCardForecast
        j1={'fr'}
        j2={'it'}
        pays1={'France'}
        pays2={'Italy'}
        date={'Dim. 14 decembre 20h00'}
      />
      {owner && (
        <AddForecast
          j1={'fr'}
          j2={'it'}
          pays1={'France'}
          pays2={'Italy'}
          date={'Dim. 14 decembre 20h00'}
        />
      )}
      <Button id="saveButton">Save Your Forecast</Button>
    </Container>
  )
}
