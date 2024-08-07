import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./Components/Header";
import { useFetchBookmark } from "./Hooks/usefetchBookmark";
import { useFetchBookmarksbyID } from "./Hooks/usefetchBookmarksbyID";

export const PageLayout = ({ children }) => {
  useFetchBookmark();
  useFetchBookmarksbyID();
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnHover={false}
        closeOnClick
        theme="dark"
        transition={Bounce}
      />
      <main className="mb-16 mt-24 flex w-screen flex-col items-center p-6 md:ml-6 lg:ml-32 lg:mt-0 lg:items-start">
        {children}
      </main>
    </>
  );
};
