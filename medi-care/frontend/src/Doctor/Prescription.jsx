import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewPrescriptions from './ViewPrescriptions.jsx';
import AddPrescriptionForm from './AddPrescriptionForm.jsx';

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    // Simulate fetching prescriptions from a server
    const initialPrescriptions = [
      {
        id: 1,
        appointmentId: 123,
        description: 'Medication for cold',
        status: 'Pending',
      },
      {
        id: 2,
        appointmentId: 456,
        description: 'Antibiotics',
        status: 'Dispensed',
      },
    ];
    setPrescriptions(initialPrescriptions);
  }, []);

  const handleViewPrescription = (prescriptionId) => {
    setSelectedPrescription(prescriptions.find((p) => p.id === prescriptionId));
  };

  const handleAddPrescription = () => {
    setShowAddPrescription(true);
  };

  const handleCloseAddPrescription = () => {
    setShowAddPrescription(false);
    setSelectedPrescription(null);
  };

  const handleSavePrescription = (newPrescription) => {
    setPrescriptions([...prescriptions, newPrescription]);
    setShowAddPrescription(false);
  };

  return (
    <div className="container">
      <h2>Prescriptions</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Prescription ID</th>
            <th>Appointment ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td>{prescription.id}</td>
              <td>{prescription.appointmentId}</td>
              <td>{prescription.description}</td>
              <td>{prescription.status}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleViewPrescription(prescription.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleAddPrescription}>
        Add Prescription
      </button>
      {showAddPrescription && (
        <AddPrescriptionForm
          prescription={selectedPrescription}
          onClose={handleCloseAddPrescription}
          onSave={handleSavePrescription}
        />
      )}
      {selectedPrescription && <ViewPrescriptions prescription={selectedPrescription} />}
    </div>
  );
}

export default Prescription;
