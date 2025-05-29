import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      alert(response.data.message || "SignIn successful");
      navigate('/', { replace: true });
    } catch (error) {
      alert('Error logging in: ' + error.response?.data || 'Please try again');
    }
  };

  return (
    <div className="SignIn-page">
      <h1>Sign in to Continue Your Learning Journey</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Log In</button>
      </form>

      <div className="signup-redirect">
        <p>
          Don't have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/SignUp')}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
