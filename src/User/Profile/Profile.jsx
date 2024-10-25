import React, { useState } from 'react';
import { assets } from '../../assets/assets.js';
import Footer from '../../components/Footer/Footer.jsx';
import NavBar from '../../components/NavBar/NavBar.jsx';
import './Profile.css';

const Profile = () => {
  // Set up state for each field with draft values
  const [firstName, setFirstName] = useState('Lahiru Nisal');
  const [lastName, setLastName] = useState('Wanigasooriya');
  const [displayName, setDisplayName] = useState('Lahiru Wanigasooriya');
  const [addressLine1, setAddressLine1] = useState('30/6 A,');
  const [addressLine2, setAddressLine2] = useState('Main road,');
  const [areaDistrict, setAreaDistrict] = useState('Kandy');
  const [stateProvince, setStateProvince] = useState('Central');
  const [zipCode, setZipCode] = useState('20000');
  const [email, setEmail] = useState('Lahi@gmail.com');
  const [contactNumber1, setContactNumber1] = useState('0711157220');
  const [contactNumber2, setContactNumber2] = useState('0711157220');
  const [password, setPassword] = useState('*************');

  // Function to clear input when the user clicks (focuses) on the field
  const handleFocus = (setValue) => {
    setValue('');
  };

  return (
    <div className="profile-page">
      <NavBar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img src={assets.profile} alt="profile" className="profile-image" />
            
          </div>
          <div className="icon-container">
                <i className="fa fa-trash delete-icon" title="Delete Profile"></i>
                <i className="fa fa-pencil  edit-icon" title="Edit Profile"></i> 
            </div>
          <div className="profile-welcome">
            <h2>WELCOME</h2>
            <h3>Mr. Lahiru Wanigasooriya</h3>
          </div>
        </div>
        <div className="profile-form">
          {/* Form for profile details */}
          <form>
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => handleFocus(setFirstName)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => handleFocus(setLastName)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Display Name:</label>
              <input className='input display-name-input'
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                onFocus={() => handleFocus(setDisplayName)}  // Clears when clicked
              />
            </div>
            <br></br>
            <div className="form-group">
              <label>Address Line 1:</label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                onFocus={() => handleFocus(setAddressLine1)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Address Line 2:</label>
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                onFocus={() => handleFocus(setAddressLine2)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Area/District:</label>
              <input
                type="text"
                value={areaDistrict}
                onChange={(e) => setAreaDistrict(e.target.value)}
                onFocus={() => handleFocus(setAreaDistrict)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>State/Province:</label>
              <input
                type="text"
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                onFocus={() => handleFocus(setStateProvince)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Zip Code:</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                onFocus={() => handleFocus(setZipCode)}  // Clears when clicked
              />
            </div>
            <br></br>
            <div className="form-group">
              <label>Your Email:</label>
              <input className='input display-name-input'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus(setEmail)}  // Clears when clicked
              />
            </div>
            <br></br>
            <div className="form-group">
              <label>Contact Number 1:</label>
              <input
                type="text"
                value={contactNumber1}
                onChange={(e) => setContactNumber1(e.target.value)}
                onFocus={() => handleFocus(setContactNumber1)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Contact Number 2:</label>
              <input
                type="text"
                value={contactNumber2}
                onChange={(e) => setContactNumber2(e.target.value)}
                onFocus={() => handleFocus(setContactNumber2)}  // Clears when clicked
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input className='input display-name-input'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus(setPassword)}  // Clears when clicked
              />
            </div>
            <div className="form-buttons">
              <button type="button" className="reset-btn">Reset Data</button>
              <button type="button" className="save-btn">Save Profile</button>
            </div>
          </form>
        </div>
      </div>
      <Footer className='footer inline'/>
    </div>
  );
};

export default Profile;
