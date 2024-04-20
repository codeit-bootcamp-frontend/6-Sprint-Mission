import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; // index.js에서 global stylesheet을 import하면 전역적으로 스타일이 적용돼요

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
