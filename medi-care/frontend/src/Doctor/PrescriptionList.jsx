import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AddPrescription from './AddPrescription';
import backgroundImage from "../Assests/background.jpg";
import { Container } from 'react-bootstrap';

const PrescriptionList = ({ doctorId = 3 }) => { // Default value for doctorId
  const [prescriptions, setPrescriptions] = useState([]);
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  // Function to fetch prescriptions
  const fetchPrescriptions = useCallback(() => {
    console.log('Fetching prescriptions for doctorId:', doctorId); // Debug log
    axios.get(`http://localhost:5000/api/prescriptions/${doctorId}`)
      .then(response => {
        console.log('Fetched prescriptions:', response.data); // Debug log
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the prescriptions!', error);
      });
  }, [doctorId]);

  // Fetch prescriptions on component mount and when doctorId changes
  useEffect(() => {
    if (doctorId) {
      fetchPrescriptions();
    }
  }, [fetchPrescriptions, doctorId]);

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

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Edit prescription with ID: ${id}`);
  };

  const handleAddPrescriptionClick = () => {
    setShowAddPrescription(true);
  };

  const handleFormClose = () => {
    setShowAddPrescription(false);
  };

  const handlePrescriptionAdded = (newPrescription) => {
    setPrescriptions(prevPrescriptions => [...prevPrescriptions, newPrescription]);
    setShowAddPrescription(false);
  };

  return (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
      {!showAddPrescription && (
        <Container className="prescription-list" style={{ paddingLeft: '15px', paddingRight: '15px' }}> 
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className="btn btn-primary btn-add-prescription" onClick={handleAddPrescriptionClick}>Add Prescription</button>
          </div>
        </Container>
      )}
      {showAddPrescription && (
        <AddPrescription
          doctorId={doctorId}
          onClose={handleFormClose}
          onPrescriptionAdded={handlePrescriptionAdded}
        />
      )}
    </div>
  );
};

export default PrescriptionList;
