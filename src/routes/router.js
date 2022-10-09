import React from "react";
import { Route, Routes } from "react-router-dom";

import PersistLogin from "../shared/components/PersistLogin.js";
import PublicRoute from "../shared/components/PublicRoute.js";
// import PrivateRoute from "../shared/components/PrivateRoute.js";

import TelaSignInUp from "../pages/PageSignInUp/TelaSignInUp.js";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                <Route
                    path="/register"
                    element={
                        <PublicRoute restricted>
                            <TelaSignInUp />
                        </PublicRoute>
                    }
                />
            </Route>
        </Routes>
    );
}
