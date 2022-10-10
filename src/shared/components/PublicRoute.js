import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

function PublicRoute({ restricted, children }) {
    const { user } = useAuth();

    // Redireciona par a rota autenticada '/home'
    if (user?.accessToken && restricted) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default PublicRoute;
