import { React, useContext, useState } from 'react'
import './expedition-planner.css'
import Search from '../search/search'
import Header from '../header/header'
import PartyCards from '../party-cards/party-cards'
import Footer from '../footer/footer'

import { AddedPlayersContext } from '../../contexts/party-context'

const ExpeditionPlanner = () => {

  const addedPlayers = useContext(AddedPlayersContext);

  const addPlayer = (player) => {
    for (const party of parties) {
      if (party.partyMembers.length < 6) {
        // Adds information about which party the player will be added to to the player object
        player.partyNumber = party.partyNumber;
        player.partyIndex = party.partyMembers.length;

        // Adds the player to the party
        party.partyMembers.push(player);
        addedPlayers.set(player.name.toLowerCase(), player);
        setParties([...parties]);
        return;
      }
    }

    // Every party is full
    console.log(`All parties are full!`); // TODO: Add error message to UI
  }

  const updatePlayer = (player) => {
    if (addedPlayers.has(player.name.toLowerCase())) {
      const playerToUpdate = addedPlayers.get(player.name.toLowerCase());
      playerToUpdate.name = player.name;
      playerToUpdate.class = player.job;
      playerToUpdate.level = player.level;
      playerToUpdate.dpm = player.singleTargetDPM;
      setParties([...parties]);
    }
  }

  const removePlayer = (player) => {
    const playerToRemove = addedPlayers.get(player.name.toLowerCase());
    if (playerToRemove) {
      const party = parties[playerToRemove.partyNumber - 1];
      const partyIndex = party.partyMembers.indexOf(playerToRemove);
      party.partyMembers.splice(partyIndex, 1);
      addedPlayers.delete(player.name.toLowerCase());
      setParties([...parties]);
    }
  }

  const resetParties = () => {
    setParties(createParties());
  }

  const createParties = () => {
    return [
      {
        partyNumber: 1,
        partyMembers: []
      },
      {
        partyNumber: 2,
        partyMembers: []
      },
      {
        partyNumber: 3,
        partyMembers: []
      },
    ];
  }

  const [parties, setParties] = useState(createParties());

  return (
    <div className="expedition-planner-container">
        <Header/>
        <Search addPlayer={addPlayer} updatePlayer={updatePlayer} removePlayer={removePlayer} />
        <PartyCards parties={parties}/>
        <Footer/>
    </div>
  )
}

export default ExpeditionPlanner