import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import backgroundImage from "../Assests/background.jpg";

function AddDoctorForm() {
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [specialization,setSpecialization] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialization: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = async (e)=> {
    e.preventDefault();
    console.log(firstName,lastName,specialization,email,password,mobileNumber);
    try{
             const response = await axios.post('http://localhost:5000/api/adddoctors', {
                firstName,
                lastName,
                specialization,
                email,
                password,
                mobileNumber
            });
            if (response.status === 200) {
              alert('Feedback submitted successfully');
              
          } else {
              console.error('Invalid username or password');
          }
      } catch (error) {
          console.error('Login failed:', error);
          console.error('Failed to login. Please try again later.');
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
    <div className="add-doctor-form-container d-flex justify-content-center">
      <form onSubmit={handleFormSubmit} className="add-doctor-form">
        <h2>Add Doctor</h2>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control form-control-sm"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialization">Specialization:</label>
          <input
            type="text"
            name="specialization"
            id="specialization"
            className="form-control form-control-sm"
            value={specialization} // Typo fixed
            onChange={(e) => setSpecialization(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-actions d-flex justify-content-between mt-3"> {/* Added margin-top */}
          <button type="submit" className="btn btn-primary  mr-2">
            Add Doctor
          </button>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </Container>
    </div>
  );
}

export default AddDoctorForm;
