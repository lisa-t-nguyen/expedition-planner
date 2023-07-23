import { React, useContext, useState } from 'react';
import './search.css';

import { partyManagementContext } from '../../contexts/party-context';
import Button from '../button/button';

const Search = () => {
  const { addPlayer, updatePlayer, removePlayer, isPlayerAdded, getPlayerCount, getPartyCount, getMaxPartySize } = useContext(partyManagementContext);

  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.length < 4 || searchInput.length > 12) {
      console.log(`"${searchInput}" is not a valid length`); // TODO: Add error message to UI
    } else {
      clearSearchInput();
      searchPlayer(searchInput);
    }
  }

  const searchPlayer = (playerName) => {
    if (isPlayerAdded(playerName)) {
      console.log(`${playerName} has already been added!`) // TODO: Add error message to UI
      return;
    }

    if (getPlayerCount() === getPartyCount() * getMaxPartySize()) {
      console.log(`All parties are full!`); // TODO: Add error message to UI
      return;
    }

    let player = { name: playerName };
    addPlayer(player);

    fetch(`http://localhost:3001/playerData/${playerName}`)
    .then((response) => { 
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        removePlayer(player);
        throw new Error(`Player ${playerName} was not found!`); // TODO: Add error message to UI
      } else {
        throw new Error(`Search for player ${playerName} was not successful!`); // TODO: Add error message to UI
      }
    })
    .then((playerObject) => {
      player = playerObject;
      updatePlayer(player);
    })
    .catch((error) => {
      console.log(error.message); // TODO: Add error message to UI
    })
  }

  const clearSearchInput = () => {
    setSearchInput('');
  }

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className='search-container'>
      <input type='text'
             placeholder='Search for player...'
             className='search-input'
             value={searchInput}
             onChange={handleChange}
             onKeyDown={(e) => {if (e.key === 'Enter') { handleSearch() }}}>
      </input>
      <Button text="Submit"
              color="purple"
              action={handleSearch} />
    </div>
  )
}

export default Search