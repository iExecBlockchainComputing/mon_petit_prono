import './addForecast.css'
import { Skeleton} from '@mui/material'
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { FaFlag } from 'react-icons/fa'
import { useEffect, useMemo, useState } from 'react'
import countryList from 'react-select-country-list'
import ReactCountryFlag from 'react-country-flag'
import { MonPetitPronoContract } from '../../utils/WebProvider'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { setDefaultLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import 'react-datepicker/dist/react-datepicker.css'
setDefaultLocale(fr)

export default function AddForecast({ setLoading, loadingValues,setNoForecast }) {
  let { leagueId, teamId } = useParams()
  const [displayInfo, setDisplayInfo] = useState(false)
  const [timestampDate, setTimestampDate] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [Country1, setCountry1] = useState('Country')
  const [Country2, setCountry2] = useState('Country')
  let loadingContent = loadingValues[0]
  let setLoadingContent = loadingValues[1]

  const addForecast = async () => {
    const _matchId = uuidv4()
    const ListIdMatch = await MonPetitPronoContract.getForecastId(
      leagueId,
      teamId,
    )
    console.log('Date SELECTED : ', typeof timestampDate, timestampDate)
    while (ListIdMatch.includes(_matchId)) {
      _matchId = uuidv4()
    }
    if (
      Country1 === Country2 ||
      Country1 === 'Country' ||
      Country2 === 'Country'
    ) {
      alert('Choose a valid match')
    } else {
      await MonPetitPronoContract.addForecast(
        leagueId,
        _matchId,
        [Country1, Country2],
        timestampDate,
      )
      setLoading(true)
      setNoForecast(false)
      setLoadingContent([
        ...loadingContent,
        <Skeleton id="forecastCardCharging" variant="rectangular" />,
      ])
    }
  }

  const convertDateToTimestamp = (date) => {
    setSelectedDate(date)
    const timestamp = Math.trunc(date.getTime() / 1000)
    setTimestampDate(timestamp)
  }

  return (
    <Card id="addforecastCard">
      <Row
        id="rowDatepicker"
        onMouseEnter={(e) => {
          setDisplayInfo(true)
        }}
        onMouseLeave={(e) => {
          setDisplayInfo(false)
        }}
      >
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          show={displayInfo}
          overlay={<Tooltip>End Date for forecast</Tooltip>}
        >
          <DatePicker
            id="datePicker"
            selected={selectedDate}
            onChange={(date) => convertDateToTimestamp(date)}
            showTimeSelect
            timeFormat="p"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy p"
          />
        </OverlayTrigger>
      </Row>
      <Row>
        <Col id="dropdownFlagueImage">
          <DropDonwFlag pays={setCountry1} />
          <h2>{Country1}</h2>
        </Col>
        <Col id="addButton">
          <Row>
            <Button onClick={addForecast}> Add</Button>
          </Row>
        </Col>
        <Col id="dropdownFlagueImage">
          <DropDonwFlag pays={setCountry2} />
          <h2>{Country2}</h2>
        </Col>
      </Row>
    </Card>
  )
}

function DropDonwFlag({ pays }) {
  const [search, setSearch] = useState('')
  const countries = useMemo(() => countryList().getData(), [])
  const [toggleContents, setToggleContents] = useState(
    <FaFlag
      size={22}
      color="white"
      style={{ marginRight: '18%', marginTop: '-5px' }}
    />,
  )

  const [countriesFiltered, setCountriesFiltered] = useState(countries)

  useEffect(() => {
    if (search.length > 0) {
      const resultsearch = countries.filter((e) => {
        return e.label.toLowerCase().match(search.toLowerCase())
      })
      setCountriesFiltered(resultsearch)
    } else {
      setCountriesFiltered(countries)
    }
  }, [search])

  return (
    <Dropdown
      onSelect={(eventKey) => {
        const { value, label } = countries.find(
          ({ value }) => eventKey === value,
        )
        pays(label)
        setToggleContents(
          <ReactCountryFlag
            countryCode={value}
            style={{
              fontSize: '4em',
            }}
          />,
        )
      }}
    >
      <Dropdown.Toggle id="dropdownFlag">{toggleContents}</Dropdown.Toggle>

      <Dropdown.Menu id="oneItem">
        <Dropdown.Item id="searchFlag">
          <Form.Control
            type="search"
            placeholder="Flag ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </Dropdown.Item>
        <Dropdown.Divider />
        {countriesFiltered.map(({ value, label }) => (
          <Dropdown.Item key={value} eventKey={value}>
            <ReactCountryFlag countryCode={value} /> {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
