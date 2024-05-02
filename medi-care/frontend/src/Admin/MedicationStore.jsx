import React, { useState, useEffect } from 'react'; // Add useEffect import
import { Link } from 'react-router-dom';
import axios from 'axios';
import MedicationList from './MedicationList';
import AddMedicationForm from './AddMedicationForm';
import backgroundImage from "../Assests/background.jpg";
import * as dayjs from 'dayjs'

function MedicationStore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState([]); // Rename the state variable
  const [filteredMedications, setFilteredMedications] = useState([]); // Update the state variable name

  useEffect(() => {
    axios.get('http://localhost:5000/api/medications')
      .then(response => {
        setMedications(response.data);
        setFilteredMedications(response.data); // Set filtered medications here
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching medications:", error);
      });
  }, []);

  function handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredList = medications.filter((medication) => { // Use the correct state variable
      const medicationName = `${medication.medicationName}`;
      return (
        medicationName.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredMedications(filteredList); // Update filtered medications state with filtered list
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
    <div className="container medication-store-page">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Your navbar content here (e.g., brand name, navigation links) */}
      </nav>
      <div className="row mt-3"> {/* Add margin-top for space */}
        <div className="col-md-12">
          <div className="search-options mb-3 d-flex justify-content-center"> {/* Center search bar horizontally */}
            <input
              type="text"
              className="form-control"
              placeholder="Search Medications (Name)"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="card medication-list">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Medication ID</th>
                  <th>Medication Name</th>
                  <th>Price per Unit</th>
                  <th>Quantity Available</th>
                  <th>Manufactured Date</th>
                  <th>Expire Date</th>
                </tr>
              </thead>
              <tbody>
          {medications.map((medication_store) => (
        <tr key={medication_store.medication_id}>
          <td>{medication_store.medication_id}</td>
          <td>{medication_store.medication_name}</td>
          <td>{medication_store.price_per_unit}</td>
          <td>{medication_store.quantity_available}</td>
          {/* <td>{medication_store.manufacture_date}</td> */}
          <td>{dayjs(medication_store.manufacture_date).format("YYYY-MM-DD")}</td>
          {/* <td>{medication_store.expire_date}</td> */}
          <td>{dayjs(medication_store.expire_date).format("YYYY-MM-DD")}</td>
        </tr>
      ))}
    </tbody>
            </table>
          </div>
          <Link to="/AddMedicationForm" className="btn btn-primary mt-3">
            Add Medication
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default MedicationStore;
