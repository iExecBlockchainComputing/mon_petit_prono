import './addForecast.css'
import React from 'react'
import { Row, Col, Card, Form, Button, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { FaFlag } from 'react-icons/fa'
import { useEffect, useMemo } from 'react'
import countryList from 'react-select-country-list'
import ReactCountryFlag from 'react-country-flag'
import { contract } from '../../utils/WebProvider'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export default function AddForecast() {
  let { leagueId, teamId } = useParams()
  const [Country1, setCountry1] = useState('Country')
  const [Country2, setCountry2] = useState('Country')

  const addForecast = async () => {
    const _matchId = uuidv4()
    const ListIdMatch = await contract.getForecastId(leagueId, teamId)
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
      await contract.addForecast(leagueId, _matchId, [Country1, Country2])
    }
  }

  return (
    <Card id="addforecastCard">
      <Row>
        <h3>Dim. 14 decembre 20h00</h3>
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
    <FaFlag size={22} color="white" style={{ marginRight: '18%',marginTop:'-5px' }} />,
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
