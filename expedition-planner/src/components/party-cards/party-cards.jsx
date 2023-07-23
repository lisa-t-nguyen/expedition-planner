import { React } from 'react'
import './party-cards.css'
import PartyCard from '../party-card/party-card'

const PartyCards = () => {
  return (
    <div className="party-cards-container">
      <PartyCard partyNumber={1}/>
      <PartyCard partyNumber={2}/>
      <PartyCard partyNumber={3}/>
    </div>
  )
}

export default PartyCards