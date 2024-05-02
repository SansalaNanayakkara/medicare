import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from "../Assests/background.jpg";
import * as dayjs from 'dayjs'

function Patients() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch list from the API
    axios.get('http://localhost:5000/api/patients')
      .then(response => {
        setPatients(response.data);
        console.log(response.data);
        setFilteredPatients(response.data); 
      })
      .catch(error => {
        console.error("Error fetching patients:", error);
      });
  }, []);

  function handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter doctors based on search term
    const filteredList = patients.filter((patient) => {
      const fullName = `${patient.firstName} ${patient.lastName}`;
      return (
        fullName.toLowerCase().includes(searchTerm) ||
        patient.address.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredPatients(filteredList);
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
      <div className="container patients-page">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* Your navbar content here (e.g., brand name, navigation links) */}
        </nav>
        <div className="row mt-3"> {/* Add margin-top for space */}
          <div className="col-md-12">
            <div className="search-options mb-3 d-flex justify-content-center"> {/* Center search bar horizontally */}
              <input
                type="text"
                className="form-control"
                placeholder="Search Patients (Name)"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="card patient-list">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Contact Number</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    {/* <th>Address</th> */}
                  </tr>
                </thead>
                <tbody>
                {filteredPatients.map((patient,index) =>(
                  <tr key={index}>
                    <td>{patient.patient_id}</td> {/* Assuming you have an ID for each doctor */}
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.mobile_number}</td>
                    {/* <td>{patient.dob}</td> */}
                    <td>{dayjs(patient.dob).format("YYYY-MM-DD")}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.blood_group}</td>
                    {/* <td>{patient.address}</td> */}
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
            <Link to="/AddPatientForm" className="btn btn-primary mt-3">
              Add Patient
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patients;
