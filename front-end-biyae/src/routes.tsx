import { createBrowserRouter } from "react-router-dom";
import App from "./Pages/App/App.tsx";
import Login from "./Pages/Login/login.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
