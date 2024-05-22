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
import AdminPrescriptionList from './Admin/AdminPrescriptionList';
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
import PrescriptionList from './Doctor/PrescriptionList';
import ViewPatients from './Doctor/ViewPatients';
import DoctorDashboard from './Doctor/DoctorDashboard';
import Dprofile from './Doctor/Dprofile';
import AddPrescription from './Doctor/AddPrescription';
import PatientDashboard from './Patient/PatientDashboard';
import Pprofile from './Patient/Pprofile';
import ViewAppointment from './Patient/ViewAppointmentList';
import ViewDoctors from './Patient/ViewDoctors';
import ViewPayments from './Patient/ViewPayments';
 import PatientPrescriptions from './Patient/PatientPrescriptions';
// import PrescriptionDetails from './components/PrescriptionDetails';
import ViewAppointmentList from './Patient/ViewAppointmentList';
import AddAppointmentFormP from './Patient/AddAppointmentFormP';
import Pappointments from './Patient/Pappointments';

function App() {
  return (
    <BrowserRouter>
      {/* Conditionally render AdminHeader */}
      {['/dashboard', '/doctors', '/patients', '/appointments','/medicationstore','/adminprescriptionlist','/payments','/reports','/profile' ].includes(
        window.location.pathname
      ) && <AdminHeader />}

       {/* Conditionally render DoctorHeader */}
      {['/doctordashboard', '/manageprescription', '/viewpatients', '/manageappointment','/dprofile','/prescriptionlist'].includes(
        window.location.pathname
      ) && <DoctorHeader />}

       {/* Conditionally render PatientHeader */}
       {['/patientdashboard', '/viewprescription', '/viewdoctors', '/viewappointmentlist','/pprofile','/viewpayments','/patientprescriptions' ].includes(
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
        <Route path="/adminprescriptionlist" element={<AdminPrescriptionList />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/adddoctorform" element={<AddDoctorForm />} />
        <Route path="/addpatientform" element={<AddPatientForm />} />
        <Route path="/addappointmentform" element={<AddAppointmentForm />} />
        <Route path="/addmedicationform" element={<AddMedicationForm />} />
        <Route path="/addpaymentform" element={<AddPaymentForm />} />
        <Route path="/manageappointment" element={<ManageAppointment />} />
        <Route path="/prescriptionlist" element={<PrescriptionList />} />
        <Route path="/viewpatients" element={<ViewPatients />} />
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/dprofile" element={<Dprofile />} />
        <Route path="/addprescription" element={<AddPrescription />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/pprofile" element={<Pprofile />} />
        <Route path="/viewappointment" element={<ViewAppointment />} />
        <Route path="/viewdoctors" element={<ViewDoctors />} />
        <Route path="/viewpayments" element={<ViewPayments />} />
        <Route path="/patientprescriptions" element={<PatientPrescriptions />} />
        {/* <Route path="/prescriptiondetails" element={<PrescriptionDetails />} /> */}
        <Route path="/viewappointmentlist" element={<ViewAppointmentList />} />
        <Route path="/addappointmentformp" element={<AddAppointmentFormP />} />
        <Route path="/addappointmentformp" element={<AddAppointmentFormP />} />
        <Route path="/pappointments" element={<Pappointments />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
