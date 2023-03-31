import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-right: 0.25rem;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) =>
    props.active ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.1)"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default function PhaseButton({ phase, onClick, active }) {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { preferences } = steamtracker;
  const { selectedGame } = preferences;

  const { id, title } = phase;
  return (
    <Container active={active} onClick={onClick}>
      {title}
    </Container>
  );
}
