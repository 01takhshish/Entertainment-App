import { useFormik } from "formik";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../Features/ApiCall";
import { useAuth } from "../Hooks/useAuthentication";
import { ValidationLogin } from "../Features/ValidationLogin";
import { Errors } from "../Components/Erros";
import logo from "../images/logo.svg";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        contact: "",
        password: "",
      },
      onSubmit: async (values, { resetForm }) => {
        try {
          const response = await axios.post(
            "/signin",
            JSON.stringify(values),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          if (response.data.success) {
            toast.success(`Logged in as ${values.contact}`);
            setAuth({
              accessToken: response.data.accessToken,
              contact: values.contact.toLowerCase(),
            });
            resetForm({ values: { contact: "", password: "" } });

            navigate(from, { replace: true });
          }
        } catch (err) {
          // if error occurs
          const errorMessage = err.response.data.message;
          toast.error(errorMessage);

          if (errorMessage.search(/contact/gi) !== -1) {
            resetForm({ values: { contact: "", password: "" } });
          } else if (errorMessage.search(/password/gi) !== -1) {
            resetForm({ values: { ...values, password: "" } });
          }
          // resetForm({ values: { contact: "", password: "" } });

          // navigate(from, { replace: true });
        }
      },
      validationSchema: ValidationLogin,
    });
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-20 ">
      <img src={logo} alt="logo" className="h-10 w-12" />
      <div className="w-72 rounded-lg bg-app-light p-6 sm:w-96">
        <h2 className="mb-4 text-2xl font-light">Login</h2>
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div
            tabIndex={1}
            className={`flex flex-col gap-2 border-b-2 ${
              touched.contact && errors.contact
                ? "border-b-app-red"
                : "border-b-app-icons"
            } 
            ${
              touched.contact && errors.contact
                ? "border-opacity-100"
                : "border-opacity-30"
            } pb-2  focus-within:${
              touched.contact && errors.contact
                ? "border-b-app-red"
                : "border-b-white"
            } focus-within:${
              touched.contact && errors.contact
                ? "border-opacity-100"
                : "border-opacity-60"
            } `}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
              <input
                value={values.contact}
                className="ml-2 border-none bg-transparent outline-none  placeholder:text-app-icons focus:placeholder:text-white focus:placeholder:text-opacity-60"
                onBlur={handleBlur}
                type="contact"
                name="contact"
                onChange={handleChange}
                placeholder="contact"
              />
              <Errors
                className={"ml-2 text-xs text-app-red sm:ml-0"}
                touched={touched.contact}
                error={errors.contact}
              />
            </div>
          </div>

          <div
            tabIndex={2}
            className={`flex flex-col gap-2 border-b-2 ${
              touched.password && errors.password
                ? "border-b-app-red"
                : "border-b-app-icons"
            } 
            ${
              touched.password && errors.password
                ? "border-opacity-100"
                : "border-opacity-30"
            } pb-2  focus-within:${
              touched.password && errors.password
                ? "border-b-app-red"
                : "border-b-white"
            } focus-within:${
              touched.password && errors.password
                ? "border-opacity-100"
                : "border-opacity-60"
            } `}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
              <input
                value={values.password}
                className="ml-2 border-none bg-transparent outline-none  placeholder:text-app-icons focus:placeholder:text-white focus:placeholder:text-opacity-60"
                onBlur={handleBlur}
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <Errors
                className="ml-2 text-xs text-app-red sm:ml-0"
                touched={touched.password}
                error={errors.password}
              />
            </div>
          </div>
          <button
            disabled={!(values.contact && values.password) ? true : true}
            type="submit"
            role="submit"
            className="w-full cursor-pointer rounded-lg bg-app-red px-4 py-2 text-white outline-none  hover:bg-white hover:text-black"
          >
            Login to your account
          </button>
          <h3 className="mx-auto text-base text-white">
            Don{"' "}t have an account?{" "}
            <span
              className="cursor-pointer text-app-red"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </h3>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="colored"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        transition={Bounce}
      />
    </main>
  );
};
