import React from "react";
import { Route, Routes } from "react-router-dom";

import PersistLogin from "../shared/components/PersistLogin.js";
import PublicRoute from "../shared/components/PublicRoute.js";
import PrivateRoute from "../shared/components/PrivateRoute.js";

import TelaSignInUp from "../pages/PageSignInUp/TelaSignInUp.js";
import Route404 from "../pages/Route404.js";
import HomePage from "../pages/HomePage.js";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
                {/* PUBLIC ROUTES */}
                <Route
                    path="/register"
                    element={
                        <PublicRoute restricted>
                            <TelaSignInUp />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute restricted>
                            <TelaSignInUp />
                        </PublicRoute>
                    }
                />

                {/* PRIVATE ROUTES */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Route404 />} />
            </Route>
        </Routes>
    );
}
