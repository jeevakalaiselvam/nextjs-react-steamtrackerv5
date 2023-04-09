import {
  PHASE_ALL,
  PHASE_COLLECTIBLE,
  PHASE_EASY,
  PHASE_GRIND,
  PHASE_HARD,
  PHASE_MISSABLE,
} from "@/helpers/constantHelper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AchievementCard from "./AchievementCard";
import { useDrop } from "react-dnd";

const KanbanItemContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 1rem;
`;

const KanbanTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: center;
`;
const KanbanCards = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-left: 1rem;
  flex-direction: column;
  overflow: scroll;
  min-height: 90vh;
  max-height: 90vh;
  justify-content: flex-start;
`;

export default function KanbanPhase({ phase, title }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "achievement",
    drop: () => ({ name: phase }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences, phaseInfo } = steamtracker;
  const { selectedGame } = preferences;

  const game = games?.find((game) => game.id == selectedGame);

  const { id, achievements } = game;

  return (
    <KanbanItemContainer ref={drop}>
      <KanbanTitle>{!isActive ? title : title}</KanbanTitle>
      <KanbanCards>
        {phase == PHASE_ALL &&
          achievements
            .filter(
              (ach) =>
                ach.achieved != 1 &&
                !(phaseInfo[id][PHASE_EASY] ?? []).includes(name) &&
                !(phaseInfo[id][PHASE_MISSABLE] ?? []).includes(name) &&
                !(phaseInfo[id][PHASE_GRIND] ?? []).includes(name) &&
                !(phaseInfo[id][PHASE_COLLECTIBLE] ?? []).includes(name) &&
                !(phaseInfo[id][PHASE_HARD] ?? []).includes(name)
            )
            .map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={id}
                  width={"100%"}
                  margin={"0.5rem 0rem"}
                />
              );
            })}
        {phase != PHASE_ALL &&
          achievements
            .filter(({ name }) => (phaseInfo[id][phase] ?? []).includes(name))
            .map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={id}
                  width={"100%"}
                  margin={"0.5rem 0rem"}
                />
              );
            })}
      </KanbanCards>
    </KanbanItemContainer>
  );
}
