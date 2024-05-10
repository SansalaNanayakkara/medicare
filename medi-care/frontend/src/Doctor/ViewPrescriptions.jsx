import React from 'react';

function ViewPrescriptions({ prescription }) {
  if (!prescription) return null;

  return (
    <div className="mt-3">
      <h4>Prescription Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Prescription ID: {prescription.id}</li>
        <li className="list-group-item">Appointment ID: {prescription.appointmentId}</li>
        <li className="list-group-item">Description: {prescription.description}</li>
        <li className="list-group-item">Status: {prescription.status}</li>
      </ul>
    </div>
  );
}

export default ViewPrescriptions;
