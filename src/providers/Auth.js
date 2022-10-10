import React, { /* useEffect, */ useMemo, useState } from "react";

export const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: "",
        username: "",
        accessToken: null,
        entrou: false,
    });

    const usuario = useMemo(() => ({ user, setUser }), [user]);

    return <AuthContext.Provider value={usuario}>{children}</AuthContext.Provider>;
}
