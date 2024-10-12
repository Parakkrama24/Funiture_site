import React, { useState } from 'react';
import './NavBar.css'; 
import { assets } from '../../assets/assets.js';

const NavBar = ({ setShowLogin, isLoggedIn, handleLogout }) => {
  const [menu, setMenu] = useState("home");

  const handleButtonClick = () => {
    if (isLoggedIn) {
      handleLogout(); // Sign Out
    } else {
      setShowLogin(true); // Open login modal
    }
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
    </div>
  );
}

export default NavBar;
