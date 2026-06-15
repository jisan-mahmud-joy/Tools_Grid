import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";

import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

registerSW({
  immediate: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);