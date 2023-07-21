import { React, useState } from 'react'
import './expedition-planner.css'
import Search from '../search/search'
import Header from '../header/header'
import PartyCards from '../party-cards/party-cards'
import Footer from '../footer/footer'

const ExpeditionPlanner = () => {

  const [addedPlayers, setAddedPlayers] = useState(new Map());

  const addPlayer = (player) => {
    console.log(`Adding ${player.name} to party...`);
    for (const party of parties) {
      if (party.partyMembers.length < 6) {
        party.partyMembers.push(player);
        addedPlayers.set(player.name.toLowerCase(), player);
        console.log(`Added ${player.name.toLowerCase()} to map`)
        console.log(addedPlayers);
        console.log(parties);
        setParties([...parties]);
        return;
      }
    }
  }

  const updatePlayer = (player) => {
    console.log(`Updating ${player.name} in party...`);
    if (addedPlayers.has(player.name.toLowerCase())) {
      const playerToUpdate = addedPlayers.get(player.name.toLowerCase());
      playerToUpdate.name = player.name;
      playerToUpdate.class = player.job;
      playerToUpdate.level = player.level;
      playerToUpdate.dpm = player.singleTargetDPM;
      setParties([...parties]);
      console.log(`Updated ${player.name.toLowerCase()} in map`)
      console.log(addedPlayers);
      console.log(parties);
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
        <Search addPlayer={addPlayer} updatePlayer={updatePlayer} addedPlayers={addedPlayers}/>
        <PartyCards parties={parties}/>
        <Footer/>
    </div>
  )
}

export default ExpeditionPlanner