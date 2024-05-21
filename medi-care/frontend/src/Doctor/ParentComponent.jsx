import React from 'react';
import PrescriptionList from './PrescriptionList';
import ManageAppointment from './ManageAppointment';
import ViewPatients from './ViewPatients';

const ParentComponent = () => {
  const doctorId = 3; // Replace with actual logic to get doctorId

  console.log('ParentComponent doctorId:', doctorId); // Debug log

  return (
    <div>
      <PrescriptionList doctorId={doctorId} />
      <ManageAppointment doctorId={doctorId} /> {/* Fixed prop name */}
      <ViewPatients doctorId={doctorId} />
    </div>
  );
};

export default ParentComponent;
