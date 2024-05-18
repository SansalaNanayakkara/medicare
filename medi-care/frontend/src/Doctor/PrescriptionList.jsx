import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPrescription from './AddPrescription';

const PrescriptionList = ({ doctorId }) => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showAddPrescription, setShowAddPrescription] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/prescriptions/${doctorId}`)
            .then(response => {
                setPrescriptions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the prescriptions!', error);
            });
    }, [doctorId]);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/prescriptions/${id}`)
            .then(response => {
                setPrescriptions(prescriptions.filter(prescription => prescription.prescription_id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the prescription!', error);
            });
    };

    const handleEdit = (id) => {
        // Implement edit functionality
    };

    const handleAddPrescriptionClick = () => {
        setShowAddPrescription(true);
    };

    const handleFormClose = () => {
        setShowAddPrescription(false);
    };

    const handlePrescriptionAdded = (newPrescription) => {
        setPrescriptions([...prescriptions, newPrescription]);
    };

    return (
        <div>
            <h2>Prescriptions</h2>
            {!showAddPrescription && (
                <>
                    <button onClick={handleAddPrescriptionClick}>Add Prescription</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Prescription ID</th>
                                <th>Appointment ID</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map(prescription => (
                                <tr key={prescription.prescription_id}>
                                    <td>{prescription.prescription_id}</td>
                                    <td>{prescription.appointment_id}</td>
                                    <td>{prescription.prescription_description}</td>
                                    <td>{prescription.status}</td>
                                    <td>
                                        <button onClick={() => handleEdit(prescription.prescription_id)}>Edit</button>
                                        <button onClick={() => handleDelete(prescription.prescription_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {showAddPrescription && <AddPrescription doctorId={doctorId} onClose={handleFormClose} onPrescriptionAdded={handlePrescriptionAdded} />}
        </div>
    );
};

export default PrescriptionList;
