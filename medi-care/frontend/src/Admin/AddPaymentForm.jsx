import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import backgroundImage from "../Assests/background.jpg";
import axios from 'axios';

function AddPaymentForm(props) {
  const [formData, setFormData] = useState({
    appointmentId: "",
    totalAmount: "",
    paymentMethod: "",
    date: "",
    time: "",
    description: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {appointmentId, totalAmount, paymentMethod, date, time,description } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/addpayments', {
       appointmentId,
       totalAmount,
       paymentMethod,
       date,
       time,
       description,
      });

      if (response.status === 200) {
        alert('Payment added successfully');
        setFormData({
          appointmentId: "",
          totalAmount: "",
          paymentMethod: "",
          date: "",
          time: "",
          description: "",
        });
      } else {
        console.error('Invalid data');
      }
    } catch (error) {
      console.error('Add payment failed:', error);
      alert('Failed to add payment. Please try again later.');
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
    <div className="add-payment-form-container d-flex justify-content-center">
    <form onSubmit={handleFormSubmit} className="add-payment-form">
      <h2>Add Payment</h2>
      <div className="form-group">
        <label htmlFor="appointmentId">Appointment ID:</label>
        <input
          type="number"
          name="appointmentId"
          id="appointmentId"
          className="form-control form-control-sm"
          value={formData.patientId}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="totalAmount">Total Amount:</label>
        <input
          type="number"
          name="totalAmount"
          id="totalAmount"
          className="form-control form-control-sm"
          value={formData.totalAmount}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          className="form-control form-control-sm"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Method</option>
          <option value="Cash">Cash</option>
          <option value="Cheque">Cheque</option>
          {/* <option value="Debit Card">Debit Card</option>
          <option value="Online Payment">Online Payment</option> */}
          {/* You can add more options as needed */}
        </select>
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
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          rows="3"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-actions d-flex justify-content-between mt-3"> {/* Added margin-top */}
      <div className="form-group d-flex justify-content-center"> {/* Center buttons */}
        <button type="submit" className="btn btn-primary mr-2">
          Add Payment
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

export default AddPaymentForm;
