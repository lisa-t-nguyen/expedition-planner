import React from 'react'
import './party-card.css'
import Party1 from '../../assets/Party1.png';
import Party2 from '../../assets/Party2.png';
import Party3 from '../../assets/Party3.png';

const PartyCard = ({partyNumber}) => {
  return (
    <div className='party-container'>
      <img alt="Party" className="party-title-image"
           src={
              partyNumber === "1" ? Party1
              : partyNumber === "2" ? Party2
              : Party3 
            }
           >
      </img>
      <div className="party-card">

      </div>
    </div>
  )
}

export default PartyCard