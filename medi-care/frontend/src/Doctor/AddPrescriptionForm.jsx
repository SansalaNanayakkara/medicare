import React, { useState } from 'react';

function AddPrescriptionForm({ prescription, onClose, onSave }) {
  const [appointmentId, setAppointmentId] = useState(prescription?.appointmentId || '');
  const [medicationItems, setMedicationItems] = useState(
    prescription?.medicationItems || []
  );

  const handleAddMedicationItem = () => {
    setMedicationItems([...medicationItems, { medicationId: '', quantity: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleSavePrescription = () => {
    const newPrescription = {
      id: Date.now(), // Simulate generating a new ID
      appointmentId,
      medicationItems,
      // Add other prescription details (status, etc.)
      status: 'Pending', // Example default status
    };
    onSave(newPrescription);
  };

  // Form body with appointment ID input and medication table

  return (
    <div className="modal fade show">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Prescription</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Form body */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSavePrescription}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPrescriptionForm;
