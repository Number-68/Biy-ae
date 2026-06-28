import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// todo now where i last ended off:
// install the router stuff,
// figure out login page.
// then we'll start doing sql integration with the usrs.
