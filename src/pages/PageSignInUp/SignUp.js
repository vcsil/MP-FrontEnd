/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import styled from "styled-components";

import axios from "../../shared/services/api/axios.js";
import useRouter from "../../shared/hooks/useRouter.js";
import Aviso from "../../Aviso.js";

function SignUp() {
    const { navigate } = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [mostraAviso, setMostraAviso] = useState([]);

    function BoxAviso(mensagem) {
        setMostraAviso([...mostraAviso, <Aviso key={0} mensagem={mensagem} ok={() => setMostraAviso([])} />]);
    }

    function passwordReference() {
        if (password === confirmPassword) {
            return "green";
        }
        return "red";
    }

    function SubmitData(event) {
        if (!carregando) {
            event.preventDefault();

            setCarregando(true);

            const promise = axios.post("auth/signup", {
                name: username,
                email,
                password,
                confirmPassword,
            });
            promise.then(() => {
                setCarregando(false);
                navigate("/login", { replace: true });
            });
            promise.catch((err) => {
                navigate("/register", { replace: true });
                setCarregando(false);
                const mensagem = typeof err.response.data === "undefined" ? "Servidor desconectado" : err.response.data;
                BoxAviso(mensagem);
            });
        }
    }

    return (
        <Container>
            <form className="boxInputs" onSubmit={SubmitData}>
                <input
                    // eslint-disable-next-line react/jsx-no-bind
                    placeholder="username"
                    type="name"
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={carregando}
                    required
                />
                <input
                    placeholder="e-mail"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={carregando}
                    required
                />
                <input
                    // eslint-disable-next-line react/jsx-no-bind
                    placeholder="password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={carregando}
                    required
                />
                <PasswordReference
                    // eslint-disable-next-line react/jsx-no-bind
                    cor={passwordReference}
                    placeholder="confirm password"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={carregando}
                    required
                />
                <Botao type="submit" disabled={carregando}>
                    {carregando ? <Bars height="40" width="40" color="white" ariaLabel="loading" /> : <p>Sign Up</p>}
                </Botao>
            </form>
            <Link to={carregando ? "#" : "/login"} style={{ textDecoration: "none" }}>
                <FirstTime>Switch back to log in</FirstTime>
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

const PasswordReference = styled.input`
    color: ${(props) => props.cor};
`;

export default SignUp;
