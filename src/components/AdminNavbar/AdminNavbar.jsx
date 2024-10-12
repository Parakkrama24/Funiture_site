import React from 'react'
import './AdminNavbar.css'
import {assets} from '../../assets/assets'

const AdminNavbar = () => {
    return (
        <div className='Adminnavbar'>
            <img className='logo' src={assets.logo_black} alt="logo" />
            <img className='profile' src={assets.profile} alt="profile" />
        </div>
    )
}

export default AdminNavbar