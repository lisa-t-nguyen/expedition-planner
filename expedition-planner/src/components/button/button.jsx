import React from 'react'
import './button.css'

const Button = ({text, color = "purple", details, action}) => {
  
  const getColorClass = () => {
    return `button-${color}`
  }
  
  return (
    <button className={`button ${getColorClass()}`} onClick={action}>{text}</button>
  )
}

export default Button