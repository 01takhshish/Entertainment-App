import * as Yup from "yup";
export const ValidationRegisteration = Yup.object({
  email: Yup.string().email("Email is Not Valid").required("Cannot be empty"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,32}$/,
      `Password must contain minimum 8 and maximum 32 Characters,
    One Uppercase,
    One Lowercase, One Number
    and One Special Character
    `
    )
    .required("Cannot be empty"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Cannot be empty"),
});
