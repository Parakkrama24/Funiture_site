//change this to app.jsx(no need complete admin page) so this is no need file upto now

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import Add from '../Add/Add';
import List from '../List/List';
import Orders from '../Orders/Orders';
import './CompleteAdminPage.css'; 

const CompleteAdminPage = ({ url }) => {
  return (
    <div className="admin-page">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CompleteAdminPage;