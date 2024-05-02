import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import AdminHeader from './Admin/AdminHeader';
import PatientHeader from './Patient/PatientHeader';
import Dashboard from './Admin/dashboard'; 
import Doctors from './Admin/doctors';
import Appointments from './Admin/appointments'; 
import Patients from './Admin/patients'; 
import MedicationStore from './Admin/MedicationStore';
import Prescriptions from './Admin/prescriptions';
import Payments from './Admin/payments';
import Reports from './Admin/Reports';
import Profile from './Admin/Profile'; 
import AddDoctorForm from './Admin/AddDoctorForm';
import AddPatientForm from './Admin/AddPatientForm';
import AddAppointmentForm from './Admin/AddAppointmentForm';
import AddMedicationForm from './Admin/AddMedicationForm';
import AddPaymentForm from './Admin/AddPaymentForm';
import DoctorHeader from './Doctor/DoctorHeader';
import ManageAppointment from './Doctor/ManageAppointment';
import ManagePrescription from './Doctor/ManagePrescription';
import ViewPatients from './Doctor/ViewPatients';
import DoctorDashboard from './Doctor/DoctorDashboard';
import Dprofile from './Doctor/Dprofile';
import AddPrescription from './Doctor/AddPrescription';
import PatientDashboard from './Patient/PatientDashboard';
import Pprofile from './Patient/Pprofile';
import ViewAppointment from './Patient/ViewAppointment';
import ViewDoctors from './Patient/ViewDoctors';
import ViewPayments from './Patient/ViewPayments';
import ViewPrescription from './Patient/ViewPrescription';

function App() {
  return (
    <BrowserRouter>
      {/* Conditionally render AdminHeader */}
      {['/dashboard', '/doctors', '/patients', '/appointments','/medicationstore','/prescriptions','/payments','/reports','/profile' ].includes(
        window.location.pathname
      ) && <AdminHeader />}

       {/* Conditionally render DoctorHeader */}
      {['/doctordashboard', '/manageprescription', '/viewpatients', '/manageappointment','/dprofile','/addprescription' ].includes(
        window.location.pathname
      ) && <DoctorHeader />}

       {/* Conditionally render DoctorHeader */}
       {['/patientdashboard', '/viewprescription', '/viewdoctors', '/viewappointment','/pprofile','/viewpayments' ].includes(
        window.location.pathname
      ) && <PatientHeader />}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/medicationstore" element={<MedicationStore />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adddoctorform" element={<AddDoctorForm />} />
        <Route path="/addpatientform" element={<AddPatientForm />} />
        <Route path="/addappointmentform" element={<AddAppointmentForm />} />
        <Route path="/addmedicationform" element={<AddMedicationForm />} />
        <Route path="/addpaymentform" element={<AddPaymentForm />} />
        <Route path="/manageappointment" element={<ManageAppointment />} />
        <Route path="/manageprescription" element={<ManagePrescription />} />
        <Route path="/viewpatients" element={<ViewPatients />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/dprofile" element={<Dprofile />} />
        <Route path="/addprescription" element={<AddPrescription />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/pprofile" element={<Pprofile />} />
        <Route path="/viewappointment" element={<ViewAppointment />} />
        <Route path="/viewdoctors" element={<ViewDoctors />} />
        <Route path="/viewpayments" element={<ViewPayments />} />
        <Route path="/viewprescription" element={<ViewPrescription />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
