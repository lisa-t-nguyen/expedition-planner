import React from 'react'
import './header.css'
import DreamMSLogo from '../../assets/DreamMSLogo.png'
import ExpeditionPlanner from '../../assets/ExpeditionPlanner.png'

const Header = () => {
  return (
    <div>
        <img src={DreamMSLogo} alt='DreamMSLogo'/>
        <img src={ExpeditionPlanner} alt='Expedition Planner'/>
    </div>
  )
}

export default Header