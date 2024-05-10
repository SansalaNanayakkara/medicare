import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backgroundImage from "../Assests/background.jpg";

function ViewDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Maintain filteredDoctors state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch doctor list from the API
    axios.get('http://localhost:5000/api/doctors')
      .then(response => {
        setDoctors(response.data);
        console.log(response.data);
        setFilteredDoctors(response.data); // Set filteredDoctors initially
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  function handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter doctors based on search term
    const filteredList = doctors.filter((doctor) => {
      const fullName = `${doctor.firstName} ${doctor.lastName}`;
      return (
        fullName.toLowerCase().includes(searchTerm) ||
        doctor.specialization.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredDoctors(filteredList);
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
      <div className="container doctors-page">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* Your navbar content here (e.g., brand name, navigation links) */}
        </nav>
        <div className="row mt-3"> {/* Add margin-top for space */}
          <div className="col-md-12">
            <div className="search-options mb-3 d-flex justify-content-center"> {/* Center search bar horizontally */}
              <input
                type="text"
                className="form-control"
                placeholder="Search Doctors (Name or Specialization)"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="card doctor-list">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Doctor ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Specialization</th>
                    <th>Email Address</th>
                    <th>Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor, index) => (
                    <tr key={index}>
                      <td>{doctor.doctor_id}</td> {/* Assuming you have an ID for each doctor */}
                      <td>{doctor.first_name}</td>
                      <td>{doctor.last_name}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.mobile_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDoctors;
