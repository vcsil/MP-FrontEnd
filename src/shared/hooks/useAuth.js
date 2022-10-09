import { useContext } from "react";
import { AuthContext } from "../../providers/Auth.js";

function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;
