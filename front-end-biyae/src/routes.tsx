import { createBrowserRouter } from "react-router-dom";
import App from "./Pages/App/App.tsx";
import Login from "./Pages/Login/login.tsx";
import Signup from "./Pages/SignUp/signup.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
