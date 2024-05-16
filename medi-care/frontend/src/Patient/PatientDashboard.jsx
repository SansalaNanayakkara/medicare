import React from 'react'
import backgroundImage from "../Assests/background.jpg";

function PatientDashboard() {
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
      <h1>patient dashboard</h1>
    </div>
    
    </div>
  )
}

export default PatientDashboard