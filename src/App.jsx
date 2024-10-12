
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate here
import UserLoginPopUp from './components/LoginPopUp/UserLoginPopUp';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import NavBar from './components/NavBar/NavBar';
import DashboardBeforeLogin from './pages/DashboardBeforeLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [userType, setUserType] = useState(null); // To track if the user is an admin or regular user
  const [showLogin, setShowLogin] = useState(false); // To control login popup visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track whether the user is logged in
  const url = "http://localhost:4000"; // URL for your backend API (if needed)

  // Function to handle logout
  const handleLogout = () => {
    setUserType(null); // Reset user type
    setIsLoggedIn(false); // Set logged-in state to false
    setShowLogin(false); // Hide the login popup
  };

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Dashboard before login */}
        <Route
          path="/"
          element={
            <>
              <NavBar
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                setShowLogin={setShowLogin}
              />
              <DashboardBeforeLogin setShowLogin={setShowLogin} />
              {showLogin && (
                <UserLoginPopUp
                  setShowLogin={setShowLogin}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                />
              )}
            </>
          }
        />

        {/* User Panel */}
        <Route
          path="/user-dashboard"
          element={
            userType === 'user' ? (
              <>
                <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                <List url={url} />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Admin Panel */}
        <Route
          path="/admin-dashboard/*"
          element={
            userType === 'admin' ? (
              <>
                <AdminNavbar />
                <div className="app-content">
                  <AdminSidebar />
                  <Routes>
                    <Route path="add" element={<Add url={url} />} />
                    <Route path="list" element={<List url={url} />} />
                    <Route path="orders" element={<Orders url={url} />} />
                  </Routes>
                </div>
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;


