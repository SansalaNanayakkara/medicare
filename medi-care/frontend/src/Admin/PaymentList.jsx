import React from 'react';

function PaymentList({ payments }) {
  return (
    <tbody>
      {payments.map((payment) => (
        <tr key={payment.id}>
          <td>{payment.id}</td>
          <td>{payment.appointmentId}</td>
          <td>{payment.totalAmount}</td>
          <td>{payment.paymentMethod}</td>
          <td>{payment.date}</td>
          <td>{payment.time}</td>
          <td>{payment.description}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default PaymentList;
