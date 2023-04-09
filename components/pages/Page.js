import { HEADER_IMAGE } from "@/helpers/urlHelper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  min-width: ${(props) => (props.width ? props.width : "180px")};
  max-width: ${(props) => (props.width ? props.width : "180px")};
  z-index: 3;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 100vh;
  z-index: 3;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  z-index: 3;
  min-width: ${(props) => (props.width ? props.width : "200px")};
`;

const Header = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  justify-content: center;
  height: ${(props) => (props.height ? props.height : "auto")};
  z-index: 3;
`;

const Content = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  padding: 0.5rem;
  justify-content: center;
  flex: 1;
  z-index: 3;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
  filter: blur(25px);
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
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const preferences = steamtracker.preferences ?? {};
  const themeGameId = preferences?.themeGameId ?? 1328670;

  return (
    <Container>
      <ImageOverlay image={HEADER_IMAGE(themeGameId)} />
      {left && <Left width={leftWidth}>{left}</Left>}
      <Main>
        {header && <Header height={headerHeight}>{header}</Header>}
        {content && <Content>{content}</Content>}
      </Main>
      {right && <Right width={rightWidth}>{right}</Right>}
    </Container>
  );
}
