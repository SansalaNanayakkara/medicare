import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function AdminHeader() {
  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/patients', label: 'Patients' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/medicationstore', label: 'Medication Store' },
    { path: '/prescriptions', label: 'Prescriptions' },
    { path: '/payments', label: 'Payments' },
    { path: '/reports', label: 'Reports' },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic (e.g., remove user session data)
    navigate('/'); // Redirect to home page after logout
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to profile page on click
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
            <NavDropdown title="Admin" id="admin-dropdown">
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

export default AdminHeader;
