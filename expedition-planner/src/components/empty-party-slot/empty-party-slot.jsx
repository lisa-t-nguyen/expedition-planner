import { React, useContext, useState } from 'react'
import './empty-party-slot.css'

import HoverActions from '../hover-actions/hover-actions'
import Player from '../player/player'

import { partyManagementContext } from '../../contexts/party-context';

const EmptyPartySlot = ({ emptySlot, party }) => {
  const { selectedPlayer, isAPlayerSelected, swapPlayerToParty, getPartyActionDetails } = useContext(partyManagementContext);
  const [isHovered, setIsHovered] = useState(false);

  const setEmptySlotActiveFlag = (flag) => {
    setIsHovered(flag);
  };

  const swapSelectedPlayerToParty = () => {
    swapPlayerToParty(selectedPlayer, party);
  }

  const swapPlayerToPartyActionWithDetails = { 
    action: swapSelectedPlayerToParty,
    actionDetails: getPartyActionDetails(swapPlayerToParty)
  };

  return (
    <div className="player-empty-row-container"
         onMouseEnter={() => setEmptySlotActiveFlag(true)}
         onMouseLeave={() => setEmptySlotActiveFlag(false)}>
      <HoverActions isActive={isHovered}
                    activeColor={!isAPlayerSelected() ? "purple" : "green"}
                    variant="overlayAction"
                    actionsWithDetails={swapPlayerToPartyActionWithDetails}/>
      <Player player={emptySlot} />
    </div>
  )
}

export default EmptyPartySlot