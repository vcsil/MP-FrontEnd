import React from "react";
import ReactDOM from "react-dom";

import { AuthProvider } from "./providers/Auth.js";
import App from "./App.js";

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.querySelector(".root")
);
