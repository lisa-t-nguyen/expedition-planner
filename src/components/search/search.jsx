import React from 'react'
import './search.css'

const Search = () => {
  return (
    <div className='search-component'>
      <input type='text' placeholder='Search for player...' className='search-input'></input>
      <button type='submit' className='submit-button'>Submit</button>
    </div>
  )
}

export default Search