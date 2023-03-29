import AchievementCard from "@/components/atoms/AchievementCard";
import { filteredAchievementsForSortOption } from "@/helpers/achievementHelper";
import {
  ALL,
  BRONZE,
  BRONZE_COLOR,
  COMMON,
  COMMON_COLOR,
  EPIC,
  EPIC_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  NORMAL_COLOR,
  RARE,
  MARVEL,
  RARE_COLOR,
} from "@/helpers/colorHelper";
import {
  GAME_BACKLOG_SORT_ALL,
  GAME_BACKLOG_SORT_LOCKED,
  GAME_BACKLOG_SORT_UNLOCKED,
} from "@/helpers/constantHelper";
import { getIcon } from "@/helpers/iconHelper";
import {
  actionChangeGameBacklogSort,
  actionSetHiddenDescriptionForGame,
} from "@/store/actions/games.actions";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
`;

const BacklogContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 1rem;
  flex: 3;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PhaseContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  flex: 2;
`;

const BacklogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1.5rem;
`;

const BacklogContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  min-height: 90vh;
  max-height: 90vh;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;
`;

const TrophyFilter = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
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
  font-size: 2rem;
  justify-content: center;
  color: ${(props) => props.color ?? ""};
`;

const TrophyCount = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export default function GameContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences, hiddenDescriptions } = steamtracker;
  const { selectedGame, gameBacklogSort } = preferences;

  const game = games?.find((game) => game.id == selectedGame);

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

  const filteredAchievements = React.useMemo(() => {
    const filtered = filteredAchievementsForSortOption(
      achievements,
      gameBacklogSort ?? GAME_BACKLOG_SORT_ALL
    );
    return filtered;
  }, [achievements, gameBacklogSort]);

  useEffect(() => {
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${id}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(actionSetHiddenDescriptionForGame(id, hiddenData));
    };
    if (game && (!hiddenDescriptions || !hiddenDescriptions[id])) {
      getHidden();
    }
  }, [id]);

  const backLogTitleMap = {
    GAME_BACKLOG_SORT_ALL: "Backlog - All Achievements",
    GAME_BACKLOG_SORT_LOCKED: "Backlog - All Locked",
    GAME_BACKLOG_SORT_UNLOCKED: "Backlog - All Unlocked",
  };

  const backlogSortChangeHandler = () => {
    if ((gameBacklogSort ?? GAME_BACKLOG_SORT_ALL) == GAME_BACKLOG_SORT_ALL) {
      dispatch(actionChangeGameBacklogSort(GAME_BACKLOG_SORT_LOCKED));
    }
    if (
      (gameBacklogSort ?? GAME_BACKLOG_SORT_ALL) == GAME_BACKLOG_SORT_LOCKED
    ) {
      dispatch(actionChangeGameBacklogSort(GAME_BACKLOG_SORT_UNLOCKED));
    }
    if (
      (gameBacklogSort ?? GAME_BACKLOG_SORT_ALL) == GAME_BACKLOG_SORT_UNLOCKED
    ) {
      dispatch(actionChangeGameBacklogSort(GAME_BACKLOG_SORT_ALL));
    }
  };

  const headerCategories = [
    {
      id: ALL,
      color: NORMAL_COLOR,
      title: ALL,
    },
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
      <BacklogContainer>
        <BacklogHeader>
          <Title onClick={backlogSortChangeHandler}>
            {backLogTitleMap[gameBacklogSort ?? GAME_BACKLOG_SORT_ALL]}
          </Title>
          <TrophyFilter>
            {headerCategories.map((category) => {
              const { id, title, color } = category;
              return (
                <TrophyStatus color={color}>
                  <TrophyIcon color={color}>
                    {getIcon("achievement")}
                  </TrophyIcon>
                  <TrophyCount color={color}>{0}</TrophyCount>
                </TrophyStatus>
              );
            })}
          </TrophyFilter>
        </BacklogHeader>
        <BacklogContent>
          {filteredAchievements.map((achievement) => {
            return (
              <AchievementCard
                achievement={achievement}
                key={achievement.name}
                gameId={id}
              />
            );
          })}
        </BacklogContent>
      </BacklogContainer>
      <PhaseContainer></PhaseContainer>
    </Container>
  );
}
