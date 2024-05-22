import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditPrescription = ({ prescriptionId, onClose, onPrescriptionUpdated }) => {
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

  const handleInputChange = (e, index, field) => {
    const newItems = [...prescription.items];
    newItems[index][field] = e.target.value;
    setPrescription(prevState => ({ ...prevState, items: newItems }));
  };

  const handleFormChange = (e) => {
    setPrescription(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/prescriptions/${prescriptionId}`, prescription)
      .then(() => {
        onPrescriptionUpdated(prescription);
        onClose();
      })
      .catch(error => {
        console.error('There was an error updating the prescription!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Appointment ID:
          <input type="text" name="appointment_id" value={prescription.appointment_id} onChange={handleFormChange} />
        </label>
        <label>
          Description:
          <input type="text" name="prescription_description" value={prescription.prescription_description} onChange={handleFormChange} />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={prescription.status} onChange={handleFormChange} />
        </label>
        {prescription.items.map((item, index) => (
          <div key={index}>
            <label>
              Medication Name:
              <input type="text" value={item.medication_name} onChange={(e) => handleInputChange(e, index, 'medication_name')} />
            </label>
            <label>
              Quantity:
              <input type="text" value={item.quantity_prescribed} onChange={(e) => handleInputChange(e, index, 'quantity_prescribed')} />
            </label>
            <label>
              Dosage:
              <input type="text" value={item.dosage} onChange={(e) => handleInputChange(e, index, 'dosage')} />
            </label>
            <label>
              Frequency:
              <input type="text" value={item.frequency} onChange={(e) => handleInputChange(e, index, 'frequency')} />
            </label>
            <label>
              Duration:
              <input type="text" value={item.duration} onChange={(e) => handleInputChange(e, index, 'duration')} />
            </label>
          </div>
        ))}
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPrescription;