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
              <tr className="player-data-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="player-data-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="player-data-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="player-data-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="player-data-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr className="player-data-row">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default PartyCard