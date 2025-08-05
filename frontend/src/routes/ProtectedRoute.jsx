// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are allowed and user doesn't have one
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // or a custom <Forbidden /> page
  }

  return children;
};

export default ProtectedRoute;
