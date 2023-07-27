import { React } from 'react'
import './hover-actions.css'

import Button from '../button/button';

const HoverActions = ({isActive, activeColor="purple", isActionActive, variant, actionsWithDetails}) => {
  return (
    <>
      { 
        variant==="buttonActions" &&
        <div className={`hover-actions-container ${isActive ? `hover-actions-container-active-${activeColor}` : ''}`}
             onClick={(isActive && variant==="overlayAction") ? actionsWithDetails.action : null}>
          { 
            isActive && variant==="buttonActions" &&
              <div className="hover-actions">
                {
                  actionsWithDetails.map((actionWithDetails) => (
                    <Button key={`Button_${actionWithDetails.actionDetails.text}`}
                            text={actionWithDetails.actionDetails.text}
                            color={actionWithDetails.actionDetails.buttonColor}
                            description={actionWithDetails.actionDetails.description}
                            action={actionWithDetails.action}/>
                  ))
                }
              </div> 
          }
        </div>
      }
      {
        variant==="overlayAction" &&
        <div className={`hover-actions-container ${isActionActive ? 'hover-actions-container-button-overlay' : ''} ${isActive ? `hover-actions-container-active-${activeColor}` : ''}`}
             onClick={isActive ? actionsWithDetails.action : null}>
        </div>
      }
      
    </>
  )
}

export default HoverActions