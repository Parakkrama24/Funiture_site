import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import { assets } from '../../assets/assets';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const goToUserHome = () => {
        navigate('/');  // Navigates to the root/home path
    };

    return (
        <div className='Adminnavbar'>
            <div className="nav-left">
                <img className='logo' src={assets.logo_black} alt="logo" />
            </div>
            <div className="nav-right">
                <button className="home-button" onClick={goToUserHome}>
                    Go to User Home
                </button>
                <img className='profile' src={assets.profile} alt="profile" />
            </div>
        </div>
    );
};

export default AdminNavbar;