import React from 'react'
import './expedition-planner.css'
import Search from '../search/search'
import Header from '../header/header'
import PartyCards from '../party-cards/party-cards'
import Footer from '../footer/footer'

import PartyManagementContextProvider from '../../contexts/party-context';

const ExpeditionPlanner = () => {
  return (
    <div className="expedition-planner-container">
        <Header />
        <PartyManagementContextProvider>
          <Search />
          <PartyCards />
        </PartyManagementContextProvider>
        <Footer />
    </div>
  )
}

export default ExpeditionPlanner