import React from 'react';
import './Footer.css';
import { FaStarOfLife } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <div className="footer-logo">
            <FaStarOfLife className="logo-icon" />
            <span className="logo-text">InspireAll</span>
          </div>
          <p className="footer-description">
            Empowering rural entrepreneurs through technology.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Profile</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Marketplace</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <ul>
            <li>Call: 1800-INSPIRE</li>
            <li>SMS: INSPIRE to 56789</li>
            <li>Email: help@inspireall.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 InspireAll. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
