import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";

function TelaSignInUp() {
    const currentRoute = useLocation().pathname;

    const timeWindowWelcome = 1500;

    const [welcome, setWelcome] = useState(true);

    // Evitar atualizar componente com ele desmontado
    useEffect(() => {
        const abortController = new AbortController();
        setInterval(() => {
            setWelcome(false);
        }, timeWindowWelcome);
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <Container>
            <ContainerWelcome show={welcome}>
                <Box>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="400.000000pt"
                        height="340.000000pt"
                        viewBox="0 0 400.000000 340.000000"
                        fill="#000000"
                    >
                        <g transform="translate(0.000000,340.000000) scale(0.100000,-0.100000)">
                            <path d="M1085 3394 c-307 -46 -548 -164 -738 -363 -232 -243 -342 -517 -341 -851 1 -276 81 -515 244 -731 27 -35 249 -264 494 -509 l446 -445 0 156 0 157 -364 358 c-200 198 -385 388 -411 424 -66 89 -140 247 -167 355 -31 126 -31 362 0 477 50 182 123 316 242 441 101 107 174 161 301 221 156 76 224 90 429 90 161 0 182 -3 263 -27 205 -63 309 -129 511 -327 162 -158 300 -313 365 -409 97 -142 160 -322 147 -417 -14 -105 -124 -262 -310 -441 -68 -67 -141 -133 -160 -148 l-36 -27 -81 58 c-271 195 -427 391 -437 551 -11 172 71 345 208 434 l25 17 -50 101 -50 101 -60 -38 c-152 -97 -249 -242 -289 -432 -14 -68 -14 -151 0 -905 l16 -830 115 -115 115 -115 -6 405 c-3 223 -9 518 -12 655 l-7 250 90 -86 c98 -94 237 -202 363 -279 l79 -50 87 69 c300 242 518 501 594 709 31 83 32 92 27 197 -6 142 -46 269 -124 393 -71 113 -116 165 -296 348 l-149 151 71 47 c86 58 173 98 288 133 80 24 104 26 258 27 198 1 276 -15 432 -89 113 -53 166 -89 255 -174 165 -155 265 -339 303 -560 45 -253 -20 -535 -169 -745 -43 -61 -1137 -1169 -1223 -1238 -132 -107 -237 -143 -404 -136 -96 4 -113 8 -181 40 -42 20 -101 52 -133 73 -31 20 -59 34 -62 31 -3 -3 -2 -54 2 -113 l7 -109 56 -36 c117 -75 183 -99 290 -105 168 -9 315 26 455 107 61 36 169 139 690 659 395 394 637 643 671 691 107 148 178 311 213 487 25 127 23 348 -4 473 -105 483 -467 843 -953 947 -117 25 -362 25 -478 -1 -171 -37 -322 -102 -464 -202 -70 -49 -82 -54 -97 -42 -248 181 -451 255 -726 263 -77 2 -153 1 -170 -1z" />

                            <animate attributeName="fill" values="#EC398B;#000000" dur="1.5s" repeatCount="1" />
                        </g>
                    </svg>
                </Box>
            </ContainerWelcome>
            <LeftSide>
                <LeftText>
                    <h1 style={{ cursor: "default" }}>MP</h1>
                    <p>
                        sacolas, live
                        <br />
                        vendas
                    </p>
                </LeftText>
            </LeftSide>
            <RightSide>{currentRoute === "/login" ? <SignIn /> : <SignUp />}</RightSide>
        </Container>
    );
}

const Container = styled.main`
    background-color: var(--cor-rosa);
    display: flex;
`;

const ContainerWelcome = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: var(--cor-rosa);
    display: ${(props) => (props.show ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 5;
    position: absolute;
`;

const Box = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
`;

const LeftSide = styled.div`
    width: 100%;
    padding-top: 18%;
    padding-left: 10%;
    padding-right: 50px;
`;

const LeftText = styled.div`
    h1 {
        font-family: "Passion One";
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: var(--cor-branco);
    }

    p {
        font-family: "Oswald";
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: var(--cor-branco);
    }
`;

const RightSide = styled.div`
    min-width: 37vw;
    background-color: var(--cor-branco);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default TelaSignInUp;
