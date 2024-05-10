const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateUser = require("./authMiddleware");

const app = express();
const port = 5000;

// Connect to database
const {db} = require("./db");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Generate a JSON Web Token (JWT) for authentication
function generateToken(user) {
  const payload = {
    user_id: user.user_id,
    user_type: user.user_type
  };
  const secret = "your_jwt_secret_here";
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
}

// Routes
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Insert the user into the Users table
    db.query(
      "INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)",
      [username, hash, 'Patient'],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        // Get the ID of the newly inserted user
        const user_id = results.insertId;

        // If the user is a patient, insert them into the Patients table
        db.query(
          "INSERT INTO patients (user_id) VALUES (?)",
          [user_id],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: "Error from patient insertion" });
            }

            // Generate a token for the new user
            const token = generateToken({ user_id, user_type: 'Patient' });

            // Return the token to the client
            return res.json({ success: true, token });
          }
        );
      }
    );
  });
});

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the Users table to check if the provided username and password match any user in the table
  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error || results.length === 0) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Check if the password is correct
    bcrypt.compare(password, results[0].password, (err, isMatch) => {
      console.log(password);
      console.log(results[0].password);
      if (err || !isMatch) {
        return res.json({ success: false, message: 'Invalid credentials' });
      }

      // If the password is correct, generate a token and return it to the client
      const user = {
        user_id: results[0].user_id,
        user_type: results[0].user_type
      };

      const token = generateToken(user);

      res.json({ success: true, token, user });
    });
  });
});

// Protected route example
app.get('/dashboard', authenticateUser('Admin'), (req, res) => {
  // Handle the request
  res.send('Welcome to the admin dashboard!');
});

// Add a new route for adding a doctor (POST /api/doctors)
app.post("/api/adddoctors", (req, res) => {
  const { firstName, lastName, specialization, email, password, mobileNumber } = req.body;
  console.log(req.body);
  if(!firstName){
    console.log('Empty data');
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Insert the user into the Users table
    db.query(
      "INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)",
      [ firstName,  hash, 'Doctor'],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        // Get the ID of the newly inserted user
        const user_id = results.insertId;
        console.log(user_id);

        // Insert the doctor into the Doctors table
        db.query(
          "INSERT INTO doctors (first_name,last_name, specialization,email,password,mobile_number,user_id) VALUES (?, ?,?,?,?,?,?)",
          [firstName,lastName,specialization,email,password,mobileNumber,user_id],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            const token = generateToken({ user_id, user_type: 'Doctor' });

            // Return the token to the client
            return res.json({ success: true, token });

            // Return a success message
            return res.json({ success: true, message: 'Doctor added successfully' });
          }
        );
      }
    );
  });
});

// Add a new route for retrieving the doctor list (GET /api/doctors)
app.get("/api/doctors", (req, res) => {
  // Retrieve the doctor list from the database
  db.query('SELECT * FROM users INNER JOIN doctors ON users.user_id = doctors.user_id', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Return the doctor list
    return res.json(results);
  });
});



// Add a new route for adding a doctor (POST /api/doctors)
app.post("/api/addpatients", (req, res) => {
  const { firstName, lastName, address, email, password, mobileNumber,gender,dateOfBirth, bloodGroup } = req.body;
  console.log(req.body);
  if(!firstName){
    console.log('Empty data');
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Insert the user into the Users table
    db.query(
      "INSERT INTO users (username, password, user_type) VALUES (?, ?, ?)",
      [ firstName,  hash, 'Patient'],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        // Get the ID of the newly inserted user
        const user_id = results.insertId;
        console.log(user_id);

        // Insert the doctor into the Doctors table
        db.query(
          "INSERT INTO patients (first_name,last_name,email,password,address,mobile_number,dob,gender,blood_group,user_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
          [firstName,lastName,email,password,address,mobileNumber,dateOfBirth,gender,bloodGroup,user_id],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            const token = generateToken({ user_id, user_type: 'Patient' });

            // Return the token to the client
            return res.json({ success: true, token });

            // Return a success message
            return res.json({ success: true, message: 'Patient added successfully' });
          }
        );
      }
    );
  });
});

