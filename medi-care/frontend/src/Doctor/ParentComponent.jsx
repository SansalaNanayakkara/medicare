import React from 'react';
import PrescriptionList from './PrescriptionList';

const ParentComponent = () => {
  const doctorId = 3; // Replace with actual logic to get doctorId

  console.log('ParentComponent doctorId:', doctorId); // Debug log

  return (
    <div>
      <PrescriptionList doctorId={doctorId} />
    </div>
  );
};

export default ParentComponent;
