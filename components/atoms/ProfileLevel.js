import { getIcon } from "@/helpers/iconHelper";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { calculateRecentHistory } from "../../helpers/xpHelper";
import { setShowHistoryModal } from "../../store/actions/games.actions";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  padding: 1rem 0.25rem;
  justify-content: center;
  margin: 0.5rem;
  flex-direction: column;
  width: 95%;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const LevelFragment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const IconStart = styled.div`
  display: flex;
  align-items: center;
  color: #009eff;
  justify-content: center;
  flex: 1;
  font-size: 1.5rem;
`;

const IconEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #009eff;
  flex: 1;
  font-size: 1.5rem;
`;

const Title = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0.25rem; ;
`;

const ProfileLevel = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <IconStart>{getIcon("sidebartitle")}</IconStart>
          <Title>Level Stats</Title>
          <IconEnd>{getIcon("sidebartitle")}</IconEnd>
        </Header>
        <LevelContainer></LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileLevel;
