// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const AdminPrescriptions = () => {
//     const [prescriptions, setPrescriptions] = useState([]);
//     const [selectedPrescription, setSelectedPrescription] = useState(null);
//     const [showViewModal, setShowViewModal] = useState(false);
//     const [showUpdateModal, setShowUpdateModal] = useState(false);
//     const [updatedStatus, setUpdatedStatus] = useState('');

//     useEffect(() => {
//         // Fetch prescriptions from API when component mounts
//         fetchPrescriptions();
//     }, []);

//     const fetchPrescriptions = () => {
//         // Fetch prescriptions from API
//         // Example API call:
//         // fetch('/api/prescriptions')
//         //     .then(response => response.json())
//         //     .then(data => setPrescriptions(data))
//         //     .catch(error => console.error('Error fetching prescriptions', error));
        
//         // Example data (replace with actual data fetched from API)
//         const dummyData = [
//             { id: 1, appointmentId: 1234, description: 'Some description', status: 'pending' },
//             { id: 2, appointmentId: 5678, description: 'Another description', status: 'dispensed' }
//         ];
//         setPrescriptions(dummyData);
//     };

//     const handleViewPrescription = (prescription) => {
//         setSelectedPrescription(prescription);
//         setShowViewModal(true);
//     };

//     const handleUpdateStatus = () => {
//         // Update prescription status in database
//         // Example API call:
//         // fetch(`/api/prescriptions/${selectedPrescription.id}`, {
//         //     method: 'PUT',
//         //     body: JSON.stringify({ status: updatedStatus }),
//         //     headers: {
//         //         'Content-Type': 'application/json'
//         //     }
//         // })
//         // .then(response => response.json())
//         // .then(data => {
//         //     // Handle successful update
//         //     fetchPrescriptions(); // Refresh prescriptions
//         // })
//         // .catch(error => console.error('Error updating prescription status', error));

//         // Example: Log the updated status
//         console.log('Updated Status:', updatedStatus);

//         // Close modal after updating status
//         setShowUpdateModal(false);
//     };

//     return (
//         <div>
//             <h1>Admin's Prescription Interface</h1>

//             {/* Table of prescriptions */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Prescription ID</th>
//                         <th>Appointment ID</th>
//                         <th>Description</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {prescriptions.map(prescription => (
//                         <tr key={prescription.id}>
//                             <td>{prescription.id}</td>
//                             <td>{prescription.appointmentId}</td>
//                             <td>{prescription.description}</td>
//                             <td>{prescription.status}</td>
//                             <td>
//                                 <Button onClick={() => handleViewPrescription(prescription)}>View</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* View Prescription Modal */}
//             <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>View Prescription</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {selectedPrescription && (
//                         <div>
//                             <p><strong>Prescription ID:</strong> {selectedPrescription.id}</p>
//                             <p><strong>Appointment ID:</strong> {selectedPrescription.appointmentId}</p>
//                             <p><strong>Description:</strong> {selectedPrescription.description}</p>
//                             <p><strong>Status:</strong> {selectedPrescription.status}</p>
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Update Prescription Status Modal */}
//             <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Update Prescription Status</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form.Group controlId="status">
//                         <Form.Label>Status</Form.Label>
//                         <Form.Control as="select" value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
//                             <option value="pending">Pending</option>
//                             <option value="dispensed">Dispensed</option>
//                             <option value="cancelled">Cancelled</option>
//                         </Form.Control>
//                     </Form.Group>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
//                     <Button variant="primary" onClick={handleUpdateStatus}>Update Status</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default AdminPrescriptions;
