import { getIcon } from "@/helpers/iconHelper";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { calculateRecentHistory } from "../../helpers/xpHelper";
import { setShowHistoryModal } from "../../store/actions/games.actions";
import { calculateLevel } from "@/helpers/gameHelper";

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

const Icon1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: gold;
  margin-top: 2rem;
  font-size: 1rem;
  opacity: 0.75;
`;

const Icon2 = styled.div`
  display: flex;
  align-items: center;
  color: gold;
  justify-content: center;
  margin-top: 1rem;
  font-size: 1.5rem;
  opacity: 0.75;
`;

const Icon3 = styled.div`
  display: flex;
  color: gold;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 2rem;
  opacity: 0.75;
`;

const Icon4 = styled.div`
  display: flex;
  align-items: center;
  color: gold;
  justify-content: center;
  margin-left: 1rem;
  font-size: 2rem;
  opacity: 0.75;
`;

const Icon5 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  color: gold;
  font-size: 1.5rem;
  opacity: 0.75;
`;

const Icon6 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 1rem;
  color: gold;
  opacity: 0.75;
`;

const LevelText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: gold;
  justify-content: center;
  font-size: 2rem;
`;

const CurrentLevel = styled.div`
  display: flex;
  align-items: center;
  color: gold;
  justify-content: center;
  font-size: 2rem;
`;

const NextLevel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  opacity: 0.5;
`;

const ProfileLevel = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;
  const { currentLevel, toNextlevel } = calculateLevel(games);

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <IconStart>{getIcon("sidebartitle")}</IconStart>
          <Title>Level Stats</Title>
          <IconEnd>{getIcon("sidebartitle")}</IconEnd>
        </Header>
        <LevelContainer>
          <Icon1>{getIcon("level")}</Icon1>
          <Icon2>{getIcon("level")}</Icon2>
          <Icon3>{getIcon("level")}</Icon3>
          <LevelText>
            <CurrentLevel>{currentLevel}</CurrentLevel>
            <NextLevel>{toNextlevel}</NextLevel>
          </LevelText>
          <Icon4>{getIcon("level")}</Icon4>
          <Icon5>{getIcon("level")}</Icon5>
          <Icon6>{getIcon("level")}</Icon6>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileLevel;
