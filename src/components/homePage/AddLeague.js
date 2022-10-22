import './addLeague.css'
import { Card, Container } from 'react-bootstrap'
import React from 'react'
import { CgAdd } from 'react-icons/cg'
import CreateLeagueModal from '../modal/CreateLeagueModal'
import { useState, useEffect } from 'react'
import { contract } from '../../utils/WebProvider'
import { initIpfs, addLeagueIPFS } from '../../utils/Ipfs'
import { v4 as uuidv4 } from 'uuid'

export default function AddLeague() {
  const [modalShow, setModalShow] = useState(false)
  const [ipfsImage, setIpfsImage] = useState()
  const [leagueName, setLeagueName] = useState()
  const [color, setColor] = useState()

  function closeModal() {
    setModalShow(false)
    setIpfsImage(undefined)
    setLeagueName(undefined)
    setColor(undefined)
  }

  useEffect(() => {
  }, [])

  async function CreateLeagueSM() {
    const _LeagueId = uuidv4()
    const ListIdLeague = await contract.getLeaguesID()
    while (ListIdLeague.includes(_LeagueId)) {
      _LeagueId = uuidv4()
    }
    const _LeagueName = leagueName
    const _LeagueColor = color
    const _ipfs = ipfsImage
    if (
      _ipfs !== undefined &&
      _LeagueName !== undefined &&
      _LeagueColor !== undefined
    ) {
      const imgPath = await addLeagueIPFS(_ipfs, _LeagueColor)
      console.log(_LeagueId, _LeagueName, imgPath)
      await contract.addLeague(_LeagueId, _LeagueName, imgPath)
    } else {
      alert('Please fill all the fields')
    }
  }

  return (
    <>
      <Card onClick={() => setModalShow(!modalShow)} id="addCardLeague">
        <CgAdd color="white" size={120} id="addIconLeague" />
        <div className="explanationLeague">
          <p>Create your League for an Event</p>
        </div>
      </Card>
      <CreateLeagueModal
        show={modalShow}
        onHide={closeModal}
        setIpfsImage={setIpfsImage}
        setLeagueName={setLeagueName}
        CreateLeagueSM={CreateLeagueSM}
        setColor={setColor}
      />
    </>
  )
}
