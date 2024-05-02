import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import backgroundImage from "./Assests/background.jpg"; 
import Navbar from './components/Navbar'


const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >

        <Container fluid>
          <Row className="justify-content-center align-items-center vh-100">
            <Col xs={12} md={6} className="text-center">
              <div>
                <h1>MEDICARE</h1>
                <p>Caring for life leading the way in medical excellence with us.</p>
                {/* <button className="btn btn-info" onClick={handleLoginClick}>Login</button>
                <button className="btn btn-secondary" onClick={handleSignupClick}>Signup</button> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
