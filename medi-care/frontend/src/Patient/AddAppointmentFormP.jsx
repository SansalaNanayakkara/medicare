import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import backgroundImage from "../Assests/background.jpg";

function AddAppointmentFormP(props) {
  const [formData, setFormData] = useState({
    doctorId: "",
    patientId: "",
    date: "",
    time: "",
    reason: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { doctorId, patientId, date, time, reason } = formData; // Get values from formData

    try {
      const response = await axios.post('http://localhost:5000/api/addappointments', {
        doctorId,
        patientId,
        date,
        time,
        reason,
      });

      if (response.status === 200) {
        alert('Appointment submitted successfully');
        setFormData({
          doctorId: "",
          patientId: "",
          date: "",
          time: "",
          reason: "",
        });
      } else {
        console.error('Invalid data');
      }
    } catch (error) {
      console.error('Add appointment failed:', error);
      alert('Failed to add appointment. Please try again later.');
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
        <div className="add-appointment-form-container d-flex justify-content-center">
          <form onSubmit={handleFormSubmit} className="add-appointment-form">
            <h2>Add Appointment</h2>
            <div className="form-group">
              <label htmlFor="doctorId">Doctor ID:</label>
              <input
                type="number" // Assuming doctor ID is a number
                name="doctorId"
                id="doctorId"
                className="form-control form-control-sm"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="patientId">Patient ID:</label>
              <input
                type="number" // Assuming patient ID is a number
                name="patientId"
                id="patientId"
                className="form-control form-control-sm"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                id="date"
                className="form-control form-control-sm"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                name="time"
                id="time"
                className="form-control form-control-sm"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason for Appointment:</label>
              <textarea
                name="reason"
                id="reason"
                className="form-control form-control-sm"
                value={formData.reason}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-actions d-flex justify-content-between mt-3"> {/* Added margin-top */}
              <div className="form-group d-flex justify-content-center"> {/* Center buttons */}
                <button type="submit" className="btn btn-primary mr-2">
                  Add Appointment
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

export default AddAppointmentFormP;