// Add a new route for retrieving the doctor list (GET /api/doctors)
app.get("/api/patients", (req, res) => {
  // Retrieve the doctor list from the database
  db.query('SELECT * FROM users INNER JOIN patients ON users.user_id = patients.user_id', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Return the doctor list
    return res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Add a new route for adding an appointment (POST /api/appointments)
app.post("/api/addappointments", (req, res) => {
  const { doctorId, patientId, date, time, reason} = req.body;
  console.log(req.body);
  if(!doctorId){
    console.log('Empty data');
  }

        // Insert the doctor into the appointments table
        db.query(
          "INSERT INTO appointments (doctor_id,patient_id,appointment_date,appointment_time,description) VALUES (?, ?,?,?,?)",
          [doctorId,patientId,date,time,reason],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            // Return the token to the client
            return res.json({ success: true});

            // Return a success message
            return res.json({ success: true, message: 'Appointment added successfully' });
          }
        );
      });

// Add a new route for retrieving the appointment list (GET /api/appointments)
app.get("/api/appointments", (req, res) => {
  // Retrieve the appointmnet list from the database
  db.query('SELECT * FROM appointments ', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    

    return res.json(results);
  });
});

app.get("/api/doctor-appointments", (req, res) => {
  const doctorId = req.query.doctorId;

  let query;
  if (doctorId) {
    query = `
      SELECT appointments.*
      FROM appointments
      WHERE appointments.doctor_id = ${doctorId}
    `;
  } else {
    query = `SELECT * FROM appointments`;
  }

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(results);
  });
});


// Add a new route for adding medications (POST /api/appointments)
app.post("/api/addmedications", (req, res) => {
  const { medicationName, manufactureDate, expireDate, quantityAvailable, pricePerUnit} = req.body;
  console.log(req.body);
  if(!medicationName){
    console.log('Empty data');
  }

        // Insert the doctor into the medications table
        db.query(
          "INSERT INTO medication_store (medication_name,manufacture_date,expire_date,quantity_available,price_per_unit) VALUES (?,?,?,?,?)",
          [medicationName, manufactureDate, expireDate, quantityAvailable, pricePerUnit],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            // Return the token to the client
            return res.json({ success: true});

            // Return a success message
            return res.json({ success: true, message: 'Medication added successfully' });
          }
        );
      });

// Add a new route for retrieving the appointment list (GET /api/appointments)
app.get("/api/medications", (req, res) => {
  // Retrieve the medication list from the database
  db.query('SELECT * FROM medication_store ', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    

    return res.json(results);
  });
});


// Add a new route for adding medications (POST /api/appointments)
app.post("/api/addpayments", (req, res) => {
  const { appointmentId, totalAmount,paymentMethod,date,time,description} = req.body;
  console.log(req.body);
  if(!appointmentId){
    console.log('Empty data');
  }

        // Insert the doctor into the medications table
        db.query(
          "INSERT INTO payments (appointment_id,total_amount,payment_method,payment_date,payment_time,payment_description) VALUES (?,?,?,?,?,?)",
          [appointmentId, totalAmount,paymentMethod,date,time,description],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            // Return the token to the client
            return res.json({ success: true});

            // Return a success message
            return res.json({ success: true, message: 'Payment added successfully' });
          }
        );
      });

// Add a new route for retrieving the appointment list (GET /api/appointments)
app.get("/api/payments", (req, res) => {
  // Retrieve the medication list from the database
  db.query('SELECT * FROM payments ', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    

    return res.json(results);
  });
});

app.get("/api/patient-payments", (req, res) => {
  const patientId = req.query.patientId;

  let query;
  if (patientId) {
    query = `
      SELECT payments.*
      FROM payments
      INNER JOIN appointments ON payments.appointment_id = appointments.id
      WHERE appointments.patient_id = ${patientId}
    `;
  } else {
    query = `SELECT * FROM payments`;
  }

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(results);
  });
});




