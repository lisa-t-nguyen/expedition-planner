import { React, useContext } from 'react'
import './role.css'

import { partyManagementContext } from '../../contexts/party-context';

const Role = ({ playerClass, playerLevel }) => {
  const { getRole } = useContext(partyManagementContext);

  return (
    <>
      { getRole(playerClass, playerLevel) }
    </>
  )
}

export default Role