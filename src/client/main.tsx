import React from "react";
import ReactDOM from "react-dom/client";
import App from "./ui/app";

// Root-Element aus index.html
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
