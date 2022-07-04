import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/userContext";

export const PrivateRoute = () => {
  const { user } = useAuth();
  return user?.token ? <Outlet /> : <Navigate to="/login" />;
};
