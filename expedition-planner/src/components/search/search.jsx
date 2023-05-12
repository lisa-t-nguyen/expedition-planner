import React from 'react'
import { useState } from 'react';
import './search.css'

const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput.length < 4 || searchInput.length > 12) {
      console.log(`"${searchInput}" is not a valid length`);
    } else {
      clearSearchInput();
      searchPlayer(searchInput);
    }
  }

  const searchPlayer = (playerName) => {
    console.log(`Calling http://localhost:3001/playerData/${playerName}`);

    let player = {};

    fetch(`http://localhost:3001/playerData/${playerName}`)
    .then((response) => { 
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error(`Player ${playerName} was not found!`);
      } else {
        throw new Error(`Search for player ${playerName} was not successful!`);
      }
    })
    .then((playerObject) => {
      player = playerObject;
      console.log(player);
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  const clearSearchInput = () => {
    setSearchInput('');
  }

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className='search-component'>
      <input type='text'
             placeholder='Search for player...'
             className='search-input'
             value={searchInput}
             onChange={handleChange}
             onKeyDown={(e) => {if (e.key === 'Enter') { handleSearch() }}}>
      </input>
      <button type='submit'
              className='submit-button' 
              onClick={handleSearch}>
              Submit
      </button>
    </div>
  )
}

export default Search