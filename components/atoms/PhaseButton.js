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
  background-color: rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export default function PhaseButton({ phase }) {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { preferences } = steamtracker;
  const { selectedGame } = preferences;

  const { id, title } = phase;
  return <Container>{title}</Container>;
}
