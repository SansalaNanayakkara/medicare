const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medicare'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Function to insert a new user into the users table
const insertUser = (userName, password, userType, firstName, lastName, mobile, email, callback) => {
  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Insert the user into the users table
  const query = `
    INSERT INTO users (username, password, user_type, first_name, last_name, mobile, email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [userName, hashedPassword, userType, firstName, lastName, mobile, email], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return callback(err);
    }
    console.log('User inserted successfully');
    return callback(null, result);
  });
};


//db added

// Function to retrieve a user from the users table by username
const getUserByUsername = (userName, callback) => {
  const query = `
    SELECT * FROM users
    WHERE username = ?
  `;
  db.query(query, [userName], (err, results) => {
    if (err) {
      console.error('Error retrieving user:', err);
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};

// Function to handle user login
const login = (userName, password, callback) => {
  getUserByUsername(userName, (err, user) => {
    if (err) {
      console.error('Error retrieving user:', err);
      return callback(err);
    }
    if (!user) {
      return callback(null, false);
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return callback(null, false);
    }
    return callback(null, user);
  });
};

module.exports = {
  db,
  insertUser,
  login,
  getUserByUsername
};
