import { useContext } from "react";

import { AuthenticationContext } from "../Context/AuthenticationProvider";

// A straightforward method to adhere to the DRY (Don't Repeat Yourself) principle by sidestepping the need to import both useContext and AuthContext in every component.

const useAuth = () => {
  return useContext(AuthenticationContext);
};

export { useAuth };
