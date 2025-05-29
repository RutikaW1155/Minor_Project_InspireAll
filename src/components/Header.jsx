import React, { useState } from 'react';
import './Header.css';
import logo from '/loo.png'; // Replace this with your actual logo path
import GoogleTranslate from './GoogleTranslate';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="logo-section" style={{ textDecoration: 'none' }}>
        <img src={logo} alt="Logo" className="logo-icon" />
        <span className="logo-text">
          <span className="logo-inspire">Inspire</span>
          <span className="logo-all">All</span>
        </span>
      </Link>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#features">Profile</a>
        <Link to="/BusinessInfo">Business Info</Link>
        <a href="#community">Post</a>
        <a href="#schemes">Schemes</a>
      </nav>
      <div className="translate-section">
        <GoogleTranslate />
      </div>
      <Link to="/SignIn">
        <button className="signin-btn">Sign in</button>
      </Link>
      <Link to="/SignUp">
        <button className="signup-btn">Sign up</button>
      </Link>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}

export default Header;

