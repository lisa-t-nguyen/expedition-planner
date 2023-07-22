import { React, useState } from 'react'
import './hover-options.css'

const HoverOptions = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <div className="hover-options-container"
           onMouseEnter={() => setIsHovering(true)}
           onMouseLeave={() => setIsHovering(false)}>
        { isHovering && 
          <div className="hover-options">
            <button>Remove</button>
          </div> 
        }
      </div>
    </>
  )
}

export default HoverOptions