import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link } from 'react-router-dom';
import PaymentList from './PaymentList';
import backgroundImage from "../Assests/background.jpg";
import axios from 'axios';
import * as dayjs from 'dayjs'

const paymentList = [
];

function Payments() {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [payments, setPayments] = useState([]); // Rename the state variable
  const [filteredPayments, setFilteredPayments] = useState(paymentList); // Filtered list

  useEffect(() => {
    axios.get('http://localhost:5000/api/payments')
      .then(response => {
        setPayments(response.data);
        setFilteredPayments(response.data); // Set filtered medications here
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching payments:", error);
      });
  }, []);

  function handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase(); // Lowercase for case-insensitive search
    setSearchTerm(searchTerm);

    // Filter payments based on search term (you can implement search logic here)
    const filteredList = paymentList.filter((payment) => {
      // Implement search logic based on your payment data structure (e.g., patient name, amount)
      return true; // Replace with your filtering logic
    });
    setFilteredPayments(filteredList);
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
    <div className="container payments-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Your navbar content here (e.g., brand name, navigation links) */}
      </nav>
      <div className="row mt-3"> {/* Add margin-top for space */}
        <div className="col-md-12">
          <div className="search-options mb-3 d-flex justify-content-center"> {/* Center search bar horizontally */}
            <input
              type="text"
              className="form-control"
              placeholder="Search Payments"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="card payment-list">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Patient ID</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
      {payments.map((payments) => (
        <tr key={payments.payment_id}>
          <td>{payments.payment_id}</td>
          <td>{payments.patient_id}</td>
          <td>{payments.total_amount}</td>
          <td>{payments.payment_method}</td>
          {/* <td>{payments.payment_date}</td> */}
          <td>{dayjs(payments.payment_date).format("YYYY-MM-DD")}</td>
          <td>{payments.payment_time}</td>
          <td>{payments.payment_description}</td>
        </tr>
      ))}
    </tbody>
            </table>
          </div>
          <Link to="/AddPaymentForm" className="btn btn-primary mt-3">
            Add Payment
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Payments;
