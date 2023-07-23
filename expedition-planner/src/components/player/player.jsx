import { React, useState, useContext } from 'react'
import './player.css'

import Role from '../role/role'
import HoverActions from '../hover-actions/hover-actions'
import { partyManagementContext } from '../../contexts/party-context';

const Player = ({ player }) => {
  const [isHovering, setIsHovering] = useState(false);
  const { 
    removePlayer,
    selectedPlayer,
    setSelectedPlayer,
    resetSelectedPlayer,
    isAPlayerSelected,
    swapPlayerWithPlayer,
    getPartyActionDetails
  } = useContext(partyManagementContext);

  const removeCurrentPlayer = () => {
    removePlayer(player);
  }

  const selectPlayer = () => {
    setSelectedPlayer(player);
  }

  const swapPlayerWithSelectedPlayer = () => {
    swapPlayerWithPlayer(selectedPlayer, player);
    setIsHovering(false);
  }

  const isCurrentPlayerSelected = () => {
    return player === selectedPlayer;
  }

  const playerActionsWithDetails = 
  [
    {
      action: removeCurrentPlayer,
      actionDetails: getPartyActionDetails(removePlayer)
    },
    {
      action: selectPlayer,
      actionDetails: getPartyActionDetails(swapPlayerWithPlayer)
    }
  ];

  const playerSelectedActionsWithDetails = 
  {
    action: swapPlayerWithSelectedPlayer,
    actionDetails: getPartyActionDetails(swapPlayerWithPlayer)
  };

  const currentPlayerSelectedActionsWithDetails =
  [
    {
      action: resetSelectedPlayer,
      actionDetails: getPartyActionDetails(resetSelectedPlayer),
    }
  ];
  

  return (
    <div className="player-data-row"
         onMouseEnter={() => setIsHovering(true)}
         onMouseLeave={() => setIsHovering(false)}>
      { 
        !player.isEmpty && 
        <HoverActions isActive={isHovering || isCurrentPlayerSelected()}
                      activeColor={isCurrentPlayerSelected() ? "purple" 
                                                             : isAPlayerSelected() ? "green"
                                                                                   : "purple"}
                      variant={!isAPlayerSelected() || isCurrentPlayerSelected() ? "buttonActions"
                                                                                 : "overlayAction"}
                      actionsWithDetails={!isAPlayerSelected() ? playerActionsWithDetails 
                                                               : !isCurrentPlayerSelected() ? playerSelectedActionsWithDetails
                                                                                            : currentPlayerSelectedActionsWithDetails}/> 
      }
      <div className="player-name-column player-data-cell-container">
        <div className="player-data-cell">
          {player.name}
        </div>
      </div>
      <div className="player-class-column player-data-cell-container">
        <div className="player-data-cell">
          {player.class}
        </div>
      </div>
      <div className="player-level-column player-data-cell-container">
        <div className="player-data-cell">
          {player.level}
        </div>
      </div>
      <div className="player-role-column player-data-cell-container">
        <div className="player-data-cell">
        <Role playerClass={player.class} playerLevel={player.level} />
        </div>
      </div>
      <div className="player-dpm-column player-data-cell-container">
        <div className="player-data-cell">
        {player.dpm}
        </div>
      </div>
    </div>
  )
}

export default Player