import { React } from 'react'
import './party-cards.css'
import PartyCard from '../party-card/party-card'

const PartyCards = ({ parties }) => {
  return (
    <div className="party-cards-container">
      <PartyCard party={parties[0]} />
      <PartyCard party={parties[1]} />
      <PartyCard party={parties[2]} />
    </div>
  )
}

export default PartyCards