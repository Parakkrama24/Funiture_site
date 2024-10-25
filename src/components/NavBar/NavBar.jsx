// import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import './NavBar.css';

const NavBar = ({ setShowLogin, isLoggedIn, handleLogout }) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [handleLogout, setHandleLogout] = useState(false);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      handleLogout(); // Sign Out
    } else {
      setShowLogin(true); // Open login modal
    }
  };
  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
    console.log(showDropdown);
  };
  const handleSignOut = () => {
    console.log("Sign Out");
    // Add your sign-out logic here, like clearing tokens or user data
  };

  return (
    <div className='navbar'>
      <img src={assets.logo_black} alt="logo" className="logo" />
      <ul className='navbar-menu'>
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
        <li onClick={() => setMenu("catagory")} className={menu === "catagory" ? "active" : ""}>Category</li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li>
        <li onClick={() => setMenu("about-us")} className={menu === "about-us" ? "active" : ""}>About Us</li>
      </ul>

      <div className='navbar-right'>
        <div className='profile-image-container' onClick={handleProfileClick}>
          <img src={assets.profile} alt="profile" className="profile-image" />
        </div>
        <img src={assets.search} alt="search" className="search" />
        <div className='navbar-search-icon'>
          <img src={assets.cart} alt="cart" className="cart" />
          <div className='dot'></div>
        </div>

        {/* Conditionally render Sign In / Sign Out button */}
        <button onClick={handleButtonClick}>
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </div>
      {/* Dropdown menu */}
      {showDropdown && (
          <div className="profile-dropdown">
            <ul>
              <li><Link to="/profile">Edit Profile</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/report-issue">Report an Issue</Link></li>
              <li onClick={handleSignOut}>Sign Out</li>
              <li>
              {/* <button onClick={toggleTheme} className='theme-toggle-button'>
                {currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                <FontAwesomeIcon
                  icon={currentTheme === 'dark' ? faSun : faMoon}
                  style={{ marginLeft: '8px' }}
                />
              </button> */}
            </li>
            </ul>
          </div>
        )}
    </div>
  );
}

export default NavBar;
