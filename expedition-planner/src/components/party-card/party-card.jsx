import { React, useContext }  from 'react'
import './party-card.css'

import Party1 from '../../assets/Party1.png';
import Party2 from '../../assets/Party2.png';
import Party3 from '../../assets/Party3.png';

import Player from '../player/player';
import { partyManagementContext } from '../../contexts/party-context';

const PartyCard = ({partyNumber}) => {
  const { getPartyByPartyNumber, getMaxPartySize } = useContext(partyManagementContext)
  
  const party = getPartyByPartyNumber(partyNumber);

  const generateEmptySlots = (party) => {
    const maxPartySize = getMaxPartySize();
    let emptySlotsCount = maxPartySize - party.partyMembers.length;

    const emptyPartySlots = [];

    for (let i = 0; i < emptySlotsCount; i++) {
      emptyPartySlots.push({emptySlotNumber: i, isEmpty: true});
    }

    return emptyPartySlots.map((emptySlot) => (
      <div className="player-data-row" key={`emptySlotRow_${((party.partyNumber - 1) * maxPartySize) + (emptySlot.emptySlotNumber)}`}>
        <Player player={emptySlot}
                key={`emptySlot_${((party.partyNumber - 1) * maxPartySize) + (emptySlot.emptySlotNumber)}`} />
      </div>
    ));
  }

  return (
    <div className='party-container'>
      <img alt="Party" className="party-title-image"
           src={
              party.partyNumber === 1 ? Party1
              : party.partyNumber === 2 ? Party2
              : Party3 
            }
           >
      </img>
      <div className="party-card">
        <div className="party-table-container">
          <div className="player-header-row">
            <div className="player-name-column">Name</div>
            <div className="player-class-column">Class</div>
            <div className="player-level-column">Level</div>
            <div className="player-role-column">Role</div>
            <div className="player-dpm-column">DPM</div>
          </div>
          <div className="player-data-container">
            {party.partyMembers.map((player) => (
              <div key={`Row_${player.name}`} className="player-data-row">
                <Player player={player} />
              </div>
            ))}
            {generateEmptySlots(party)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartyCard