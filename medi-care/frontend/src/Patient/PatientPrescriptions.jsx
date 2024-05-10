// import React, { useState, useEffect } from 'react';
// import { Table, Button } from 'react-bootstrap';
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// const PatientPrescriptions = () => {
//     const [prescriptions, setPrescriptions] = useState([]);

//     useEffect(() => {
//         // Fetch patient's prescriptions from API when component mounts
//         fetchPrescriptions();
//     }, []);

//     const fetchPrescriptions = () => {
//         // Fetch prescriptions from API
//         // Example API call:
//         // fetch('/api/patient/prescriptions')
//         //     .then(response => response.json())
//         //     .then(data => setPrescriptions(data))
//         //     .catch(error => console.error('Error fetching prescriptions', error));
        
//         // Example data (replace with actual data fetched from API)
//         const dummyData = [
//             { id: 1, appointmentId: 1234, description: 'Some description', status: 'pending', medicationDetails: [{ medicationId: 1, quantity: 1, dosage: '10mg', frequency: 'Once a day', duration: '7 days' }] },
//             { id: 2, appointmentId: 5678, description: 'Another description', status: 'dispensed', medicationDetails: [{ medicationId: 2, quantity: 2, dosage: '20mg', frequency: 'Twice a day', duration: '14 days' }] }
//         ];
//         setPrescriptions(dummyData);
//     };

//     const PrescriptionDocument = ({ prescription }) => (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.section}>
//                     <Text style={styles.header}>Prescription Details</Text>
//                     <Text>Prescription ID: {prescription.id}</Text>
//                     <Text>Appointment ID: {prescription.appointmentId}</Text>
//                     <Text>Description: {prescription.description}</Text>
//                     <Text>Status: {prescription.status}</Text>
//                 </View>

//                 <View style={styles.section}>
//                     <Text style={styles.header}>Medication Details</Text>
//                     {prescription.medicationDetails.map((medication, index) => (
//                         <View key={index} style={styles.medication}>
//                             <Text>Medication {index + 1}</Text>
//                             <Text>Medication ID: {medication.medicationId}</Text>
//                             <Text>Quantity Prescribed: {medication.quantity}</Text>
//                             <Text>Dosage: {medication.dosage}</Text>
//                             <Text>Frequency: {medication.frequency}</Text>
//                             <Text>Duration: {medication.duration}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </Page>
//         </Document>
//     );

//     return (
//         <div>
//             <h1>My Prescriptions</h1>

//             {/* Table of prescriptions */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Prescription ID</th>
//                         <th>Appointment ID</th>
//                         <th>Description</th>
//                         <th>Status</th>
//                         <th>Download PDF</th>
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
//                                 <Button onClick={() => window.open(URL.createObjectURL(<PrescriptionDocument prescription={prescription} />))}>Download</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </div>
//     );
// };

// // Define styles for PDF
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'column',
//         padding: 20
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     },
//     header: {
//         fontSize: 18,
//         marginBottom: 10
//     },
//     medication: {
//         marginBottom: 10
//     }
// });

// export default PatientPrescriptions;
