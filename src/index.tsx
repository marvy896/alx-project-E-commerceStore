import React from "react"
import {createRoot} from "react-dom/client"
import App from "./app"
import "./index.css";
import {BrowserRouter} from "react-router-dom"
window.React = React;
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById("root") as HTMLDivElement)
root.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
    )
