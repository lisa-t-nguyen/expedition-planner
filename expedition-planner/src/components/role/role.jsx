import { React, useContext } from 'react'
import './role.css'

import { partyManagementContext } from '../../contexts/party-context';

const Role = ({ playerClass, playerLevel }) => {
  const { getRole } = useContext(partyManagementContext);

  let role = "";
  if (playerClass != null && playerLevel != null) {
    role = getRole(playerClass, playerLevel);
  }

  return (
    <>
      { role }
    </>
  )
}

export default Role