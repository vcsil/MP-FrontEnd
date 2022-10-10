/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";

import axios from "../../shared/services/api/axios.js";
import useRouter from "../../shared/hooks/useRouter.js";
import { AuthContext } from "../../providers/Auth.js";
import Aviso from "../../Aviso.js";

function SignIn() {
    const { user, setUser } = React.useContext(AuthContext);

    const { navigate } = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mostraAviso, setMostraAviso] = useState([]);

    function BoxAviso(mensagem) {
        setMostraAviso([...mostraAviso, <Aviso key={0} mensagem={mensagem} ok={() => setMostraAviso([])} />]);
    }

    function entrando(props) {
        setUser({
            ...user,
            id: props.userId,
            username: props.username,
            accessToken: props.accessToken,
            entrou: true,
        });

        localStorage.setItem("meetup-refreshToken", props.refreshToken);
        setCarregando(false);

        navigate("/home", { replace: true });
    }

    function SubmitData(event) {
        event.preventDefault();
        setCarregando(true);

        const promise = axios.post("/auth/signin", {
            name: username,
            password,
        });
        promise.then((response) => {
            entrando(response.data);
        });
        promise.catch((err) => {
            const mensagem = typeof err.response.data === "undefined" ? "Servidor desconectado" : err.response.data;
            BoxAviso(mensagem);
            setCarregando(false);
        });
    }

    return (
        <Container>
            <Logo>
                <svg xmlns="http://www.w3.org/2000/svg" width="165pt" height="140pt" viewBox="0 0 400 340" fill="#000000">
                    <g transform="translate(0.000000,340.000000) scale(0.100000,-0.100000)">
                        <path d="M1085 3394 c-307 -46 -548 -164 -738 -363 -232 -243 -342 -517 -341 -851 1 -276 81 -515 244 -731 27 -35 249 -264 494 -509 l446 -445 0 156 0 157 -364 358 c-200 198 -385 388 -411 424 -66 89 -140 247 -167 355 -31 126 -31 362 0 477 50 182 123 316 242 441 101 107 174 161 301 221 156 76 224 90 429 90 161 0 182 -3 263 -27 205 -63 309 -129 511 -327 162 -158 300 -313 365 -409 97 -142 160 -322 147 -417 -14 -105 -124 -262 -310 -441 -68 -67 -141 -133 -160 -148 l-36 -27 -81 58 c-271 195 -427 391 -437 551 -11 172 71 345 208 434 l25 17 -50 101 -50 101 -60 -38 c-152 -97 -249 -242 -289 -432 -14 -68 -14 -151 0 -905 l16 -830 115 -115 115 -115 -6 405 c-3 223 -9 518 -12 655 l-7 250 90 -86 c98 -94 237 -202 363 -279 l79 -50 87 69 c300 242 518 501 594 709 31 83 32 92 27 197 -6 142 -46 269 -124 393 -71 113 -116 165 -296 348 l-149 151 71 47 c86 58 173 98 288 133 80 24 104 26 258 27 198 1 276 -15 432 -89 113 -53 166 -89 255 -174 165 -155 265 -339 303 -560 45 -253 -20 -535 -169 -745 -43 -61 -1137 -1169 -1223 -1238 -132 -107 -237 -143 -404 -136 -96 4 -113 8 -181 40 -42 20 -101 52 -133 73 -31 20 -59 34 -62 31 -3 -3 -2 -54 2 -113 l7 -109 56 -36 c117 -75 183 -99 290 -105 168 -9 315 26 455 107 61 36 169 139 690 659 395 394 637 643 671 691 107 148 178 311 213 487 25 127 23 348 -4 473 -105 483 -467 843 -953 947 -117 25 -362 25 -478 -1 -171 -37 -322 -102 -464 -202 -70 -49 -82 -54 -97 -42 -248 181 -451 255 -726 263 -77 2 -153 1 -170 -1z" />
                    </g>
                </svg>
            </Logo>
            <form className="boxInputs" onSubmit={SubmitData}>
                <input
                    placeholder="username"
                    type="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={carregando}
                    required
                />
                <input
                    placeholder="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={carregando}
                    required
                />
                <Botao type="submit" disabled={carregando}>
                    {carregando ? <Bars height="40" width="40" color="white" ariaLabel="loading" /> : <p>Log In</p>}
                </Botao>
            </form>
            <Link to={carregando ? "#" : "/register"} style={{ textDecoration: "none" }}>
                <FirstTime>First time? Create an account!</FirstTime>
            </Link>
            {mostraAviso.map((i) => i)}
        </Container>
    );
}

const Container = styled.div`
    margin: 0 54px 0 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Logo = styled.div`
    margin-top: 34%;
    margin-bottom: 86px;
`;

const Botao = styled.button`
    width: 100%;
    max-width: 430px;
    height: 65px;
    margin-bottom: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FirstTime = styled.p`
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: var(--cor-link);
`;

export default SignIn;
