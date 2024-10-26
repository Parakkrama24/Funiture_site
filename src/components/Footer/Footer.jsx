import React from 'react';
import { assets } from '../../assets/assets.js';
import './Footer.css';



const Footer = ({className }) => {
  return (
    <footer className={`footer ${className}`}>      
    <div className="footer-container">
        <div className="logo">
        <img src={assets.logo_black} alt="logo" className="logo" />
        </div>

        <div className="footer-section content">
          <h3>Content</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Mobile App</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>+94 816 672 827</p>
          <p><a href="mailto:decorit@gmail.com">decorit@gmail.com</a></p>
        </div>

        <div className="footer-section social">
          <h3>Find Us Here</h3>
          <p>You can contact us via,</p>
          <div className="social-icons">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Created By DecorIT | All Rights Reserved!</p>
      </div>
    </footer>
  );
};

export default Footer;
