import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Generate 4-digit CAPTCHA
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(newCaptcha);
  };

  const validatePassword = (pwd) => {
    // Minimum 8 chars, at least one letter and one number
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password || !userCaptcha) {
      setErrorMessage('All fields including CAPTCHA are required.');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and include letters and numbers.');
      return;
    }

    if (userCaptcha !== captcha) {
      setErrorMessage('CAPTCHA does not match.');
      generateCaptcha();
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Successfully Signed Up');
        navigate('/SignIn');
      } else {
        const errorMsg = await response.text();
        setErrorMessage('Error: ' + errorMsg);
      }
    } catch (error) {
      setErrorMessage('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign up to Connect with Peers</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 chars, include letters & numbers"
          required
        />

        <label>CAPTCHA: <strong>{captcha}</strong></label>
        <input
          type="text"
          value={userCaptcha}
          onChange={(e) => setUserCaptcha(e.target.value)}
          placeholder="Enter CAPTCHA"
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <div className="login-link">
        <p>Already have an account? <Link to="/SignIn">Sign In</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
