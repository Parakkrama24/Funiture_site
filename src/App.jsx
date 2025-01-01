import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import Footer from './components/Footer/Footer';
import UserLoginPopUp from './components/LoginPopUp/UserLoginPopUp';
import NavBar from './components/NavBar/NavBar';
import AboutUs from './pages/AboutUs/AboutUs';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import Mobileapp from './pages/Mobileapp/Mobileapp';
import Profile from './User/Profile/Profile';
import SampleAdminPage from './pages/CompleteAdminPage/CompleteAdminPage'; // New Admin Page

const App = () => {
  const [userType, setUserType] = useState(null); // Track if the user is an admin or regular user
  const [showLogin, setShowLogin] = useState(false); // Control login popup visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

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
        {/* Login Page */}
        <Route
          path="/"
          element={
            <>
              <NavBar
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                setShowLogin={setShowLogin}
              />
              {showLogin && (
                <UserLoginPopUp
                  setShowLogin={setShowLogin}
                  setIsLoggedIn={setIsLoggedIn}
                  setUserType={setUserType}
                />
              )}
              <Home />
            </>
          }
        />

        {/* Category Page */}
        <Route
          path="/category"
          element={
            <>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              <Category />
            </>
          }
        />

        {/* Mobile App Page */}
        <Route
          path="/mobile-app"
          element={
            <>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              <Mobileapp />
            </>
          }
        />

        {/* About Us Page */}
        <Route
          path="/about-us"
          element={
            <>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              <AboutUs />
            </>
          }
        />

        {/* Profile Page (Accessible to both User and Admin) */}
        <Route
          path="/profile"
          element={
            <>
              <NavBar isLoggedIn={true} handleLogout={handleLogout} />
              <Profile />
            </>
          }
        />

        {/* Admin Dashboard Redirect to Sample Page */}
        <Route
          path="/admin-dashboard"
          element={
            userType === 'admin' ? ( // Use comparison operator
              <>
                <SampleAdminPage /> {/* Admin Sample Page */}
              </>
            ) : (
              <Navigate to="/" /> // Redirect non-admin users
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
