import { React, useState, useContext } from 'react'
import './hover-actions.css'

import Button from '../button/button';
import { partyManagementContext } from '../../contexts/party-context';

const HoverActions = ({player}) => {
  const { removePlayer, swapPlayer, getPartyActionDetails } = useContext(partyManagementContext);

  const [isHovering, setIsHovering] = useState(false);

  const removePlayerActionDetails = getPartyActionDetails(removePlayer);
  const swapPlayerActionDetails = getPartyActionDetails(swapPlayer);

  const removeCurrentPlayer = () => {
    removePlayer(player);
  }

  return (
    <>
      <div className="hover-actions-container"
           onMouseEnter={() => setIsHovering(true)}
           onMouseLeave={() => setIsHovering(false)}>
        { 
          isHovering && 
          <div className="hover-actions">
            <Button text={removePlayerActionDetails.text} 
                    color={removePlayerActionDetails.buttonColor}
                    details={removePlayerActionDetails.details}
                    action={removeCurrentPlayer}/>
            <Button text={swapPlayerActionDetails.text} 
                    color={swapPlayerActionDetails.buttonColor}
                    details={swapPlayerActionDetails.details}
                    action={swapPlayer}/>
          </div> 
        }
      </div>
    </>
  )
}

export default HoverActions