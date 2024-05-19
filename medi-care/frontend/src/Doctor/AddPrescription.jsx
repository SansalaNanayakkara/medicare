import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from "../Assests/background.jpg";
import { Container, Row, Col, Form } from 'react-bootstrap'; // Import the necessary components

const AddPrescription = ({ doctorId, onClose, onPrescriptionAdded }) => {
  const [appointmentId, setAppointmentId] = useState('');
  const [prescriptionDescription, setPrescriptionDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [prescribedTime, setPrescribedTime] = useState('');
  const [items, setItems] = useState([{ medication_name: '', quantity_prescribed: '', dosage: '', frequency: '', duration: '' }]);

  const handleAddItem = () => {
    setItems([...items, { medication_name: '', quantity_prescribed: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const fetchMedicationId = async (medicationName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/medications/${medicationName}`);
      return response.data.medication_id;
    } catch (error) {
      console.error('Error fetching medication ID:', error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const prescriptionItems = await Promise.all(items.map(async (item) => {
      const medicationId = await fetchMedicationId(item.medication_name);
      if (medicationId) {
        return { ...item, medication_id: medicationId };
      }
      return null;
    }));
  
    const validItems = prescriptionItems.filter(item => item !== null);
  
    if (validItems.length === 0) {
      alert('Failed to add prescription: Invalid medication names');
      return;
    }
  
    const newPrescription = {
      appointment_id: appointmentId,
      prescription_description: prescriptionDescription,
      status,
      prescribed_time: prescribedTime,
      items: validItems
    };
  
    console.log('Sending prescription data:', newPrescription);
  
    axios.post('http://localhost:5000/api/prescriptions', newPrescription)
      .then(response => {
        // Include the prescription_id in the newPrescription object
        const newPrescriptionWithId = { ...newPrescription, prescription_id: response.data.newPrescription.prescription_id };
        onPrescriptionAdded(newPrescriptionWithId);
        onClose(); // Close the form after submission
      })
      .catch(error => {
        console.error('There was an error adding the prescription!', error);
      });
  };
  
  return (
    <Container className="bg-light p-5" style={{ maxWidth: '800px' }}>
      <Container fluid style={{ display: 'flex', justifyContent: 'center' }}>
        <Row className="justify-content-center align-items-center vh-80" style={{ width: '100%' }}>
          <Col> 
            <Form onSubmit={handleSubmit}> 
              <Form.Group controlId="appointmentId"> 
                <Form.Label>Appointment ID</Form.Label>
                <Form.Control
                  type="text"
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                  placeholder="Enter Appointment ID"
                />
              </Form.Group>

              <Form.Group controlId="prescriptionDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={prescriptionDescription}
                  onChange={(e) => setPrescriptionDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Dispensed">Dispensed</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="prescribedTime">
                <Form.Label>Prescribed Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={prescribedTime}
                  onChange={(e) => setPrescribedTime(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="prescriptionItems">
                <Form.Label>Prescription Items</Form.Label>
                {items.map((item, index) => (
                  <Row key={index}>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Medication Name"
                        name="medication_name"
                        value={item.medication_name}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Quantity"
                        name="quantity_prescribed"
                        value={item.quantity_prescribed}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Dosage"
                        name="dosage"
                        value={item.dosage}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Frequency"
                        name="frequency"
                        value={item.frequency}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Duration"
                        name="duration"
                        value={item.duration}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </Col>
                  </Row>
                ))}
                <button type="button" className="btn btn-secondary" onClick={handleAddItem}>Add Item</button>
              </Form.Group>

              <button type="submit" className="btn btn-primary">Add Prescription</button>
              <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AddPrescription;
