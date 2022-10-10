import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PageTwo({ chooseMovie, setChooseMovie }) {
    const params = useParams();
    useEffect(() => {
        const Url = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${params.id}/showtimes`;
        const promisse = axios.get(Url);
        promisse.then((movie) => {
            setChooseMovie(movie.data);
        });
        promisse.catch((erro) => {
            alert(erro.response.data);
        });
    }, []
    );

    if (chooseMovie !== null) {
        return (
            <div>
                <Chose>
                    <p>Selecione o horário</p>
                </Chose>
                {chooseMovie.days.map((info) => {
                    return (
                        <div>
                            <Dia>
                                {info.weekday} - {info.date}
                            </Dia>
                            <Horario>
                                {info.showtimes.map((inf) => (
                                    <Link to={`/sessao/${inf.id}`}>
                                        <button>{inf.name}</button>
                                    </Link>
                                ))}
                            </Horario>
                        </div>
                    );
                })}
                <Footer>
                    <img src={chooseMovie.posterURL} />
                    <p>{chooseMovie.title}</p>
                </Footer>
            </div>
        );
    }

    return <></>;
}

const Dia = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #293845;
  margin: auto;
`;
const Horario = styled.div`
  display: flex;
  justify-content: center;
  button {
    font-family: "Roboto", sans-serif;
    background-color: #e8833a;
    font-weight: 400;
    border-radius: 3px;
    width: 83px;
    height: 43px;
    color: white;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin-right: 20px;
    margin-bottom: 23px;
    margin-top: 23px;
  }
`;

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