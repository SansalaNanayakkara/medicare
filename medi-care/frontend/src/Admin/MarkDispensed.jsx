import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarkDispensed = ({ prescriptionId, onClose, onPrescriptionMarkedDispensed }) => {
  const [prescription, setPrescription] = useState({
    appointment_id: '',
    prescription_description: '',
    status: '',
    items: [],
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/prescriptions/${prescriptionId}`)
      .then(response => {
        setPrescription(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the prescription!', error);
      });
  }, [prescriptionId]);

  const handleFormChange = (e) => {
    setPrescription(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPrescription = { ...prescription, status: 'Dispensed' };

    axios.put(`http://localhost:5000/api/prescriptions/${prescriptionId}`, updatedPrescription)
      .then(() => {
        onPrescriptionMarkedDispensed(updatedPrescription);
        onClose();
      })
      .catch(error => {
        console.error('There was an error updating the prescription!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Are you sure you want to mark this prescription as "Dispensed"?</p>
        <button type="submit">Yes, Mark as Dispensed</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default MarkDispensed;
