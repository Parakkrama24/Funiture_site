import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import Footer from './components/Footer/Footer'; // Footer import uncommented
import UserLoginPopUp from './components/LoginPopUp/UserLoginPopUp';
import NavBar from './components/NavBar/NavBar';
import AboutUs from './pages/AboutUs/AboutUs';
import Add from './pages/Add/Add';
import Cart from './pages/Cart/Cart';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import List from './pages/List/List';
import Mobileapp from './pages/Mobileapp/Mobileapp';
import Orders from './pages/Orders/Orders';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Profile from './User/Profile/Profile';

const App = () => {
  const [userType, setUserType] = useState(null); // Track if the user is an admin or regular user
  const [showLogin, setShowLogin] = useState(false); // Control login popup visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const url = "http://localhost:4000"; // Backend API URL

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

   
        <Route path="/order" element={<PlaceOrder />} />


        {/* Profile Page (Accessible to both User and Admin) */}
        <Route
          path="/profile"
          element={
            <>
              <NavBar isLoggedIn={true} handleLogout={handleLogout} /> {/* Bypass and set `isLoggedIn` to true */}
              <Profile /> {/* Profile component */}
            </>
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

        {/* Profile Page (Accessible to both User and Admin) */}
        <Route
          path="/cart"
          element={
            !isLoggedIn ? (
              <>
                <NavBar isLoggedIn={true} handleLogout={handleLogout} />
                <Cart />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

      </Routes>

      <Footer />

    </div>
  );
};

export default App;
