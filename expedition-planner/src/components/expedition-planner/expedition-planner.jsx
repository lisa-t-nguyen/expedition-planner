import React from 'react'
import './expedition-planner.css'
import Search from '../search/search'
import Header from '../header/header'
import PartyCards from '../party-cards/party-cards'
import Footer from '../footer/footer'

const ExpeditionPlanner = () => {
  return (
    <div className="expedition-planner-container">
        <Header/>
        <Search/>
        <PartyCards/>
        <Footer/>
    </div>
  )
}

export default ExpeditionPlanner