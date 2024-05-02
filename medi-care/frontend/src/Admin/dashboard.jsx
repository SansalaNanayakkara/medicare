import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import backgroundImage from "../Assests/background.jpg";
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale } from 'chart.js';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
Chart.register(ArcElement, CategoryScale);


function Dashboard() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Today's date by default
  const [genderData, setGenderData] = useState([]);
  // const [appointmentCounts, setAppointmentCounts] = useState([]);
  // const [paymentAmounts, setPaymentAmounts] = useState([]);
  // const [doctorPatients, setDoctorPatients] = useState([]);
  // const [medicationData, setMedicationData] = useState([]);

  useEffect(() => {
    // This function runs after every render
    // You can perform side effects here

    // Example: fetching data from an API using Axios
    axios.get('http://localhost:5000/api/patient-demographics')
      .then(response => {
        // Update state with fetched data
        setGenderData(response.data);
        console.log(genderData[0].count);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
    },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const doctorResponse = await axios.get('/api/doctors/count'); // Replace with your API endpoint
        // setDoctorCount(doctorResponse.data);

        // const patientResponse = await axios.get('/api/patients/count'); // Replace with your API endpoint
        // setPatientCount(patientResponse.data);

        // const appointmentsResponse = await axios.get('/api/appointments', {
        //   params: { date: selectedDate.toISOString() }, // Filter by selected date
        // }); // Replace with your API endpoint
        // setAppointments(appointmentsResponse.data);
        

        // const appointmentCountsResponse = await axios.get('/api/appointment-counts', {
        //   params: { dateRange: 'month' }, // Filter by month
        // });
        // setAppointmentCounts(appointmentCountsResponse.data);

        // const paymentAmountsResponse = await axios.get('/api/payment-amounts', {
        //   params: { dateRange: 'month' }, // Filter by month
        // });
        // setPaymentAmounts(paymentAmountsResponse.data);

        // const doctorPatientsResponse = await axios.get('/api/doctor-patients');
        // setDoctorPatients(doctorPatientsResponse.data);

        // const medicationResponse = await axios.get('/api/medication-distribution');
        // setMedicationData(medicationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedDate]); // Refetch data when selectedDate changes

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Appointment calendar component (replace with your preferred calendar library)
  const Calendar = () => {
    // Implementation using your chosen calendar library
    // ...
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
      {/* ... */}
     <div>
        <h2>Patient Demographics</h2>
        <div>
          <PieChart
            series={[
              {
                data: genderData.map((item) => ({
                  id: item.id,
                  value: item.count,
                  label: item.gender,
                })),
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
      {/* <div>
        <h2>Appointments per Month</h2>
        <Bar
          data={{
            labels: appointmentCounts.map((item) => item.month),
            datasets: [
              {
                label: 'Appointment Count',
                data: appointmentCounts.map((item) => item.count),
                backgroundColor: '#4caf50',
              },
            ],
          }}
        />
      </div>
      <div>
        <h2>Payments Received per Month</h2>
        <Line
          data={{
            labels: paymentAmounts.map((item) => item.month),
            datasets: [
              {
                label: 'Payment Amount',
                data: paymentAmounts.map((item) => item.total),
                borderColor: '#f44336',
                fill: false,
              },
            ],
          }}
        />
      </div>
      <div>
        <h2>Number of Patients per Doctor</h2>
        <Bar
          data={{
            labels: doctorPatients.map((item) => item.doctor_name),
            datasets: [
              {
                label: 'Patient Count',
                data: doctorPatients.map((item) => item.count),
                backgroundColor: '#2196f3',
              },
            ],
          }}
        />
      </div>
      <div>
        <h2>Distribution of Prescribed Medications</h2>
        <Pie
          data={{
            labels: medicationData.map((item) => item.medication_name),
            datasets: [
              {
                label: 'Medication Count',
                data: medicationData.map((item) => item.count),
                backgroundColor: [
                  '#f44336',
                  '#9c27b0',
                  '#3f51b5',
                  '#2196f3',
                  '#009688',
                  '#4caf50',
                  '#ffeb3b',
                  '#ff9800',
                ],
              },
            ],
          }}
        />
      </div> */}
    </div>
  );
}

export default Dashboard;