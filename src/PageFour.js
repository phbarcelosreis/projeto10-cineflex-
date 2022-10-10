import { Link } from "react-router-dom";
import styled from "styled-components";

const Movie = styled.div`
  background-color: #ffffff;
  width: 100vw;
  min-height: 140px;
  flex-direction: column;
  margin-left: 20px;
  align-items: center;
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 24px;
    color: #293845;
    padding-bottom: 20px;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 22px;
    color: #293845;
    padding-bottom: 10px;
  }
`;

const ChooseSit = styled.button`
  font-family: "Roboto", sans-serif;
  background-color: #e8833a;
  font-weight: 400;
  border-radius: 3px;
  width: 225px;
  height: 43px;
  color: white;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;


export default function PageFour({ sessaoEscolhido, cpf, nome, assento }) {
  const array = [];
  let CPFatt = "";
  objToArray(assento);
  function objToArray(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key].selected === true) {
        array.push(obj[key].name);
      }
    });
    formataCPF(cpf);
    function formataCPF(cpf) {
      cpf = cpf.replace(/[^\d]/g, "");
      return (CPFatt = cpf.replace(
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        "$1.$2.$3-$4"
      ));
    }

    return array;
  }
  if (array !== undefined) {

    return (
      <>
        <Choose>
          <p>Pedido feito com sucesso!</p>
        </Choose>
        <Movie>
          <h1>Filme e sessão</h1>
          <p>{sessaoEscolhido.movie.title}</p>
          <p>
            {sessaoEscolhido.day.date} {sessaoEscolhido.name}
          </p>
        </Movie>
        <Movie>
          <h1>Ingressos</h1>
          {array.map((a) => (
            <p> {a}</p>
          ))}
        </Movie>
        <Movie>
          <h1>Comprador</h1>
          <p>Nome: {nome}</p>
          <p>CPF: {CPFatt}</p>
        </Movie>
        <Flex>
          <Link to="/">
            <ChooseSit>Voltar para Tela Inicial</ChooseSit>
          </Link>
        </Flex>
      </>
    );
  }
  return <></>;
}
const Choose = styled.div`
  background-color: #ffffff;
  width: 100vw;
  height: 110px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  p {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 24px;
    color: #247a6b;
  }
`;

