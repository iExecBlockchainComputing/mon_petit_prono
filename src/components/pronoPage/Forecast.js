import './forecast.css'
import OneCardForecast from './OneCardForecast'
import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import AddForecast from './AddForecast'
import { contract } from '../../utils/WebProvider'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import countryList from 'react-select-country-list'

export default function Forecast() {
  let { leagueId, teamId } = useParams()
  const [owner, setOwner] = useState(false)
  const [newForecast, setNewForecast] = useState(null)
  const [forecast, setForecast] = useState([])
  const wallet = useSelector((state) => state.wallet)

  contract.on('NewForecast', (_LeagueId, _ForecastId) => {
    console.log('newForecast : ', _ForecastId)
    setNewForecast(_ForecastId)
  })

  useEffect(() => {
    forecastInfo()
  }, [newForecast])

  const forecastInfo = async () => {
    const forecastId = await contract.getForecastId(leagueId, teamId)
    let forecastInfo = await Promise.all(
      forecastId.map(async (e) => {
        return await contract.getForecast(leagueId, teamId, e)
      }),
    )
    console.log(forecastInfo)
    setForecast(forecastInfo)
  }

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
      {forecast.map((forecast) => (
        <OneCardForecast
          key={forecast[0]}
          countryCode1={() => countryList().getValue(forecast[0][0])}
          countryCode2={() => countryList().getValue(forecast[0][1])}
          countryName1={forecast[0][0]}
          countryName2={forecast[0][1]}
          date={'Dim. 14 decembre 20h00'}
        />
      ))}
      {owner && <AddForecast />}
      <Button id="saveButton">Save Your Forecast</Button>
    </Container>
  )
}
