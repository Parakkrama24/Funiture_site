import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import './NavBar.css';

const NavBar = ({ setShowLogin, isLoggedIn, handleLogout }) => {
  const [menu, setMenu] = useState("home");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      handleLogout(); // Sign Out
    } else {
      setShowLogin(true); // Open login modal
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    console.log("Sign Out");
    // Your sign-out logic here
    setShowDropdown(false); // Close dropdown after sign-out
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='navbar'>
      <img src={assets.logo_black} alt="logo" className="logo" />
      <ul className='navbar-menu'>
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}><Link to="/">Home</Link></li>
        <li onClick={() => setMenu("category")} className={menu === "category" ? "active" : ""}><Link to="/category">Category</Link></li>
        <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}><Link to="/mobile-app">Mobile App</Link></li>
        <li onClick={() => setMenu("about-us")} className={menu === "about-us" ? "active" : ""}><Link to="/about-us">About Us</Link></li>
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

        <button onClick={handleButtonClick}>
          {isLoggedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </div>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="profile-dropdown" ref={dropdownRef}>
          <ul>
            <li><Link to="/profile" onClick={() => setShowDropdown(false)}>Edit Profile</Link></li>
            <li><Link to="/orders" onClick={() => setShowDropdown(false)}>My Orders</Link></li>
            <li><Link to="/report-issue" onClick={() => setShowDropdown(false)}>Report an Issue</Link></li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
