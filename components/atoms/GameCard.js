import { getIcon } from "@/helpers/iconHelper";
import { HEADER_IMAGE } from "@/helpers/urlHelper";
import {
  actionSetSelectedGame,
  actionSetSelectedGameAll,
} from "@/store/actions/games.actions";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  min-height: ${(props) => (props.height ? `${props.height}px` : `150px`)};
  background-color: red;
  position: relative;
  background: url(${(props) => props.url});
  background-size: cover;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: ${(props) => (props.height ? `${props.height}px` : `150px`)};
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fefefe;
  padding: 0.5rem 1rem;
`;

const EyeCard = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2001;

  &:hover {
    color: ${(props) => props.color};
  }
`;

export default function GameCard({ game, height, color }) {
  const {
    id,
    playtime,
    name,
    achievements,
    completion,
    toGet,
    total,
    completed,
    lastPlayed,
  } = game;

  const router = useRouter();
  const dispatch = useDispatch();

  const gameCardClickHandler = () => {
    dispatch(actionSetSelectedGame(id));
    dispatch(actionSetSelectedGameAll(game));
    router.push(`/games/${id}`);
  };

  return (
    <Container
      url={HEADER_IMAGE(id)}
      height={height}
      onClick={gameCardClickHandler}
    >
      {/* <EyeCard color={color}>{getIcon("eye")}</EyeCard> */}
      <Overlay height={height} />
      <Title>{name}</Title>
    </Container>
  );
}
