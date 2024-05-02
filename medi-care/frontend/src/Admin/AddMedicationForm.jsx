import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import backgroundImage from "../Assests/background.jpg";

function AddMedicationForm(props) {
  const [formData, setFormData] = useState({
    medicationName: "",
    pricePerUnit: "",
    quantityAvailable: "",
    manufactureDate: "",
    expireDate: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { medicationName, manufactureDate, expireDate, pricePerUnit, quantityAvailable } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/addmedications', {
        medicationName,
        pricePerUnit,
        quantityAvailable,
        manufactureDate,
        expireDate,
      });

      if (response.status === 200) {
        alert('Medication added successfully');
        setFormData({
          medicationName: "",
          pricePerUnit: "",
          quantityAvailable: "",
          manufactureDate: "",
          expireDate: "",
        });
      } else {
        console.error('Invalid data');
      }
    } catch (error) {
      console.error('Add medication failed:', error);
      alert('Failed to add medication. Please try again later.');
    }
  };

    // **Validation (Optional):**
    // Add code to validate form data (e.g., ensuring numbers for price and quantity)
    // If validation fails, display an error message to the user.

    // **API call or logic to add medication to medicationList**
    // Replace `console.log` with actual logic to add the medication to your medication store data structure (e.g., an array).
    // This might involve making an API call to a backend server or updating a local state management solution.
  //   console.log("Form submitted:", formData);
  // }

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
    <div className="add-medication-form-container d-flex justify-content-center">
    <form onSubmit={handleFormSubmit} className="add-medication-form">
      <h2>Add Medication</h2>
      <div className="form-group">
        <label htmlFor="medicationName">Medication Name:</label>
        <input
          type="text"
          name="medicationName"
          id="medicationName"
          className="form-control form-control-sm"
          value={formData.medicationName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="pricePerUnit">Price per Unit:</label>
        <input
          type="number" // Use type="number" for numeric input
          name="pricePerUnit"
          id="pricePerUnit"
          className="form-control form-control-sm"
          value={formData.pricePerUnit}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="quantityAvailable">Quantity Available:</label>
        <input
          type="number" // Use type="number" for numeric input
          name="quantityAvailable"
          id="quantityAvailable"
          className="form-control form-control-sm"
          value={formData.quantityAvailable}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="manufactureDate">Manufactured Date:</label>
        <input
          type="date"
          name="manufactureDate"
          id="manufactureDate"
          className="form-control form-control-sm"
          value={formData.manufactureDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="expireDate">Expire Date:</label>
        <input
          type="date"
          name="expireDate"
          id="expireDate"
          className="form-control form-control-sm"
          value={formData.expireDate}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-actions d-flex justify-content-between mt-3"> {/* Added margin-top */}
      <div className="form-group d-flex justify-content-center"> {/* Center buttons */}
        <button type="submit" className="btn btn-primary mr-2">
          Add Medication
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

export default AddMedicationForm;
