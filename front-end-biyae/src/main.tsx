import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

// todo now where i last ended off:
// install the router stuff, *done*
// figure out login page. *currently handling*
// then we'll start doing sql integration with the usrs.
