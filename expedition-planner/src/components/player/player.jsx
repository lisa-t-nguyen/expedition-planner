import React from 'react'
import './player.css'

import Role from '../role/role'

const Player = (player) => {
  return (
    <>
      <tr className="player-data-row">
        <td>{player.name}</td>
        <td>{player.class}</td>
        <td>{player.level}</td>
        <td><Role playerClass={player.class} playerLevel={player.level} /></td>
        <td class="player-dpm">{player.dpm}</td>
      </tr>
    </>
  )
}

export default Player