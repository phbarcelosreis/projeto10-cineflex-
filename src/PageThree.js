import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageThree({ sessaoEscolhido, setSessaoEscolhido, cpf, setCpf, nome, setNome, setAssento }) {
  const [chosen, setChosen] = useState({});
  const navigate = useNavigate();
  let newChosen = {};
  let array = [];
  const params = useParams();
  function Selecionar(info) {
    if (info.isAvailable === false) {
      alert("Esse assento não está disponível");
      return;
    }
    if (chosen[info.id]?.selected) {
      chosen[info.id] = { selected: false };
      const newChosen = { ...chosen };
      newChosen[info.id] = { selected: false };
      setChosen(newChosen);
      return;
    }
    newChosen = { ...chosen };
    newChosen[info.id] = { selected: true, name: `Assento ${info.name}` };
    setChosen(newChosen);
  }
  function postData(event) {
    event.preventDefault();
    if (cpf.length !== 11) {
      alert("O CPF tem que ter 11 digítos");
      return
    }
    objToArray(chosen);

    function objToArray(obj) {
      Object.keys(obj).forEach((key) => {
        if (obj[key].selected === true) {
          array.push(key);
        }
      });

      return array;
    }
    if (array[0] !== undefined) {
      setAssento(chosen)
      const url = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many"
      const promisse = axios.post(url, {
        ids: array,
        name: nome,
        cpf: cpf
      })
      promisse.then((a) => {

        navigate("/sucesso")
      })
      promisse.catch((err) => alert(err.response.data))
    } else {
      alert("Selecione pelo menos 1 assento válido")
      return
    }
  }
  useEffect(() => {
    const Url = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${params.idSessao}/seats`;
    const promisse = axios.get(Url);
    promisse.then((movie) => {
      setSessaoEscolhido(movie.data);
    });
    promisse.catch((erro) => {
      alert(erro.response.data);
    });
  }, [setSessaoEscolhido, params]);
  if (sessaoEscolhido !== null) {
    return (
      <>
        <Chose>
          <p>Selecione o(s) assento(s)</p>
        </Chose>
        <Assentos>
          {sessaoEscolhido.seats.map((info) => (
            <Botao
              key={info.id}
              onClick={() => Selecionar(info)}
              isAvailable={info.isAvailable}
              isSelected={chosen[info.id]?.selected}
            >
              {info.name}
            </Botao>
          ))}
        </Assentos>
        <Disponibilidade>
          <Button color="#1AAE9E" /> <Button color="#C3CFD9" />{" "}
          <Button color="#FBE192" />
        </Disponibilidade>
        <Disponibilidade>
          <p>Selecionado</p>
          <p>Disponível</p>
          <p>Indisponível</p>
        </Disponibilidade>
        <form onSubmit={postData}>
          <Compra>
            <p>Nome do comprador:</p>
            <input
              required
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome..."
            ></input>
            <p>CPF do comprador:</p>
            <input
              required
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF..."
            ></input>
          </Compra>
          <Flex>
            <EscolherAssento type="submit">Reservar assento(s)</EscolherAssento>
          </Flex>
        </form>
        <Footer>
          <img src={sessaoEscolhido.movie.posterURL} alt="sessaoEscolhida" />
          <FLexDirection>
            <p>{sessaoEscolhido.movie.title} </p>
            <p>
              {sessaoEscolhido.day.weekday} - {sessaoEscolhido.name}
            </p>
          </FLexDirection>
        </Footer>
      </>
    );
  }
  return <></>;
}

const Chose = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #293845;
  }
`;
const Assentos = styled.div`
  background-color: #ffffff;
  width: 100vw;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Botao = styled.button`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  margin-right: 7px;
  margin-bottom: 18px;
  color: black;
  background: ${(props) =>
    props.isSelected === true
      ? "#1AAE9E"
      : props.isAvailable === true
        ? "#C3CFD9"
        : "#FBE192"};
  border: 1px solid #808f9d;
  border-radius: 12px;
`;
const Disponibilidade = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 13px;
    color: #293845;
    margin-bottom: 20px;
  }
`;
const Button = styled.button`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  background: ${(props) => props.color};
  border: 1px solid #808f9d;
  border-radius: 12px;
`;
const Compra = styled.div`
  background-color: #ffffff;
  width: 100vw;
  margin-left: 20px;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #293845;
  }
  input {
    width: 80vw;
    height: 51px;
    margin-bottom: 20px;
    border: 1px solid #d4d4d4;
  }
`;
const EscolherAssento = styled.button`
  font-family: "Roboto", sans-serif;
  background-color: #e8833a;
  font-weight: 400;
  border-radius: 3px;
  width: 225px;
  height: 43px;
  color: white;
  text-align: center;
  font-size: 18px;
`;
const Footer = styled.div`
  background-color: #dfe6ed;
  width: 100vw;
  height: 117px;
  display: flex;
  align-items: center;
  justify-content: left;
  bottom: 0;
  position: fixed;
  border: 1px solid #9eadba;
  img {
    width: 48px;
    height: 72px;
    margin-left: 20px;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 26px;
    color: #293845;
    margin-left: 20px;
  }
`;
const FLexDirection = styled.div`
  flex-direction: column;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
`;
