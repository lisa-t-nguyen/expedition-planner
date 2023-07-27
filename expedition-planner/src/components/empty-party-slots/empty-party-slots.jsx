import { React, useContext } from 'react'
import './empty-party-slots.css'

import { partyManagementContext } from '../../contexts/party-context';
import EmptyPartySlot from '../empty-party-slot/empty-party-slot';

const EmptyPartySlots = ({ party }) => {
  const { getMaxPartySize } = useContext(partyManagementContext);
  const maxPartySize = getMaxPartySize();

  const generateEmptySlots = (party) => {
    let emptySlotsCount = maxPartySize - party.partyMembers.length;

    const emptyPartySlots = [];

    for (let i = 0; i < emptySlotsCount; i++) {
      emptyPartySlots.push({emptySlotNumber: i, isEmpty: true});
    }

    return emptyPartySlots.map((emptySlot) => (
      <div className="player-empty-row"
           style={{height: `calc(100% / ${emptySlotsCount})`}}
           key={`emptySlotRow_${((party.partyNumber - 1) * maxPartySize) + (emptySlot.emptySlotNumber)}`}>
        <EmptyPartySlot emptySlot={emptySlot} party={party} key={`Emptyslot_${emptySlot.emptySlotNumber}`}/>
      </div>
    ));
  }

  return (
    <>
      {
        <div className="empty-slots-container">
          {generateEmptySlots(party)}
        </div>
      }
    </>
  )
}

export default EmptyPartySlots