import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import backgroundImage from "./Assests/background.jpg";
import { validateEmail, validateName } from "./validation";
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('Patient');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();
  const formRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Signup form submitted');

    if (!validateName(firstName)) {
      alert('Please enter a valid first name');
      return;
    }

    if (!validateName(lastName)) {
      alert('Please enter a valid last name');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        first_name: firstName,
        last_name: lastName,
        mobile,
        email,
        password,
        user_type: userType,
        username,
      });

      if (response.data.success) {
        alert('Sign up successful');
        navigate('/login');
      } else {
        alert('Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '120vh',
      }}
    >
      <Container className="bg-light p-5" style={{ maxWidth: '500px' }}>
        <h2 className="text-center">Sign Up</h2>
        <Container className="d-flex flex-column justify-content-center align-items-center">
          <Row className="mt-2" style={{ width: '80%' }}>
            <Col className="mt-2">
              <strong>
                <p className="mb-2">Create an account to continue</p>
              </strong>
              <Form ref={formRef} onSubmit={handleSignUp}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    id="mobile"
                    type="text"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formReEnterPassword">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formUserType">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    id="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <div className="text-center mt-4">
                  <Button variant="info" type="submit" className="mr-2 w-50">
                    Sign Up
                  </Button>
                </div>
                <div className="text-center mt-4">
                  <Button variant="secondary" type="cancel" className="mr-2 w-50">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default SignUp;
