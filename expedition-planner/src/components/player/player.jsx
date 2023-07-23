import { React } from 'react'
import './player.css'

import Role from '../role/role'
import HoverActions from '../hover-actions/hover-actions'

const Player = ({ player }) => {
  return (
    <>
      { !player.isEmpty && <HoverActions player={player} /> }
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
    </>
  )
}

export default Player