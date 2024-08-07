import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Hooks/useAuthentication";

// This code is for mandating authentication for the routes. If there's no user access token found, they'll be redirected to the login page.

export const Auth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};
