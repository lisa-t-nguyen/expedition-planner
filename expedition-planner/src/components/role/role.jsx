import { React, useContext } from 'react'
import './role.css'

import { RolesContext } from '../../contexts/party-context';

const Role = ({ playerClass, playerLevel }) => {
  const rolesContextMap = useContext(RolesContext);

  const getRole = (playerClass, playerLevel) => {
    if (playerClass == null || playerClass === "") {
      return "";
    }

    if (playerLevel < 120) {
      return "UNQUALIFIED";
    }

    // If the player's class is found in the role map, return the role
    for (const role of rolesContextMap.keys()) {
      if (rolesContextMap.get(role).has(playerClass)) {
        return role;
      }
    }

    // Otherwise return "DPS"
    return "DPS";
  }

  return (
    <>
      { getRole(playerClass, playerLevel) }
    </>
  )
}

export default Role