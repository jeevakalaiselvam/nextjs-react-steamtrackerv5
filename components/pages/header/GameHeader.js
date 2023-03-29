import TrophyFancy from "@/components/atoms/TrophyFancy";
import {
  BRONZE,
  BRONZE_COLOR,
  COMMON,
  COMMON_COLOR,
  EPIC,
  EPIC_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL,
  MARVEL_COLOR,
  RARE,
  RARE_COLOR,
} from "@/helpers/colorHelper";
import {
  GAME_CATEGORY_BRONZE,
  GAME_CATEGORY_BRONZE_TITLE,
  GAME_CATEGORY_COMMON,
  GAME_CATEGORY_COMMON_TITLE,
  GAME_CATEGORY_EPIC,
  GAME_CATEGORY_EPIC_TITLE,
  GAME_CATEGORY_LEGENDARY,
  GAME_CATEGORY_LEGENDARY_TITLE,
  GAME_CATEGORY_MARVEL,
  GAME_CATEGORY_MARVEL_TITLE,
  GAME_CATEGORY_RARE,
  GAME_CATEGORY_RARE_TITLE,
} from "@/helpers/constantHelper";
import { calculaNextStageForGame } from "@/helpers/gameHelper";
import { getIcon } from "@/helpers/iconHelper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const LeftEmpty = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const TrophyToGet = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const TrophyStatus = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1.5rem;
  justify-content: center;
`;

const TrophyIcon = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  font-size: ${(props) => props.size ?? "2rem"};
  justify-content: center;
  color: ${(props) => props.color ?? ""};
  transform: translateY(${(props) => props.transformY ?? "0px"});
`;

const TrophyCount = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const TrophyCompleted = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem;
  justify-content: center;
  font-size: 1rem;
  width: 20px;
  height: 20px;
`;

const TrophyObtained = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default function GameHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences } = steamtracker;
  const { selectedGame } = preferences;

  const game = games?.find((game) => game.id == selectedGame);

  const nextStage = calculaNextStageForGame(game);

  const headerCategories = [
    {
      id: BRONZE,
      color: BRONZE_COLOR,
      title: BRONZE,
    },
    {
      id: COMMON,
      color: COMMON_COLOR,
      title: COMMON,
    },
    {
      id: RARE,
      color: RARE_COLOR,
      title: RARE,
    },
    {
      id: EPIC,
      color: EPIC_COLOR,
      title: EPIC,
    },
    {
      id: LEGENDARY,
      color: LEGENDARY_COLOR,
      title: LEGENDARY,
    },
    {
      id: MARVEL,
      color: MARVEL_COLOR,
      title: MARVEL,
    },
  ];

  return (
    <Container>
      <LeftEmpty></LeftEmpty>
      <TrophyObtained>
        <TrophyFancy
          color={nextStage.OBTAINEDCOLOR}
          title={nextStage.OBTAINED}
        />
      </TrophyObtained>
      <TrophyToGet>
        {headerCategories.map((category) => {
          const { id, title, color } = category;
          return (
            <TrophyStatus color={color}>
              <TrophyIcon color={color}>{getIcon("trophy")}</TrophyIcon>
              {nextStage[id] > 0 && (
                <TrophyCount color={color}>{nextStage[id]}</TrophyCount>
              )}
              {nextStage[id] <= 0 && (
                <TrophyCompleted color={color}>
                  {getIcon("completed")}
                </TrophyCompleted>
              )}
            </TrophyStatus>
          );
        })}
      </TrophyToGet>
    </Container>
  );
}
