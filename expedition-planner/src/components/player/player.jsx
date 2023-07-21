import React from 'react'
import './player.css'

const Player = (player) => {
  return (
    <>
      <tr className="player-data-row">
        <td>{player.name}</td>
        <td>{player.class}</td>
        <td>{player.level}</td>
        <td>{player.role}</td>
        <td>{player.dpm}</td>
      </tr>
    </>
  )
}

export default Player