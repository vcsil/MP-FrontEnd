import React from "react";
import { Navigate } from "react-router-dom";

function Route404() {
    return <Navigate to="/login" replace />;
}

export default Route404;
