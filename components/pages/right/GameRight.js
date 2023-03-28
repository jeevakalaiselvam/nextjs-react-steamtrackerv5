import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
`;

const Title = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 1rem;
`;

export default function GameRight() {
  return (
    <Container>
      <Title>UNLOCKED TODAY</Title>
    </Container>
  );
}
