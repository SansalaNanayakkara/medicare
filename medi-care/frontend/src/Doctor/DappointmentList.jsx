import React from 'react';

const DappointmentList = ({ appointments, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Appointment ID</th>
          <th>Patient ID</th>
          <th>Doctor ID</th>
          <th>Appointment Time</th>
          {/* <th>Status</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => (
          <tr key={appointment.appointment_id}>
            <td>{appointment.appointment_id}</td>
            <td>{appointment.patient_id}</td>
            <td>{appointment.doctor_id}</td>
            <td>{appointment.appointment_time}</td>
            {/* <td>{appointment.status}</td> */}
            <td>
              <button onClick={() => handleDelete(appointment.appointment_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DappointmentList;
