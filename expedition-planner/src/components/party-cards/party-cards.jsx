import React from 'react'
import './party-cards.css'
import PartyCard from '../party-card/party-card'

const PartyCards = () => {
  return (
    <div className="party-cards-container">
      <PartyCard />
      <PartyCard />
      <PartyCard />
    </div>
  )
}

export default PartyCards