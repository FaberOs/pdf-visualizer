import React from "react";
import ReactDOM from "react-dom";
import { PdfProvider } from "./context/PdfContext";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <PdfProvider>
    <App />
  </PdfProvider>,
  document.getElementById("root")
);
