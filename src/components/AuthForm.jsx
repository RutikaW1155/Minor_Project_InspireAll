import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const AuthForm = ({ type }) => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [captcha, setCaptcha] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captcha) return setMessage('Please verify you are human!');

    try {
      const url = `http://localhost:5000/api/auth/${type}`;
      const { data } = await axios.post(url, form);
      setMessage(data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="auth-form p-6 bg-white shadow-2xl rounded-2xl w-96 mx-auto mt-20">
      <h2 className="text-xl font-bold text-center text-purple-600">{type === 'signup' ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {type === 'signup' && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-2 border rounded"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded"
          onChange={handleChange}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 8+ characters"
          required
        />
        <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" onChange={() => setCaptcha(true)} />
        <button type="submit" className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition">
          {type === 'signup' ? 'Register' : 'Login'}
        </button>
      </form>
      <p className="text-center mt-2 text-sm text-gray-600">{message}</p>
    </div>
  );
};

export default AuthForm;
