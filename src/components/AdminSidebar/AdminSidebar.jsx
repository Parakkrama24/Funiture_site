import React from 'react'
import './AdminSidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
    return (
      <div className='Adminsidebar'>
          <div className='Adminsidebar-options'>
              <NavLink to={'/admin-dashboard/add'} className='Adminsidebar-option'>
                  <img className='Adminsidebar-icon' src={assets.add} alt='add' />
                  <p>Add Items</p>
              </NavLink>
              <NavLink to={'/admin-dashboard/list'} className='Adminsidebar-option'>
                  <img className='Adminsidebar-icon' src={assets.task} alt='task' />
                  <p>List Items</p>
              </NavLink>
              <NavLink to={'/admin-dashboard/orders'} className='Adminsidebar-option'>
                  <img className='Adminsidebar-icon' src={assets.package1} alt='package' />
                  <p>Orders</p>
              </NavLink>
          </div>
      </div>
    );
  }
  
export default AdminSidebar