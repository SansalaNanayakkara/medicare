import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';
import backgroundImage from "../Assests/background.jpg";

function ViewPayments({ patientId }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/patient-payments?patientId=${patientId}`)

      .then(response => {
        setPayments(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching payments:", error);
      });
  }, [patientId]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="container payments-page">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* Your navbar content here (e.g., brand name, navigation links) */}
        </nav>
        <div className="row mt-3"> {/* Add margin-top for space */}
          <div className="col-md-12">
            <div className="card payment-list">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Appointment ID</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.payment_id}>
                      <td>{payment.payment_id}</td>
                      <td>{payment.appointment_id}</td>
                      <td>{payment.total_amount}</td>
                      <td>{payment.payment_method}</td>
                      <td>{dayjs(payment.payment_date).format("YYYY-MM-DD")}</td>
                      <td>{payment.payment_time}</td>
                      <td>{payment.payment_description}</td>
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

export default ViewPayments;
