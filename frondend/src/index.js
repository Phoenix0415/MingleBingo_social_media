import React from "react";
import { unstable_createRoot } from "react-dom"; // Importing unstable_createRoot from react-dom

import App from "./App";
import "./index.css";

const root = document.getElementById("root");

// Use unstable_createRoot instead of ReactDOM.render
const rootElement = unstable_createRoot(root);
rootElement.render(<App />);
