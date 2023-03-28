import { HEADER_IMAGE } from "@/helpers/urlHelper";
import React from "react";
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

  &:hover {
    color: ;
  }
`;

export default function GameCard({ game, height }) {
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
  return (
    <Container url={HEADER_IMAGE(id)} height={height}>
      <Overlay height={height} />
      <Title>{name}</Title>
    </Container>
  );
}
