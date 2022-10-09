import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./shared/styles/globalStyles.js";
import AppRoutes from "./routes/router.js";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
