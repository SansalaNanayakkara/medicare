import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function DoctorHeader() {
  const links = [
    { path: '/doctordashboard', label: 'Dashboard' },
    { path: '/manageappointment', label: 'Appointments' },
    { path: '/viewpatients', label: 'Patients' },
    { path: '/prescriptionlist', label: 'Prescriptions' },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic (e.g., remove user session data)
    navigate('/'); // Redirect to home page after logout
  };

  const handleProfileClick = () => {
    navigate('/dprofile'); // Redirect to profile page on click
  };

  return (
    <Navbar bg="info" expand="lg">
      <Container>
        <Navbar.Brand href="#home">MEDI-CARE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((link) => (
              <Nav.Link as={Link} key={link.path} to={link.path}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <NavDropdown title="Doctor" id="doctor-dropdown">
              <NavDropdown.Item onClick={handleProfileClick}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DoctorHeader;
