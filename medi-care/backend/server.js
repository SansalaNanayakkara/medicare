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


// Add a new route for getting patient demographics (GET /api/patient-demographics)
app.get("/api/patient-demographics", (req, res) => {
  db.query('SELECT gender, COUNT(*) as count FROM patients GROUP BY gender', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(results);
  });
});


app.put("/api/doctors/:id", (req, res) => {
  const doctorId = req.params.id;
  const { firstName, lastName, specialization, email, mobileNumber } = req.body;

  // Update the doctor's information in the 'doctors' table
  db.query(
    "UPDATE doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, mobile_number = ? WHERE user_id = ?",
    [firstName, lastName, specialization, email, mobileNumber, doctorId],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Update the user's information in the 'users' table
      db.query(
        "UPDATE users SET username = ? WHERE user_id = ?",
        [firstName, doctorId],
        (error, results) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          // Return a success message
          return res.json({ success: true, message: 'Doctor profile updated successfully' });
        }
      );
    }
  );
});

app.put("/api/doctors/:id/password", (req, res) => {
  const doctorId = req.params.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Check if the provided current password is correct
  db.query("SELECT * FROM users WHERE user_id = ?", [doctorId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    bcrypt.compare(currentPassword, results[0].password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.json({ success: false, message: 'Incorrect current password' });
      }

      // Hash the new password
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Update the user's password in the 'users' table
        db.query(
          "UPDATE users SET password = ? WHERE user_id = ?",
          [hash, doctorId],
          (error, results) => {
            if (error) {
              return res.status(500).json({ error: error.message });
            }

            // Return a success message
            return res.json({ success: true, message: 'Doctor password updated successfully' });
          }
        );
      });
    });
  });
});
// Fetch prescriptions by doctor ID
app.get('/api/prescriptions/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const query = `
    SELECT p.prescription_id, p.appointment_id, p.prescription_description, p.status
    FROM prescriptions p
    INNER JOIN appointments a ON p.appointment_id = a.appointment_id
    WHERE a.doctor_id = ?`;
  db.query(query, [doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});




// Fetch appointments by doctor ID
app.get('/api/appointments/:doctorId', (req, res) => {
  const doctorId = req.params.doctorId;
  const query = 'SELECT * FROM appointments WHERE doctor_id = ?';
  db.query(query, [doctorId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

// Fetch medication by name
app.get('/api/medications/:name', (req, res) => {
  const name = req.params.name;
  const query = 'SELECT * FROM medication_store WHERE medication_name = ?';
  db.query(query, [name], (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results[0]);
  });
});
app.post('/api/prescriptions', (req, res) => {
  const { appointment_id, status, prescription_description, prescribed_time, items } = req.body;

  // Log the received data
  console.log('Received prescription data:', req.body);

  // Perform necessary validation
  if (!appointment_id || !status || !prescription_description || !prescribed_time || !items || items.length === 0) {
      console.log('Validation failed:', { appointment_id, status, prescription_description, prescribed_time, items });
      return res.status(400).json({ error: 'Invalid input data' });
  }

  // Insert prescription into the database
  const insertPrescriptionQuery = 'INSERT INTO prescriptions (appointment_id, prescribed_time, prescription_description, status) VALUES (?, ?, ?, ?)';
  db.query(insertPrescriptionQuery, [appointment_id, prescribed_time, prescription_description, status], (err, result) => {
      if (err) {
          console.error('Error inserting prescription:', err);
          return res.status(500).json({ error: 'Failed to add prescription' });
      }

      const prescriptionId = result.insertId;

      const itemQuery = 'INSERT INTO prescription_details (prescription_id, medication_id, quantity_prescribed, dosage, frequency, duration) VALUES ?';
      const prescriptionItems = items.map(item => [prescriptionId, item.medication_id, item.quantity_prescribed, item.dosage, item.frequency, item.duration]);

      db.query(itemQuery, [prescriptionItems], (err) => {
          if (err) {
              console.error('Error inserting prescription items:', err);
              return res.status(500).json({ error: 'Failed to add prescription items' });
          }

          // Include the newly created prescription object with the prescription_id in the response
          const newPrescription = {
            prescription_id: prescriptionId,
            appointment_id: appointment_id,
            prescription_description: prescription_description,
            status: status,
            prescribed_time: prescribed_time,
          };
          res.status(201).json({ message: 'Prescription added successfully', newPrescription });
      });
  });
});





// Delete a prescription
app.delete('/api/prescriptions/:id', (req, res) => {
  const id = req.params.id;

  const deleteDetailsQuery = 'DELETE FROM prescription_details WHERE prescription_id = ?';
  db.query(deleteDetailsQuery, [id], (err) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      const deletePrescriptionQuery = 'DELETE FROM prescriptions WHERE prescription_id = ?';
      db.query(deletePrescriptionQuery, [id], (err) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ message: 'Prescription deleted successfully' });
      });
  });
});
