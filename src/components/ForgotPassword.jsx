
// File: src/components/ForgotPassword.jsx
import { useState } from 'react';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Forgot Password</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        <button type="submit">Reset Password</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default ForgotPassword;
