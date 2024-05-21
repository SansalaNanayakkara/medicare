import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DappointmentList from './DappointmentList';
import backgroundImage from "../Assests/background.jpg";
import { Container, Row, Col } from 'react-bootstrap';

const ManageAppointment = ({ doctor_Id = 3 }) => {
  console.log("ManageAppointment is being called"); // Check if the component is being called

  const [appointments, setAppointments] = useState([]);

  console.log("doctor_Id:", doctor_Id); // Check if the doctorId prop is being passed correctly

  useEffect(() => {
    if (doctor_Id) {
      axios.get(`http://localhost:5000/api/doctor-appointments?doctorId=${doctor_Id}`)
        .then(response => {
          console.log(response.data); // Check if the API response is correct
          setAppointments(response.data);
        })
        .catch(error => {
          console.error("Error fetching appointments:", error);
        });
    } else {
      console.error("doctor_Id is undefined!");
    }
  }, [doctor_Id]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/appointments/${id}`)
      .then(() => {
        setAppointments(prev => prev.filter(appointment => appointment.appointment_id !== id));
      })
      .catch(error => {
        console.error('Error deleting appointment!', error);
      });
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
      <Container>
        <Row>
          <Col>
            {/* <h1>Manage Appointments</h1> */}
            {appointments.length > 0 ? (
              <DappointmentList appointments={appointments} handleDelete={handleDelete} />
            ) : (
              <p>No appointments found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageAppointment;
