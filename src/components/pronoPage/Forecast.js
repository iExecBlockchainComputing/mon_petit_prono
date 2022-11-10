import './forecast.css'
import OneCardForecast from './OneCardForecast'
import { Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { Container, Button, Row } from 'react-bootstrap'
import AddForecast from './AddForecast'
import { MonPetitPronoContract, OracleContract } from '../../utils/WebProvider'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import countryList from 'react-select-country-list'

export default function Forecast() {
  let { leagueId, teamId } = useParams()
  const [owner, setOwner] = useState(false)
  const [newForecast, setNewForecast] = useState(null)
  const [forecast, setForecast] = useState([])
  const wallet = useSelector((state) => state.wallet)
  const [playersBets, setPlayersBets] = useState([])
  const [loading, setLoading] = useState(false)
  const [priviousDate, setPriviousDate] = useState(0)

  MonPetitPronoContract.on('NewForecast', (_LeagueId, _ForecastId) => {
    setNewForecast(_ForecastId)
    setLoading(false)
  })

  useEffect(() => {}, [])

  useEffect(() => {
    forecastInfo()
  }, [newForecast])

  const SaveForecast = () => {
    playersBets.forEach(async (bet) => {
      await MonPetitPronoContract.setForecastProno(leagueId, teamId, bet.id, [
        bet.score1,
        bet.score2,
      ])
    })
  }

  const forecastInfo = async () => {
    const forecastId = await MonPetitPronoContract.getForecastId(
      leagueId,
      teamId,
    )
    let forecastInfo = await Promise.all(
      forecastId.map(async (e) => {
        //await MonPetitPronoContract.updateTime(leagueId, e)
        const array = await MonPetitPronoContract.getForecast(
          leagueId,
          teamId,
          e,
        )
        return [e, ...array]
      }),
    )
    setForecast(forecastInfo)
    console.log('forecast : ', forecastInfo)
  }

  useEffect(() => {
    async function getOwner() {
      let actualAccount = wallet.accountAddress.toLowerCase()
      let ownerContractAddress = (
        await MonPetitPronoContract.owner()
      ).toLowerCase()
      if (actualAccount === ownerContractAddress) {
        setOwner(true)
        console.log('Your are the owner of the smart Contract')
      }
    }
    getOwner()
  }, [wallet.accountAddress])

  const convertTimestampToDate = (timestamp) => {
    var date = new Date(timestamp * 1000)
    const dateString =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    return dateString
  }

  function test(date) {
    /*if (date().split(' ')[0] === priviousDate) {
      return true
    } else {
      setPriviousDate(date().split(' ')[0])
      return true
    }*/
    return true
  }

  return (
    <Container id="forecast">
      {forecast.map((elem) => (
        <div key={elem[0]}>
          {test(() => convertTimestampToDate(elem[5])) && (
            <Row id="lineDate">
              <h3 id="date">{convertTimestampToDate(elem[5]).split(' ')[0]}</h3>
              <Row></Row>
            </Row>
          )}
          <OneCardForecast
            id={elem[0]}
            setCardInfo={[playersBets, setPlayersBets]}
            countryCode1={() => countryList().getValue(elem[1][0])}
            countryCode2={() => countryList().getValue(elem[1][1])}
            countryName1={elem[1][0]}
            countryName2={elem[1][1]}
            date={() => convertTimestampToDate(elem[5])}
            available={elem[6]}
          />
        </div>
      ))}
      {loading && <Skeleton id="forecastCardCharging" variant="rectangular" />}
      {owner && <AddForecast setLoading={setLoading} />}
      <div>
        <Button
          id="saveButton"
          style={{ marginRight: '10%' }}
          onClick={SaveForecast}
        >
          <h1 id="linear-wide">Save Your Forecast</h1>
        </Button>
        <Button
          id="saveButton"
          onClick={() =>
            getOracleResult(
              '0x7d55ae0be7ec7d8189645f834522d9d8147865a2ef022deb006e9757567e2272',
            )
          }
        >
          <h1 id="linear-wide">Check Match Result</h1>
        </Button>
      </div>
    </Container>
  )
}

async function getOracleResult(oracleID) {
  await OracleContract.getOracleData(oracleID)
  const result = await OracleContract.get()
  const test = [...(await result)]
  console.log('oracle result : ', test)
  console.log('oracle result : ', test[0].toNumber())
}
