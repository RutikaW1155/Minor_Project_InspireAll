// File: src/router.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/main" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
    </Routes>
  </Router>
);

export default AppRouter;