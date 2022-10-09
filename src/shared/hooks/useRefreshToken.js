import React from "react";
import { AuthContext } from "../../providers/Auth.js";
import axios from "../services/api/axios.js";

export default function useRefreshToken() {
    const { user, setUser } = React.useContext(AuthContext);

    // eslint-disable-next-line consistent-return
    /*
     * Persistindo login. Para isso o refreshToken fica salvo no localStorage.
     * Quando entrar novamente na aplicação o refreshToken é verificado e se ainda
     * for válido, ele é atualizado e gera um novo accessToken
     */
    const refresh = async () => {
        try {
            const refreshToken = localStorage.getItem("meetup-refreshToken"); // Pega o refreshToken
            const { data } = await axios.post(`/auth/refresh`, { refreshToken }); // Gera novos tokens
            setUser((prev) => ({
                ...prev,
                id: data.userId,
                username: data.name,
                accessToken: data.accessToken,
            })); // Atualiza no Context

            localStorage.setItem("meetup-refreshToken", data.refreshToken); // Atualiza no LocalStorage

            return data.accessToken;
        } catch (err) {
            setUser({
                ...user,
                id: "",
                username: "",
                accessToken: null,
                entrou: false,
            });
            localStorage.removeItem("meetup-refreshToken");
            return err;
        }
    };
    return refresh;
}
