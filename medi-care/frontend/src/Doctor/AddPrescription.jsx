import React, { useState } from 'react';
import axios from 'axios';

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
                onPrescriptionAdded(newPrescription);
                onClose(); // Close the form after submission
            })
            .catch(error => {
                console.error('There was an error adding the prescription!', error);
            });
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Appointment ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={appointmentId}
                        onChange={(e) => setAppointmentId(e.target.value)}
                        placeholder="Enter Appointment ID"
                    />
                </div>
                <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={prescriptionDescription} onChange={(e) => setPrescriptionDescription(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Dispensed">Dispensed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Prescribed Time</label>
                    <input type="datetime-local" className="form-control" value={prescribedTime} onChange={(e) => setPrescribedTime(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Prescription Items</label>
                    {items.map((item, index) => (
                        <div key={index} className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Medication Name" name="medication_name" value={item.medication_name} onChange={event => handleInputChange(index, event)} />
                            </div>
                            <div className="col">
                                <input type="number" className="form-control" placeholder="Quantity" name="quantity_prescribed" value={item.quantity_prescribed} onChange={event => handleInputChange(index, event)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Dosage" name="dosage" value={item.dosage} onChange={event => handleInputChange(index, event)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Frequency" name="frequency" value={item.frequency} onChange={event => handleInputChange(index, event)} />
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Duration" name="duration" value={item.duration} onChange={event => handleInputChange(index, event)} />
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={handleAddItem}>Add Item</button>
                </div>
                <button type="submit" className="btn btn-primary">Add Prescription</button>
                <button type="button" className="btn btn-danger" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default AddPrescription;
