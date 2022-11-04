import './addForecast.css'
import React from 'react'
import { Row, Col, Card, Form, Button, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { FaFlag } from 'react-icons/fa'
import { useEffect, useMemo } from 'react'
import countryList from 'react-select-country-list'
import ReactCountryFlag from 'react-country-flag'

export default function AddForecast({ j1, j2, pays1, pays2, date }) {
  const [Country1, setCountry1] = useState('Country')
  const [Country2, setCountry2] = useState('Country')
  const addForecast = () => {
    console.log('addForecast')
  }
  return (
    <Card id="addforecastCard">
      <Row>
        <h3>{date}</h3>
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
    <FaFlag size={30} color="white" style={{ marginRight: '18%' }} />,
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
              fontSize: '3em',
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
