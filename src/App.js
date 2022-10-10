import styled from "styled-components";
import PageChoseMovie from "./PageOne";
import React from "react";
import PageTwo from "./PageTwo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageThree from "./PageThree";
import { GlobalStyle } from "./Globalstyle";
import PageFour from "./PageFour";
import { useState } from "react";

const Menu = styled.div`
  width: 100vw;
  height: 67px;
  display: flex;
  justify-content: center;
  background-color: #c3cfd9;
  align-items: center;
  p {
    color: #e8833a;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 34px;
  }
`;

const Container = styled.div`
  background-color: #ffffff;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0px;
  padding: 0px;
  padding-bottom: 200px;
`;


export default function App() {

    const [chooseMovie, setChooseMovie] = useState(null);
    const [chooseSection, setChooseSection] = useState(null);
    const [CPF, setCPF] = useState(Number);
    const [assento, setAssento] = useState();
    const [nome, setNome] = useState("");

    return (

        <BrowserRouter>
            <GlobalStyle />
            <Container>
                <Menu>
                    <p>CINEFLIX</p>
                </Menu>
                <Routes>
                    <Route path="/" element={<PageChoseMovie />} />
                    <Route
                        path="/filme/:id"
                        element={
                            <PageTwo
                                setChooseMovie={setChooseMovie}
                                chooseMovie={chooseMovie}
                            />
                        }
                    />
                    <Route path="/sessao/:idSessao" element={
                        <PageThree setChooseSection={setChooseSection} setCPF={setCPF} cpf={CPF}
                            setNome={setNome} nome={nome} setAssento={setAssento}
                            chooseSection={chooseSection} />
                    } />
                    <Route path="/sucesso" element={<PageFour nome={nome} cpf={CPF} assento={assento}
                        chooseSection={chooseSection} />} />
                </Routes>
            </Container>
        </BrowserRouter>

    );

}
