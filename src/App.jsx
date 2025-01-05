import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import Footer from './components/Footer/Footer';
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
import Profile from './User/Profile/Profile';

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

<Route
          path="/cart"
          element={
            <>
              <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              <Cart />
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

        {/* Admin Dashboard */}
        <Route
          path="/admin/*"
          element={
            userType === 'admin' ? (
              <div className="admin-page">
                {/* Admin Navbar */}
                <AdminNavbar />

                <div className="admin-content">
                  {/* Admin Sidebar */}
                  <AdminSidebar />

                  <div className="main-content">
                    <Routes>
                      {/* Default to Add Page */}
                      <Route path="/" element={<Navigate to="add" replace />} />
                      {/* Add Route */}
                      <Route path="add" element={<Add />} />
                      {/* List Route */}
                      <Route path="list" element={<List />} />
                      {/* Orders Route */}
                      <Route path="orders" element={<Orders />} />
                    </Routes>
                  </div>
                </div>
              </div>
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
