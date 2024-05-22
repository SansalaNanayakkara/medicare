import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPrescription from './EditPrescription';
import MarkDispensed from './MarkDispensed';
import backgroundImage from "../Assests/background.jpg"; // Import the background image

const AdminPrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [showEditPrescription, setShowEditPrescription] = useState(false);
  const [showMarkDispensed, setShowMarkDispensed] = useState(false);
  const [editingPrescriptionId, setEditingPrescriptionId] = useState(null);
  const [dispensingPrescriptionId, setDispensingPrescriptionId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/prescriptions')
      .then(response => {
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the prescriptions!', error);
      });
  }, []);

  const handleEdit = (id) => {
    setEditingPrescriptionId(id);
    setShowEditPrescription(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/prescriptions/${id}`)
      .then(() => {
        setPrescriptions(prevPrescriptions =>
          prevPrescriptions.filter(prescription => prescription.prescription_id !== id)
        );
      })
      .catch(error => {
        console.error('There was an error deleting the prescription!', error);
      });
  };

  const handleMarkDispensed = (id) => {
    setDispensingPrescriptionId(id);
    setShowMarkDispensed(true);
  };

  const handleEditFormClose = () => {
    setShowEditPrescription(false);
    setEditingPrescriptionId(null);
  };

  const handleMarkDispensedFormClose = () => {
    setShowMarkDispensed(false);
    setDispensingPrescriptionId(null);
  };

  const handlePrescriptionUpdated = (updatedPrescription) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prescription =>
        prescription.prescription_id === updatedPrescription.prescription_id ? updatedPrescription : prescription
      )
    );
    setShowEditPrescription(false);
    setEditingPrescriptionId(null);
  };

  const handlePrescriptionMarkedDispensed = (updatedPrescription) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prescription =>
        prescription.prescription_id === updatedPrescription.prescription_id ? updatedPrescription : prescription
      )
    );
    setShowMarkDispensed(false);
    setDispensingPrescriptionId(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        padding: '20px'
      }}
    >
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Prescription ID</th>
            <th>Appointment ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map(prescription => (
            <tr key={prescription.prescription_id}>
              <td>{prescription.prescription_id}</td>
              <td>{prescription.appointment_id}</td>
              <td>{prescription.prescription_description}</td>
              <td>{prescription.status}</td>
              <td>
                <button onClick={() => handleEdit(prescription.prescription_id)}>Edit</button>
                <button onClick={() => handleDelete(prescription.prescription_id)}>Delete</button>
                {prescription.status !== 'Dispensed' && (
                  <button onClick={() => handleMarkDispensed(prescription.prescription_id)}>Mark as Dispensed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditPrescription && (
        <EditPrescription
          prescriptionId={editingPrescriptionId}
          onClose={handleEditFormClose}
          onPrescriptionUpdated={handlePrescriptionUpdated}
        />
      )}
      {showMarkDispensed && (
        <MarkDispensed
          prescriptionId={dispensingPrescriptionId}
          onClose={handleMarkDispensedFormClose}
          onPrescriptionMarkedDispensed={handlePrescriptionMarkedDispensed}
        />
      )}
    </div>
  );
};

export default AdminPrescriptionList;
