import React, { useState, useEffect } from 'react';
import backgroundImage from "../Assests/background.jpg";

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch initial user data (optional)
  useEffect(() => {
    // Implement logic to fetch user data from your backend
    // and set it in the userData state
    // Example:
    // const fetchUserData = async () => {
    //   const response = await fetch('/api/user-data');
    //   const data = await response.json();
    //   setUserData(data);
    // };
    // fetchUserData();
  }, []); // Empty dependency array to run only once on component mount

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement profile update logic here
    // This might involve sending a request to your backend API
    // to update the user profile
    // Example:
    // const response = await fetch('/api/update-profile', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(userData),
    // });

    // Handle the response from the API (success or error)
  };

  return (
    
    <div
    style={{
      display: 'flex', // Use flexbox for centering
      justifyContent: 'center', // Center horizontally
      alignItems: 'center', // Center vertically
      minHeight: '100vh', 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}
  >
    <div className="profile-container">
    <div>
      {/* <h1>Admin Profile</h1> */}
      <form onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={userData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <hr />
        <h2>Change Password (Optional)</h2>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            name="currentPassword"
            value={userData.currentPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.newPassword}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Profile;
