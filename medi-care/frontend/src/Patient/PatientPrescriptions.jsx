import React, { useState, useEffect } from 'react';
import axios from 'axios';
import generatePdf from './generatePdf';

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const patientId = 10; // Fetch prescriptions for patient with ID 10
    axios.get(`http://localhost:5000/api/prescriptions/patient/${patientId}`)
      .then(response => {
        setPrescriptions(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the prescriptions!', error);
      });
  }, []);

  const handleDownloadPdf = (prescription) => {
    generatePdf(prescription);
  };

  return (
    <div>
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
                <button onClick={() => handleDownloadPdf(prescription)}>Download PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientPrescriptions;
