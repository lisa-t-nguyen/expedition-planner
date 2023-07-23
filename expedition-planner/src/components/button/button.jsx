import React from 'react'
import './button.css'

const Button = ({text, color = "purple", description, action}) => {
  
  const getColorClass = () => {
    return `button-${color}`
  }
  
  return (
    <button className={`button ${getColorClass()}`} title={description} onClick={action}>{text}</button>
  )
}

export default Button