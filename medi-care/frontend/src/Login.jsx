import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Container, Row, Col, Button } from 'react-bootstrap';
import backgroundImage from "./Assests/background.jpg";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the entered username and password match the hardcoded admin credentials
    if (username === 'admin' && password === '1234') {
      // Set the token and user type in local storage
      localStorage.setItem('token', 'admin_token');
      localStorage.setItem('user_type', 'Admin');

      // Navigate to the admin dashboard
      navigate('/dashboard');
    } else {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          username,
          password,
        });

        if (response.data.success) {
          // Store the token in local storage
          localStorage.setItem('token', response.data.token);

          // Navigate to the appropriate dashboard based on user type
          if (response.data.user.user_type === 'Admin') {
            navigate('/dashboard');
          } else if (response.data.user.user_type === 'Doctor') {
            navigate('/doctordashboard');
          } else if (response.data.user.user_type === 'Patient') {
            navigate('/patientdashboard');
          }
        } else {
          setError('Invalid credentials');
        }
      } catch (error) {
        console.error('Error during login:', error);
        setError('An error occurred during login. Please try again later.');
      }
    }
  };

  const handleClose = () => {
    navigate('/'); // Redirect to homepage on close button click
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '115vh',
      }}
    >
      <Container className="bg-light p-5" style={{ maxWidth: '500px' }}>
        <Container fluid style={{ display: 'flex', justifyContent: 'center' }}>
          <Row className="justify-content-center align-items-center vh-100" style={{ width: '100%' }}>
            <Col xs={12} md={6}>
              <div>
                <h2>Login</h2>
                {error && <div className="text-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name:</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="d-grid gap-2">
                    <Button type="submit" variant="info">Login</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </div>
                </form>
                <div className="mt-3">
                  <Button variant="link" onClick={() => console.log('Forgot Password?')}>Forgot Password?</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Login;
