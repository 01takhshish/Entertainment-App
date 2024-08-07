import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuthentication";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const Logout = () => {
    setAuth({});
    navigate("/login");
  };
  return Logout;
};
