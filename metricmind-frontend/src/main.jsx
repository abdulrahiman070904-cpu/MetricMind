import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { CubeProvider } from "@cubejs-client/react";

import App from "./App";
import cubejsApi from "./cube";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CubeProvider cubeApi={cubejsApi}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CubeProvider>
  </React.StrictMode>
);