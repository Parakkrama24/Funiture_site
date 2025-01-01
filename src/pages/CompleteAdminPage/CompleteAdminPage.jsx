// src/pages/CompleteAdminPage/CompleteAdminPage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import Add from '../Add/Add';
import List from '../List/List';
import Orders from '../Orders/Orders';

const SampleAdminPage = ({ url }) => { // Accept `url` as a prop
  return (
    <div>
      <AdminNavbar />
      <div className="app-content">
        <AdminSidebar />
        <Routes>
          <Route path="add" element={<Add url={url} />} />
          <Route path="list" element={<List url={url} />} />
          <Route path="orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default SampleAdminPage;