app.post("/api/addprescription", (req, res) => {
  const { appointmentId, prescribedTime, status } = req.body;

  // You may want to format the prescribedTime according to your needs
  // For example, using a library like moment.js or day.js
  // const formattedPrescribedTime = moment(prescribedTime).format('YYYY-MM-DD HH:mm:ss');

  db.query("INSERT INTO prescriptions (appointment_id, prescribed_time, status) VALUES (?, ?, ?)", [appointmentId, prescribedTime, status], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json({ success: true, prescription_id: results.insertId });
  });
});


app.post("/api/addprescriptiondetails", (req, res) => {
  const { prescriptionId, medicationId, quantityPrescribed, dosage, frequency, duration, description } = req.body;

  db.query(
    "INSERT INTO prescription_details (prescription_id, medication_id, quantity_prescribed, dosage, frequency, duration, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [prescriptionId, medicationId, quantityPrescribed, dosage, frequency, duration, description],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json({ success: true });
    }
  );
});

app.get("/api/prescriptions", (req, res) => {
  db.query("SELECT * FROM prescriptions", (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(results);
  });
});

app.get("/api/patientprescriptions/:id", (req, res) => {
  const patientId = req.params.id;

  db.query(
    "SELECT prescriptions.*, prescription_details.* FROM prescriptions JOIN prescription_details ON prescriptions.id = prescription_details.prescription_id JOIN appointments ON prescriptions.appointment_id = appointments.id WHERE appointments.patient_id = ?",
    [patientId],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.json(results);
    }
  );
});


// Add a new route for getting patient demographics (GET /api/patient-demographics)
app.get("/api/patient-demographics", (req, res) => {
  db.query('SELECT gender, COUNT(*) as count FROM patients GROUP BY gender', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(results);
  });
});

// Add a new route for getting appointment counts (GET /api/appointment-counts)
app.get("/api/appointment-counts", (req, res) => {
  const dateRange = req.query.dateRange || 'month';
  let query;

  if (dateRange === 'day') {
    query = 'SELECT DATE(appointment_date) as date, COUNT(*) as count FROM appointments GROUP BY date';
  } else if (dateRange === 'week') {
    query = 'SELECT WEEK(appointment_date) as week, COUNT(*) as count FROM appointments GROUP BY week';
  } else {
    query = 'SELECT MONTH(appointment_date) as month, COUNT(*) as count FROM appointments GROUP BY month';
  }

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(results);
  });
});

// // Add a new route for getting payment amounts (GET /api/payment-amounts)
// app.get("/api/payment-amounts", (req, res) => {
//   const dateRange = req.query.dateRange || 'month';
//   let query;

//   if (dateRange === 'day') {
//     query = 'SELECT DATE(payment_date) as date, SUM(total_amount) as total FROM payments GROUP BY date';
//   } else if (dateRange === 'week') {
//     query = 'SELECT WEEK(payment_date) as week, SUM(total_amount) as total FROM payments GROUP BY week';
//   } else {
//     query = 'SELECT MONTH(payment_date) as month, SUM(total_amount) as total FROM payments GROUP BY month';
//   }

//   db.query(query, (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.json(results);
//   });
// });

// // Add a new route for getting the number of patients per doctor (GET /api/doctor-patients)
// app.get("/api/doctor-patients", (req, res) => {
//   db.query('SELECT d.first_name, d.last_name, COUNT(a.patient_id) as count FROM doctors d LEFT JOIN appointments a ON d.doctor_id = a.doctor_id GROUP BY d.doctor_id', (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.json(results);
//   });
// });

// // Add a new route for getting medication distribution (GET /api/medication-distribution)
// app.get("/api/medication-distribution", (req, res) => {
//   db.query('SELECT medication_name, COUNT(*) as count FROM prescription_details GROUP BY medication_id', (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     }

//     return res.json(results);
//   });
// });