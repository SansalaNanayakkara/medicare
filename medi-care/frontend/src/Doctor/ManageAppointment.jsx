import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DappointmentList from './DappointmentList';
import backgroundImage from "../Assests/background.jpg";

function ManageAppointment({ doctorId }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctor-appointments?doctorId=${doctorId}`)
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointments:", error);
      });
  }, [doctorId]);

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
        <div className="row">
          <div className="col-md-12">
            <h2>Appointments for Doctor ID: {doctorId}</h2>
            {appointments.length > 0 ? (
              <DappointmentList appointments={appointments} />
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAppointment;
