
// File: src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth');
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
