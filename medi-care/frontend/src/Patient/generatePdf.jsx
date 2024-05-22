import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePdf = (prescription) => {
    console.log('Prescription data:', prescription); // Log the entire prescription object

    const doc = new jsPDF();

    // Add the prescription data to the PDF
    doc.text(`Appointment ID: ${prescription.appointment_id}`, 10, 20);
    doc.text(`Description: ${prescription.prescription_description}`, 10, 30);
    doc.text(`Prescribed Time: ${prescription.prescribed_time}`, 10, 50);

    // Log the items to verify they are correct
    console.log("Prescription items:", prescription.items);

    // Add a table for the prescription items
    if (prescription.items && prescription.items.length > 0) {
        console.log("Adding table to PDF...");
        doc.autoTable({
            startY: 60,
            head: [['Medication Name', 'Quantity', 'Dosage', 'Frequency', 'Duration']],
            body: prescription.items.map(item => [
                item.medication_name,
                item.quantity_prescribed,
                item.dosage,
                item.frequency,
                item.duration
            ]),
        });
        console.log("Table added to PDF.");
    }

    // Save the PDF
    doc.save(`prescription-${prescription.prescription_id}.pdf`);
    console.log("PDF saved.");
};

export default generatePdf;
