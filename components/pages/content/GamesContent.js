import GameCard from "@/components/atoms/GameCard";
import TrophyFancy from "@/components/atoms/TrophyFancy";
import {
  BACKLOG,
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
  NORMAL_COLOR,
  RARE,
  RARE_COLOR,
} from "@/helpers/colorHelper";

import { filterGamesForCategory } from "@/helpers/gameHelper";
import { getIcon } from "@/helpers/iconHelper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
`;

const GamesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  height: 100%;
  margin: 1rem 1rem;
  flex: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 8;
  text-align: center;
  padding: 0.25rem;
  color: ${(props) => (props.iconColor ? props.iconColor : "")};
  transition: all 0.5s;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  z-index: 8;
  justify-content: center;
`;

const HeaderData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  z-index: 8;
  font-size: ${(props) => (props.complete ? "1.5rem" : "2rem")};
`;

const GameList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
  min-height: 95vh;
  min-height: 95vh;
`;

const TrophyObtained = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
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

const TrophyTitle = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  justify-content: center;
  color: ${(props) => props.color ?? ""};
`;

export default function GamesContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  const GAME_HEIGHT = 150;

  const gameListCategories = [
    {
      id: BACKLOG,
      color: NORMAL_COLOR,
      title: BACKLOG,
    },
    {
      id: MARVEL,
      color: MARVEL_COLOR,
      title: MARVEL,
    },
    {
      id: LEGENDARY,
      color: LEGENDARY_COLOR,
      title: LEGENDARY,
    },
    {
      id: EPIC,
      color: EPIC_COLOR,
      title: EPIC,
    },
    {
      id: RARE,
      color: RARE_COLOR,
      title: RARE,
    },
    {
      id: COMMON,
      color: COMMON_COLOR,
      title: COMMON,
    },
    {
      id: BRONZE,
      color: BRONZE_COLOR,
      title: BRONZE,
    },
  ];

  return (
    <Container>
      {gameListCategories.map((category) => {
        const { id, color, title } = category;
        const { filteredGamesForCategory, gamesCountForCategory } =
          filterGamesForCategory(games, id);
        return (
          <GamesList key={id}>
            <HeaderContainer iconColor={color}>
              <HeaderIcon>
                <TrophyFancy color={color} title={id} />
              </HeaderIcon>
              <HeaderData complete={true}>
                <span style={{ marginLeft: "0.5rem" }}>
                  {gamesCountForCategory}
                </span>
              </HeaderData>
            </HeaderContainer>
            <GameList>
              {filteredGamesForCategory.length > 0 &&
                filteredGamesForCategory.map((game) => {
                  return (
                    <GameCard game={game} height={GAME_HEIGHT} key={game.id} />
                  );
                })}
            </GameList>
          </GamesList>
        );
      })}
    </Container>
  );
}
