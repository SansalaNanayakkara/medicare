import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import AppointmentList from './AppointmentList';
import backgroundImage from "../Assests/background.jpg";
import * as dayjs from 'dayjs'

function Appointments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // Add this state

  useEffect(() => {
    axios.get('http://localhost:5000/api/appointments')
      .then(response => {
        setAppointments(response.data);
        setFilteredAppointments(response.data); // Set filtered appointments here
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  function handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase(); // Lowercase for case-insensitive search
    setSearchTerm(searchTerm);

    // Filter appointments based on search term (you can customize this logic)
    const filteredList = appointments.filter((appointment) => {
      const patientName = `${appointment.patientFirstName} ${appointment.patientLastName}`;
      const doctorName = `${appointment.doctorFirstName} ${appointment.doctorLastName}`;
      return (
        patientName.toLowerCase().includes(searchTerm) ||
        doctorName.toLowerCase().includes(searchTerm) ||
        appointment.reason.toLowerCase().includes(searchTerm)
      );
    });

    // **Correction: Use setAppointments to update filtered list**
    setAppointments(filteredList); // Update appointments state with filtered list
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
    <div className="container appointments-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Your navbar content here (e.g., brand name, navigation links) */}
      </nav>
      <div className="row mt-3"> {/* Add margin-top for space */}
        <div className="col-md-12">
          <div className="search-options mb-3 d-flex justify-content-center"> {/* Center search bar horizontally */}
            <input
              type="text"
              className="form-control"
              placeholder="Search Appointments (Patient, Doctor, Reason)"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="card appointment-list">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Doctor ID</th>
                  <th>Patient ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Reason</th>
                </tr>
              </thead>
              
              <tbody>
                {filteredAppointments.map((appointment,index) =>(
                  <tr key={index}>
                    <td>{appointment.appointment_id}</td> {/* Assuming you have an ID for each doctor */}
                    <td>{appointment.doctor_id}</td>
                    <td>{appointment.patient_id}</td>
                    <td>{dayjs(appointment.appointment_date).format("YYYY-MM-DD")}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.description}</td>
                  </tr>
                ))}
              </tbody>
              <AppointmentList appointments={appointments} />
            </table>
          </div>
          <Link to="/AddAppointmentForm" className="btn btn-primary mt-3">
            Add Appointment
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Appointments;
