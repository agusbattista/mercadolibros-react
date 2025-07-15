import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppProviders from "./AppProviders.jsx";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
