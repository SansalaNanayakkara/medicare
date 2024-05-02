import React from 'react';
import backgroundImage from "../Assests/background.jpg";


function Reports() { // Capitalize for consistency
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
      
      <h1>This is reports page</h1>
    </div>
    </div>
  );
}

export default Reports;