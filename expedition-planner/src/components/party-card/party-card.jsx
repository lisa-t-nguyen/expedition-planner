import { React, useContext }  from 'react'
import './party-card.css'

import Party1 from '../../assets/Party1.png';
import Party2 from '../../assets/Party2.png';
import Party3 from '../../assets/Party3.png';

import Player from '../player/player';
import EmptyPartySlots from '../empty-party-slots/empty-party-slots';
import { partyManagementContext } from '../../contexts/party-context';

const PartyCard = ({partyNumber}) => {
  const { getPartyByPartyNumber, getMaxPartySize } = useContext(partyManagementContext);
  const maxPartySize = getMaxPartySize();
  
  const party = getPartyByPartyNumber(partyNumber);

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
              <Player player={player} key={`Player_${player.name}`}/>
            ))}
            { party.partyMembers.length < maxPartySize &&
              <EmptyPartySlots party={party} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartyCard