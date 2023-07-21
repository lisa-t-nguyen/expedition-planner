import { React, useContext }  from 'react'
import './party-card.css'

import Party1 from '../../assets/Party1.png';
import Party2 from '../../assets/Party2.png';
import Party3 from '../../assets/Party3.png';

import Player from '../player/player';
import { MaxPartySizeContext } from '../../contexts/party-context';

const PartyCard = ({party}) => {
  const maxPartySizeContext = useContext(MaxPartySizeContext);
  
  const generateEmptySlots = (party) => {
    const MAX_PARTY_SIZE = maxPartySizeContext;
    let emptySlotsCount = MAX_PARTY_SIZE - party.partyMembers.length;

    const emptyPartySlots = [];

    for (let i = 0; i < emptySlotsCount; i++) {
      emptyPartySlots.push({emptySlotNumber: i, isEmpty: true});
    }

    return emptyPartySlots.map((emptySlot) => (
      <Player key={emptySlot.emptySlotNumber} />
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
          <table className="party-table">
            <thead>
              <tr className="player-data-row">
                <th>Name</th>
                <th>Class</th>
                <th>Level</th>
                <th>Role</th>
                <th>DPM</th>
              </tr>
            </thead>
            <tbody>
              {party.partyMembers.map((player) => (
                <Player name={player.name} 
                        class={player.class} 
                        level={player.level} 
                        role={player.role} 
                        dpm={player.dpm} 
                        key={player.name} />
              ))}
              {generateEmptySlots(party)}
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default PartyCard