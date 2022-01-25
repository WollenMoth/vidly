import { Outlet, Navigate, useLocation } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = () => {
  const location = useLocation();
  return auth.getCurrentUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
