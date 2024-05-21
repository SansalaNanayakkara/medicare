import React from 'react';
import PrescriptionList from './PrescriptionList';
import ManageAppointment from './ManageAppointment';

const ParentComponent = () => {
  const doctorId = 3; // Replace with actual logic to get doctorId

  console.log('ParentComponent doctorId:', doctorId); // Debug log

  return (
    <div>
      <PrescriptionList doctorId={doctorId} />
      <ManageAppointment doctor_Id={doctor_Id} />
    </div>
  );
};

export default ParentComponent;
