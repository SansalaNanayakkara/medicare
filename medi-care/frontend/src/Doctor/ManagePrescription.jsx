import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import backgroundImage from "../Assests/background.jpg";

function ManagePrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Add this line

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

  function handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase(); // Lowercase for case-insensitive search
    setSearchTerm(searchTerm);

    // Filter appointments based on search term (you can customize this logic)
    const filteredList = prescriptions.filter((prescription) => {
      const prescriptionId = `${prescription.prescriptionId} `;
      // const doctorName = `${appointment.doctorFirstName} ${appointment.doctorLastName}`;
      return (
        prescriptionId.toLowerCase().includes(searchTerm)
        // doctorName.toLowerCase().includes(searchTerm) ||
        // appointment.reason.toLowerCase().includes(searchTerm)
      );
    });

    // **Correction: Use setAppointments to update filtered list**
    setPrescriptions(filteredList); // Update appointments state with filtered list
  }
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
        {/* <Link to="/addprescription" className="btn btn-primary mb-3">
          Add Prescription
        </Link> */}
         <div className="search-options mb-3 d-flex justify-content-center"> {/* Center search bar horizontally */}
            <input
              type="text"
              className="form-control"
              placeholder="Search Prescriptions"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Prescription ID</th>
              <th>Appointment ID</th>
             <th> Description </th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={prescription.id}>
                <td>{index + 1}</td>
                <td>{prescription.medicationId}</td>
                <td>{prescription.quantityPrescribed}</td>
                <td>{prescription.description}</td>
                
                <td>
                  <Button variant="primary" size="sm" onClick={() => handleViewPrescription(prescription.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/addprescription" className="btn btn-primary mt-3">
          Add Prescription
        </Link>
      </div>
      
    </div>
  );
}

export default ManagePrescription;
