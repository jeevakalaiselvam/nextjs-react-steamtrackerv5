import AchievementCard from "@/components/atoms/AchievementCard";
import AchievementIconBig from "@/components/atoms/AchievementIcon";
import KanbanPhase from "@/components/atoms/KanbanPhase";
import {
  filteredAchievementsForSortAndFilterOption,
  getAchievementsForFilterType,
} from "@/helpers/achievementHelper";
import { phaseItems } from "@/helpers/arrayHelper";
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
  PHASE_COLLECTIBLE,
  PHASE_EASY,
  PHASE_GRIND,
  PHASE_HARD,
  PHASE_MISSABLE,
  PHASE_ONLINE,
  PHASE_STORY,
  PLANNER_VIEWTYPE_ICONS,
  PLANNER_VIEWTYPE_KANBAN,
  PLANNER_VIEWTYPE_SPLIT,
} from "@/helpers/constantHelper";
import { getIcon } from "@/helpers/iconHelper";
import {
  actionChangeBacklogFilter,
  actionChangeGameBacklogSort,
  actionGameSelectPhaseActive,
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
  flex: 2;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PhaseContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  flex: 3;
`;

const KanbanContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  max-height: 90vh;
`;

const RemainingAchievements = styled.div`
  min-height: 10vh;
  max-height: 10vh;
  min-width: 0vw;
  max-width: 80vw;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const CompletedAchievements = styled.div`
  overflow: scroll;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: scroll;
  width: 100%;
  justify-content: flex-start;
`;

const RemainingTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompletedTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
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

const KanbanItemContainer = styled.div`
  display: flex;
  min-width: 333px;
  max-width: 333px;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function GameContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences, hiddenDescriptions, phaseInfo, phaseActive } =
    steamtracker;
  const { selectedGame, gameBacklogSort, gameBacklogFilter, plannerViewType } =
    preferences;

  const game = games?.find((game) => game.id == selectedGame);

  const { id, achievements } = game;

  const filteredAchievements = React.useMemo(() => {
    const filtered = filteredAchievementsForSortAndFilterOption(
      achievements,
      gameBacklogSort ?? GAME_BACKLOG_SORT_ALL,
      gameBacklogFilter ?? GAME_BACKLOG_FILTER_ALL
    );
    return filtered;
  }, [achievements, gameBacklogSort, gameBacklogFilter]);

  const phaseFilteredAchievements = React.useMemo(() => {
    let achievementsInPhase = phaseInfo[id]?.[phaseActive] ?? [];
    const filtered = achievements.filter((achievement) => {
      if (phaseActive !== PHASE_ALL) {
        if (achievementsInPhase.includes(achievement.name)) {
          return true;
        }
      } else {
        if (
          !(phaseInfo[id][PHASE_STORY] ?? []).includes(achievement.name) &&
          !(phaseInfo[id][PHASE_EASY] ?? []).includes(achievement.name) &&
          !(phaseInfo[id][PHASE_MISSABLE] ?? []).includes(achievement.name) &&
          !(phaseInfo[id][PHASE_COLLECTIBLE] ?? []).includes(
            achievement.name
          ) &&
          !(phaseInfo[id][PHASE_GRIND] ?? []).includes(achievement.name) &&
          !(phaseInfo[id][PHASE_HARD] ?? []).includes(achievement.name) &&
          !(phaseInfo[id][PHASE_ONLINE] ?? []).includes(achievement.name) &&
          achievement.achieved != 1
        ) {
          return true;
        }
      }
    });
    return filtered;
  }, [
    achievements,
    phaseActive,
    id,
    phaseInfo[id]?.[PHASE_STORY] ?? [],
    phaseInfo[id]?.[PHASE_EASY] ?? [],
    phaseInfo[id]?.[PHASE_MISSABLE] ?? [],
    phaseInfo[id]?.[PHASE_GRIND] ?? [],
    phaseInfo[id]?.[PHASE_COLLECTIBLE] ?? [],
    phaseInfo[id]?.[PHASE_HARD] ?? [],
    phaseInfo[id]?.[PHASE_ONLINE] ?? [],
  ]);

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

  return (
    <Container>
      {plannerViewType === PLANNER_VIEWTYPE_SPLIT && (
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
      )}
      {plannerViewType === PLANNER_VIEWTYPE_SPLIT && (
        <PhaseContainer>
          <PhaseHeader>
            {phaseItems.map((phase) => {
              const { id, title } = phase;
              const phaseCount =
                id !== PHASE_ALL
                  ? achievements.filter((achievement) =>
                      (phaseInfo?.[selectedGame]?.[id] ?? []).includes(
                        achievement.name
                      )
                    ).length
                  : achievements.filter(
                      (achievement) => achievement.achieved != 1
                    ).length;

              return (
                <PhaseItem
                  active={phaseActive == id}
                  onClick={() => {
                    dispatch(actionGameSelectPhaseActive(id));
                  }}
                >
                  {title.toUpperCase()} - {phaseCount}
                </PhaseItem>
              );
            })}
          </PhaseHeader>
          <PhaseContent>
            {phaseFilteredAchievements.map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={id}
                />
              );
            })}
          </PhaseContent>
        </PhaseContainer>
      )}
      {plannerViewType === PLANNER_VIEWTYPE_KANBAN && (
        <KanbanContainer>
          <KanbanItemContainer>
            <KanbanPhase phase={PHASE_ALL} title={"BACKLOG"} />
          </KanbanItemContainer>
          <KanbanItemContainer>
            <KanbanPhase phase={PHASE_EASY} title={"EASY"} />
          </KanbanItemContainer>
          <KanbanItemContainer>
            <KanbanPhase phase={PHASE_MISSABLE} title={"MISSABLE"} />
          </KanbanItemContainer>
          <KanbanItemContainer>
            <KanbanPhase phase={PHASE_COLLECTIBLE} title={"COLLECTIBLE"} />
          </KanbanItemContainer>
          <KanbanItemContainer>
            <KanbanPhase phase={PHASE_HARD} title={"HARD"} />
          </KanbanItemContainer>
          <KanbanItemContainer>
            <KanbanPhase phase={PHASE_GRIND} title={"GRIND"} />
          </KanbanItemContainer>
        </KanbanContainer>
      )}
      {plannerViewType === PLANNER_VIEWTYPE_ICONS && (
        <IconContainer>
          <RemainingTitle>Remaining Achievements</RemainingTitle>
          <RemainingAchievements>
            {achievements?.length > 0 &&
              achievements
                .filter((ach) => ach.achieved != 1)
                .map((achievement) => {
                  return (
                    <AchievementIconBig
                      gameId={id}
                      key={achievement.name}
                      achievement={achievement}
                      margin={"1rem 1rem 0 0"}
                    />
                  );
                })}
          </RemainingAchievements>
          <CompletedTitle>Completed Achievements</CompletedTitle>
          <CompletedAchievements>
            {achievements?.length > 0 &&
              achievements
                .filter((ach) => ach.achieved == 1)
                .map((achievement) => {
                  return (
                    <AchievementIconBig
                      gameId={id}
                      key={achievement.name}
                      achievement={achievement}
                      margin={"1rem 1rem 0 0"}
                    />
                  );
                })}
          </CompletedAchievements>
        </IconContainer>
      )}
    </Container>
  );
}

const PhaseContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 0.5rem;
  max-height: 90vh;
  overflow: scroll;
  padding-bottom: 5rem;
`;

const PhaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.5rem;
  border-bottom: ${(props) =>
    props.active ? "2px solid #009eff" : "2px solid #009eff00"};
  border-radius: 4px 4px 0px 0px;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid #009eff;
  }
`;

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  flex-direction: row;
  padding-bottom: 3.8rem;
`;
