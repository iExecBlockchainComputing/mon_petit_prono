import './addTeam.css'
import { Card } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CgAdd } from 'react-icons/cg'

export default function AddTeam() {
  const naviguate = useNavigate();
  const CreateTeam=()=>{
    naviguate('./createTeam')
  }
  return (
    <Card onClick={CreateTeam} id="addCard">
      <CgAdd color="white" size={100} id='addIcon'/>
      <div className="explanation">
        <p>Create your own team with your friends</p>
      </div>
    </Card>
  )
}
