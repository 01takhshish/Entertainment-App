import * as Yup from "yup";
export const ValidationLogin = Yup.object({
  email: Yup.string().email("Email is Not Valid").required("Cannot be empty"),
  password: Yup.string().required("Cannot be empty"),
});
