import React from 'react'
import './expedition-planner.css'
import Search from '../search/search'
import Header from '../header/header'
import Footer from '../footer/footer'

const ExpeditionPlanner = () => {
  return (
    <div className="expedition-planner-container">
        <Header/>
        <Search/>
        <Footer/>
    </div>
  )
}

export default ExpeditionPlanner