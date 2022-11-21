import './forecast.css'
import { Stack, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import AddForecast from './AddForecast'
import { MonPetitPronoContract, OracleContract } from '../../utils/WebProvider'
import { useParams } from 'react-router-dom'
import Accordion from './Accordion'
import { useSelector, useDispatch } from 'react-redux'

export default function Forecast() {
  let { leagueId, teamId } = useParams()
  const [owner, setOwner] = useState(false)
  const [newForecast, setNewForecast] = useState(null)
  const [noForecast, setNoForecast] = useState(true)
  const [forecast, setForecast] = useState([])
  const wallet = useSelector((state) => state.wallet)
  const [loading, setLoading] = useState(false)
  const [loadingContent, setLoadingContent] = useState([])
  const [loadingForecast, setLoadingForecast] = useState(false)
  const [diffDate, setDiffDate] = useState([])
  const [matchResultToLoad, setMatchResultToLoad] = useState(false)
  const playersBets = useSelector((state) => state.forecastProno)
  const dispatch = useDispatch()

  MonPetitPronoContract.on('NewForecast', (_LeagueId, _ForecastId) => {
    setNewForecast(_ForecastId)
    setLoading(false)
    console.log('NewForecast event')
    MonPetitPronoContract.removeAllListeners()
  })


  useEffect(() => {
    isMatchResultToLoaded()
  }, [])

  useEffect(() => {
    forecastInfo()
  }, [newForecast])

  useEffect(() => {
    diffDateFunction()
  }, [forecast])

  const SaveForecast = () => {
    console.log("playersBets", playersBets.prono)
    playersBets.prono.forEach(async (bet) => {
      await MonPetitPronoContract.setForecastProno(leagueId, teamId, bet.id, [
        bet.score1,
        bet.score2,
      ])
    })
    dispatch({
      type: 'forecastProno/updateForecastProno',
      payload: [],
    })
  }

  async function isMatchResultToLoaded() {
    const forecastId = await MonPetitPronoContract.getForecastId(
      leagueId,
      teamId,
    )
    let checkMatchresult = false
    let lastSend = null
    for (let i = 0; i < forecastId.length; i++) {
      let id = forecastId[i]
      let tab = await MonPetitPronoContract.getForecast(leagueId, teamId, id)
      if (Math.floor(Date.now() / 1000) >= tab[4].toNumber() && !tab[6]) {
        checkMatchresult = true
        lastSend = i
      }
    }
    console.log('checkMatchresult : ', checkMatchresult)
    setMatchResultToLoad(checkMatchresult)
    return { forecastId, lastSend }
  }

  const SetForecastResult = async () => {
    /*setLoadingForecast(true)
    let { forecastId, lastSend } = await isMatchResultToLoaded()

    forecastId.forEach(async (id, index) => {
      let tab = await MonPetitPronoContract.getForecast(leagueId, teamId, id)
      if (Math.floor(Date.now() / 1000) >= tab[4].toNumber() && !tab[6]) {
        let OracleId = await MonPetitPronoContract.getOracleId(
          leagueId,
          teamId,
          e,
        )
        let score = await getOracleResult(
          '0x7d55ae0be7ec7d8189645f834522d9d8147865a2ef022deb006e9757567e2272',
        )
        const tra = await MonPetitPronoContract.setForecastResult(
          leagueId,
          id,
          score,
        )
        if (index === lastSend) {
          await tra.wait()
          window.location.reload()
        }
      }
    })*/
  }

  const forecastInfo = async () => {
    const forecastId = await MonPetitPronoContract.getForecastId(
      leagueId,
      teamId,
    )
    let forecastInfo = await Promise.all(
      forecastId.map(async (e) => {
        const array = await MonPetitPronoContract.getForecast(
          leagueId,
          teamId,
          e,
        )
        return [e, ...array]
      }),
    )
    if (forecastInfo.length > 0) {
      setNoForecast(false)
    }
    forecastInfo.sort((a, b) => a[5].toNumber() - b[5].toNumber())
    setForecast(forecastInfo)
    console.log('forecast : ', forecastInfo)
  }

  async function diffDateFunction() {
    var diffDates = []
    forecast.forEach((el) => {
      let dateStr = convertTimestampToDate(el[5].toNumber()).split(' ')[0]
      if (!diffDates.includes(dateStr)) {
        diffDates.push(dateStr)
      }
    })
    console.log('diffDates : ', diffDates)
    setDiffDate(diffDates)
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
    let dateString =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':'
    if (date.getMinutes() < 10) {
      dateString += '0' + date.getMinutes()
    } else {
      dateString += date.getMinutes()
    }
    return dateString
  }

  return (
    <Container id="forecast">
      {noForecast && <h1 id="noForecast">No Forecast</h1>}
      {false && !noForecast && !loadingForecast && matchResultToLoad && (
        <Button id="setForecastResult" onClick={SetForecastResult}>
          <h1 id="linear-wide">Check Match Result</h1>
        </Button>
      )}
      {!noForecast && loadingForecast && (
        <Stack sx={{ width: '90%', color: 'grey.500', margin: 'auto' }}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      {diffDate.map((elem) => (
        <Accordion
          key={elem}
          date={elem}
          diffDate={diffDate}
          forecast={forecast}
          convertTimestampToDate={convertTimestampToDate}
        />
      ))}
      {loading &&
        loadingContent.map((elem, index) => <div key={index}>{elem}</div>)}
      {owner && (
        <AddForecast
          setLoading={setLoading}
          loadingValues={[loadingContent, setLoadingContent]}
          setNoForecast={setNoForecast}
        />
      )}
      {!noForecast && (
        <Button id="saveButton" onClick={SaveForecast}>
          <h1 id="linear-wide">Save Your Forecast</h1>
        </Button>
      )}
    </Container>
  )
}

async function getOracleResult(oracleID) {
  await OracleContract.getOracleData(oracleID)
  const result = await OracleContract.get()
  console.log('oracle result : ', result)
  console.log('oracle result : ', result[0].toNumber())
  //return result[0].toNumber()
  return [1, 1]
}
