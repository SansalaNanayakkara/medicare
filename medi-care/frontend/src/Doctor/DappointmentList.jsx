import React from 'react';

function DappointmentList({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return <p>No appointments found.</p>;
  }

  return (
    <tbody>
      {appointments.map((appointment) => (
        <tr key={appointment.appointmentId}>
          <td>{appointment.appointment_Id}</td>
          <td>{appointment.doctor_Id}</td>
          <td>{appointment.patientId}</td>
          <td>{appointment.date}</td>
          <td>{appointment.time}</td>
          <td>{appointment.reason}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default DappointmentList;
