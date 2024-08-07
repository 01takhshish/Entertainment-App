import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});
const AuthenticationProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthenticationContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
