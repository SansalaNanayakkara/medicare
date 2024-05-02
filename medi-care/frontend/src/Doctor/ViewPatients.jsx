import React from 'react'
import backgroundImage from "../Assests/background.jpg";

function ViewPatients() {
  return (
    <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}
  >
    <div>
      <h1>view patients</h1>
    </div>
    
    </div>
  )
}

export default ViewPatients