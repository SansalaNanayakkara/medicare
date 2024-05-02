import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import backgroundImage from "../Assests/background.jpg";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  // Fetch prescriptions data on component mount (assuming API endpoint)
  useEffect(() => {
    const fetchPrescriptions = async () => {
      const response = await fetch('/api/prescriptions'); // Replace with your API endpoint
      const data = await response.json();
      setPrescriptions(data);
    };

    fetchPrescriptions();
  }, []);

  const handleViewPrescription = (prescriptionId) => {
    // Handle view button click: navigate to detailed prescription view or display modal
    console.log('View prescription:', prescriptionId); // For now, log the ID
  };

  return (
    
    <div
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}
  >
    <div className="container">
      {/* <h1>Prescriptions</h1> */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Prescription ID</th> 
            {/* prescription id */}
            <th>Appointment ID</th>
            {/* <th>Patient ID</th> */}
            {/* <th>Medication ID</th> */}
            <th>Special notes(if any)</th>
            {/* <th>Date</th> */}
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={prescription.id}>
              <td>{index + 1}</td>
              <td>{prescription.appointmentId}</td>
              {/* <td>{prescription.patientId}</td>
              <td>{prescription.medicationId}</td> */}
              <td>{prescription.description}</td>
              <td>{prescription.specialNotes}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleViewPrescription(prescription.id)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default Prescriptions;
