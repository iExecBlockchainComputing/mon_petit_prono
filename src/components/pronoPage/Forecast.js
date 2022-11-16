import './forecast.css'
import OneCardForecast from './OneCardForecast'
import { Skeleton, Stack, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Container, Button, Row } from 'react-bootstrap'
import AddForecast from './AddForecast'
import { MonPetitPronoContract, OracleContract } from '../../utils/WebProvider'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import countryList from 'react-select-country-list'

export default function Forecast() {
  let { leagueId, teamId } = useParams()
  const [owner, setOwner] = useState(false)
  const [newForecast, setNewForecast] = useState(null)
  const [noForecast, setNoForecast] = useState(true)
  const [forecast, setForecast] = useState([])
  const wallet = useSelector((state) => state.wallet)
  const [playersBets, setPlayersBets] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingContent, setLoadingContent] = useState([])
  const [loadingForecast, setLoadingForecast] = useState(false)
  const [priviousDate, setPriviousDate] = useState(0)

  MonPetitPronoContract.on('NewForecast', (_LeagueId, _ForecastId) => {
    setNewForecast(_ForecastId)
    setLoading(false)
    console.log('NewForecast event')
    MonPetitPronoContract.removeAllListeners()
  })

  useEffect(() => {
    forecastInfo()
  }, [newForecast])

  const SaveForecast = () => {
    console.log(playersBets)
    playersBets.forEach(async (bet) => {
      await MonPetitPronoContract.setForecastProno(leagueId, teamId, bet.id, [
        bet.score1,
        bet.score2,
      ])
    })
  }

  const SetForecastResult = async () => {
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
        setLoadingForecast(true)
        checkMatchresult = true
        lastSend = i
      }
    }

    forecastId.forEach(async (id, index) => {
      let tab = await MonPetitPronoContract.getForecast(leagueId, teamId, id)
      if (Math.floor(Date.now() / 1000) >= tab[4].toNumber() && !tab[6]) {
        console.log('in if')
        /*let OracleId = await MonPetitPronoContract.getOracleId(leagueId, teamId, e)
          let score = await getOracleResult(
            '0x7d55ae0be7ec7d8189645f834522d9d8147865a2ef022deb006e9757567e2272',
        )*/
        let score = [1, 1]
        CalculateNbPoints(leagueId, teamId, tab[1], score, id)
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
    })

    if (!checkMatchresult) {
      alert('There is no new match result ')
    }
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
      {noForecast && <h1 id="noForecast">No Forecast</h1>}
      {!noForecast && !loadingForecast && (
        <Button id="setForecastResult" onClick={SetForecastResult}>
          <h1 id="linear-wide">Check Match Result</h1>
        </Button>
      )}
      {!noForecast && loadingForecast && (
        <Stack sx={{ width: '90%', color: 'grey.500', margin: 'auto' }}>
          <LinearProgress color="secondary" />
        </Stack>
      )}
      {forecast.map((elem) => (
        <div key={elem[0]}>
          {test(() => convertTimestampToDate(elem[5])) && (
            <Row id="lineDate">
              <h3 id="date">
                <IoIosArrowForward color="#fcd15a" size={15} />
                {convertTimestampToDate(elem[5]).split(' ')[0]}
              </h3>
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
            prono={elem[2]}
            date={() => convertTimestampToDate(elem[5])}
            available={elem[6]}
            score={elem[3]}
            nbPoints={elem[4]}
            checkFinaleScoreSet={elem[7]}
          />
        </div>
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

function CalculateNbPoints(leagueId, teamId, prono, score, _matchId) {
  let myScore = 0
  if (prono[0].toNumber() !== 100 && prono[1].toNumber() !== 100) {
    if (
      prono[0].toNumber() === prono[1].toNumber() &&
      score[0] === score[1] &&
      prono[0].toNumber() !== score[0]
    ) {
      myScore = 1
    } else if (
      prono[0].toNumber() === score[0] &&
      prono[1].toNumber() === score[1]
    ) {
      myScore = 3
    } else if (
      (prono[0].toNumber() === score[0] && prono[1].toNumber() !== score[1]) ||
      (prono[0].toNumber() !== score[0] && prono[1].toNumber() === score[1])
    ) {
      myScore = 1
    }
  }
  MonPetitPronoContract.setForecastPointNb(leagueId, teamId, _matchId, myScore)
  return myScore
}
