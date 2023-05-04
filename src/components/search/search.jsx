import React from 'react'
import { useState } from 'react';
import './search.css'

const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    console.log(searchInput);
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
             onChange={handleChange}>
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