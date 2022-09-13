import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BudgetsContextProvider } from "./contexts/BudgetsContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BudgetsContextProvider>
      <App />
    </BudgetsContextProvider>
  </AuthContextProvider>
);
