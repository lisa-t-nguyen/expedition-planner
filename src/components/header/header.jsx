import React from 'react'
import './header.css'
import DreamMSLogo from '../../assets/DreamMSLogo.png'
import ExpeditionPlanner from '../../assets/ExpeditionPlanner.png'

const Header = () => {
  return (
    <div className='header-container'>
        <img src={DreamMSLogo} alt='DreamMSLogo' className='dream-logo'/>
        <img src={ExpeditionPlanner} alt='Expedition Planner' className='expedition-planner-logo'/>
    </div>
  )
}

export default Header