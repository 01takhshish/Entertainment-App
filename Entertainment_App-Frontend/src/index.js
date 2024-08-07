import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { RegistrationPage } from "./Pages/RegistrationPage";
import { LoginPage } from "./Pages/LoginPage";
import { Auth } from "./Features/Auth";
import { HomePage } from "./Pages/HomePage";
import { BookmarksPage } from "./Pages/BookmarksPage";
import { MoviesPage } from "./Pages/MoviesPage";
import { ShowsPage } from "./Pages/ShowsPage";
import { InfoPage } from "./Pages/InfoPage";
import AuthenticationProvider from "./Context/AuthenticationProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <Auth />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/bookmarks",
            element: <BookmarksPage />,
          },
          {
            path: "/movies",
            element: <MoviesPage />,
          },
          {
            path: "/tvshows",
            element: <ShowsPage />,
          },
          {
            path: "/movies/:id",
            element: <InfoPage />,
          },
          {
            path: "/tvshows/:id",
            element: <InfoPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthenticationProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthenticationProvider>
);
