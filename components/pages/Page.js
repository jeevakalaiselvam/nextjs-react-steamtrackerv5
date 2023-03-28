import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: green;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  min-width: ${(props) => (props.width ? props.width : "200px")};
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  max-height: 100vh;
  background-color: yellow;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  min-width: ${(props) => (props.width ? props.width : "200px")};
`;

const Header = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: center;
  background-color: cyan;
  height: ${(props) => (props.height ? props.height : "100px")};
`;

const Content = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: center;
  background-color: magenta;
  flex: 1;
`;

export default function Page({
  left,
  right,
  header,
  content,
  leftWidth,
  rightWidth,
  headerHeight,
}) {
  return (
    <Container>
      {left && <Left width={leftWidth}>{left}</Left>}
      <Main>
        {header && <Header>{header}</Header>}
        {content && <Content>{content}</Content>}
      </Main>
      {right && <Right width={rightWidth}>{right}</Right>}
    </Container>
  );
}
