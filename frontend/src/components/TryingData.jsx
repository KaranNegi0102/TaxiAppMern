import React from 'react'

const tryingData = ({suggestions,pickup,destination}) => {
  return (
    <div>
      <p>{pickup}</p>
      <p>{destination}</p>
      {suggestions.map((suggestion) => (<p key={suggestion}>{suggestion}</p>))}
      
    </div>
  )
}

export default tryingData
