import AchievementCard from "@/components/atoms/AchievementCard";
import {
  filteredAchievementsForSortAndFilterOption,
  getAchievementsForFilterType,
} from "@/helpers/achievementHelper";
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
  GAME_BACKLOG_FILTER_ALL,
  GAME_BACKLOG_FILTER_BRONZE,
  GAME_BACKLOG_FILTER_COMMON,
  GAME_BACKLOG_FILTER_EPIC,
  GAME_BACKLOG_FILTER_LEGENDARY,
  GAME_BACKLOG_FILTER_MARVEL,
  GAME_BACKLOG_FILTER_RARE,
  GAME_BACKLOG_SORT_ALL,
  GAME_BACKLOG_SORT_LOCKED,
  GAME_BACKLOG_SORT_UNLOCKED,
  PHASE_ALL,
  PHASE_ALL_TITLE,
  PHASE_EASY,
  PHASE_EASY_TITLE,
  PHASE_GRIND,
  PHASE_GRIND_TITLE,
  PHASE_HARD,
  PHASE_HARD_TITLE,
  PHASE_MISSABLE,
  PHASE_MISSABLE_TITLE,
  PHASE_ONLINE,
  PHASE_ONLINE_TITLE,
  PHASE_STORY,
  PHASE_STORY_TITLE,
} from "@/helpers/constantHelper";
import { getIcon } from "@/helpers/iconHelper";
import {
  actionAddNewPhaseGame,
  actionChangeBacklogFilter,
  actionChangeGameBacklogSort,
  actionSetHiddenDescriptionForGame,
} from "@/store/actions/games.actions";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  justify-content: flex-start;
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

const InnerList = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 2rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-start;

  &:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const AchievementFilter = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const AchievementStatus = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1.5rem;
  justify-content: center;
`;

const AchievementIcon = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  font-size: 2rem;
  justify-content: center;
  color: ${(props) => props.color ?? ""};
`;

const AchievementCount = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const AchievementSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5px;
  height: 5px;
  border-radius: 1rem;
  background-color: ${(props) => props.color ?? "#FEFEFE"};
`;

export default function GameContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences, hiddenDescriptions, phaseInfo } = steamtracker;
  const { selectedGame, gameBacklogSort, gameBacklogFilter } = preferences;

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
    const filtered = filteredAchievementsForSortAndFilterOption(
      achievements,
      gameBacklogSort ?? GAME_BACKLOG_SORT_ALL,
      gameBacklogFilter ?? GAME_BACKLOG_FILTER_ALL
    );
    return filtered;
  }, [achievements, gameBacklogSort, gameBacklogFilter]);

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
      type: GAME_BACKLOG_FILTER_ALL,
      color: NORMAL_COLOR,
      title: ALL,
    },
    {
      type: GAME_BACKLOG_FILTER_BRONZE,
      color: BRONZE_COLOR,
      title: BRONZE,
    },
    {
      type: GAME_BACKLOG_FILTER_COMMON,
      color: COMMON_COLOR,
      title: COMMON,
    },
    {
      type: GAME_BACKLOG_FILTER_RARE,
      color: RARE_COLOR,
      title: RARE,
    },
    {
      type: GAME_BACKLOG_FILTER_EPIC,
      color: EPIC_COLOR,
      title: EPIC,
    },
    {
      type: GAME_BACKLOG_FILTER_LEGENDARY,
      color: LEGENDARY_COLOR,
      title: LEGENDARY,
    },
    {
      type: GAME_BACKLOG_FILTER_MARVEL,
      color: MARVEL_COLOR,
      title: MARVEL,
    },
  ];

  const achievementTypeFilterClicked = (type) => {
    dispatch(actionChangeBacklogFilter(type));
  };

  const phaseItems = [
    { id: PHASE_ALL, title: PHASE_ALL_TITLE },
    { id: PHASE_STORY, title: PHASE_STORY_TITLE },
    { id: PHASE_EASY, title: PHASE_EASY_TITLE },
    { id: PHASE_MISSABLE, title: PHASE_MISSABLE_TITLE },
    { id: PHASE_HARD, title: PHASE_HARD_TITLE },
    { id: PHASE_GRIND, title: PHASE_GRIND_TITLE },
    { id: PHASE_ONLINE, title: PHASE_ONLINE_TITLE },
  ];

  return (
    <Container>
      <BacklogContainer>
        <BacklogHeader>
          <Title onClick={backlogSortChangeHandler}>
            {backLogTitleMap[gameBacklogSort ?? GAME_BACKLOG_SORT_ALL]}
          </Title>
          <AchievementFilter>
            {headerCategories.map((category) => {
              const { type, title, color } = category;
              return (
                <AchievementStatus
                  color={color}
                  onClick={() => {
                    achievementTypeFilterClicked(type);
                  }}
                >
                  <AchievementSelected
                    color={gameBacklogFilter == type ? color : "#00000000"}
                  ></AchievementSelected>
                  <AchievementIcon color={color}>
                    {getIcon("achievement")}
                  </AchievementIcon>
                  <AchievementCount color={color}>
                    {
                      getAchievementsForFilterType(
                        filteredAchievementsForSortAndFilterOption(
                          achievements,
                          GAME_BACKLOG_SORT_LOCKED,
                          GAME_BACKLOG_FILTER_ALL
                        ),
                        type
                      ).length
                    }
                  </AchievementCount>
                </AchievementStatus>
              );
            })}
          </AchievementFilter>
        </BacklogHeader>
        <BacklogContent>
          <InnerList>
            {filteredAchievements.map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={id}
                />
              );
            })}
          </InnerList>
        </BacklogContent>
      </BacklogContainer>
      <PhaseContainer>
        <PhaseHeader>
          {phaseItems.map((phase) => {
            const { id, title } = phase;
            return (
              <PhaseItem
                onDoubleClick={() => {
                  renamePhaseItem(phase);
                }}
              >
                {title.toUpperCase()}
              </PhaseItem>
            );
          })}
        </PhaseHeader>
      </PhaseContainer>
    </Container>
  );
}

const PhaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.5rem;
  border-bottom: 2px solid #009eff00;
  border-radius: 4px 4px 0px 0px;
  margin-right: 0.25rem;

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid #009eff;
  }
`;

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  flex-direction: row;
`;
