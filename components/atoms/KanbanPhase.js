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
import { getIcon } from "@/helpers/iconHelper";

const KanbanItemContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const KanbanTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  opacity: 0.2;
  justify-content: center;
`;
const KanbanCards = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  width: 100%;
  flex-direction: column;
  overflow: scroll;
  min-height: 90vh;
  max-height: 90vh;
  justify-content: flex-start;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Star1 = styled.div`
  display: flex;
  margin-right: 0.25rem;
  align-items: center;
  font-size: 1rem;
  justify-content: center;
`;

const Star2 = styled.div`
  display: flex;
  margin-right: 0.25rem;
  align-items: center;
  font-size: 1.5rem;
  justify-content: center;
`;

const Star3 = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-right: 0.5rem;
  justify-content: center;
`;

const Star4 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  font-size: 2rem;
  justify-content: center;
`;

const Star5 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
  font-size: 1.5rem;
  justify-content: center;
`;

const Star6 = styled.div`
  display: flex;
  margin-left: 0.25rem;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
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
      <KanbanTitle>
        <Star1>{getIcon("phase")}</Star1>
        <Star2>{getIcon("phase")}</Star2>
        <Star3>{getIcon("phase")}</Star3>
        <Title>
          {title +
            ` [ ${
              phase == PHASE_ALL
                ? achievements.filter(
                    (ach) =>
                      ach.achieved != 1 &&
                      !(phaseInfo[id]?.[PHASE_EASY] ?? []).includes(ach.name) &&
                      !(phaseInfo[id]?.[PHASE_MISSABLE] ?? []).includes(
                        ach.name
                      ) &&
                      !(phaseInfo[id]?.[PHASE_GRIND] ?? []).includes(
                        ach.name
                      ) &&
                      !(phaseInfo[id]?.[PHASE_COLLECTIBLE] ?? []).includes(
                        ach.name
                      ) &&
                      !(phaseInfo[id]?.[PHASE_HARD] ?? []).includes(ach.name)
                  ).length
                : achievements.filter(({ name }) =>
                    (phaseInfo[id]?.[phase] ?? []).includes(name)
                  ).length
            } ]`}
        </Title>
        <Star4>{getIcon("phase")}</Star4>
        <Star5>{getIcon("phase")}</Star5>
        <Star6>{getIcon("phase")}</Star6>
      </KanbanTitle>
      <KanbanCards>
        {phase == PHASE_ALL &&
          achievements
            .filter(
              (ach) =>
                ach.achieved != 1 &&
                !(phaseInfo[id]?.[PHASE_EASY] ?? []).includes(ach.name) &&
                !(phaseInfo[id]?.[PHASE_MISSABLE] ?? []).includes(ach.name) &&
                !(phaseInfo[id]?.[PHASE_GRIND] ?? []).includes(ach.name) &&
                !(phaseInfo[id]?.[PHASE_COLLECTIBLE] ?? []).includes(
                  ach.name
                ) &&
                !(phaseInfo[id]?.[PHASE_HARD] ?? []).includes(ach.name)
            )
            .sort((ach1, ach2) => ach2.percentage - ach1.percentage)
            .map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={id}
                  width={"100%"}
                  margin={"0.3rem 0rem"}
                />
              );
            })}
        {phase != PHASE_ALL &&
          achievements
            .filter(({ name }) => (phaseInfo[id]?.[phase] ?? []).includes(name))
            .sort((ach1, ach2) => ach2.percentage - ach1.percentage)
            .map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={id}
                  width={"100%"}
                  margin={"0.3rem 0rem"}
                />
              );
            })}
      </KanbanCards>
    </KanbanItemContainer>
  );
}
