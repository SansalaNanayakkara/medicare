import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import backgroundImage from "../Assests/background.jpg";
import axios from 'axios';

function AddPatientForm(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:5000/api/addpatients', formData);
      if (response.status === 200) {
        alert('Patient added successfully');
      } else {
        console.error('Error adding patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
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
      <Container className="bg-light p-5" style={{ maxWidth: '500px' }}>
        <div className="add-patient-form-container d-flex justify-content-center">
          <form onSubmit={handleFormSubmit} className="add-patient-form">
            <h2>Add Patient</h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-control form-control-sm"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control form-control-sm"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control form-control-sm"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control form-control-sm"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="tel"
                name="mobileNumber"
                id="mobileNumber"
                className="form-control form-control-sm"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-control form-control-sm"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender"
                id="gender"
                className="form-control form-control-sm"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group:</label>
              <input
                type="text"
                name="bloodGroup"
                id="bloodGroup"
                className="form-control form-control-sm"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions d-flex justify-content-between mt-3">
              <div className="form-group d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mr-2">
                  Add Patient
                </button>
                <button type="button" className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default AddPatientForm;
