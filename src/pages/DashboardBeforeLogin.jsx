import React from 'react';
import './DashboardBeforeLogin.css'

const DashboardBeforeLogin = ({ setShowLogin }) => {
  return (
    <div className="dashboard-before-login">
      <h1>Welcome to the DecorIT</h1>
      <p>Please log in to continue</p>
      <button onClick={() => setShowLogin(true)} className="sign-in-btn">
        Log In
      </button>
    </div>
  );
};

export default DashboardBeforeLogin;
