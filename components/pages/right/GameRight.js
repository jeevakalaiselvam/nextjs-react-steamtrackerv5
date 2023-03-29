import AchievementCard from "@/components/atoms/AchievementCard";
import {
  getaUnlockedAchievementsByType,
  MONTH,
  TODAY,
} from "@/helpers/achievementHelper";
import { RARE_COLOR } from "@/helpers/colorHelper";
import {
  GAME_UNLOCK_TYPE_MONTH,
  GAME_UNLOCK_TYPE_TODAY,
  GAME_UNLOCK_TYPE_WEEK,
} from "@/helpers/constantHelper";
import { getIcon } from "@/helpers/iconHelper";
import { actionUnlockedTypeChange } from "@/store/actions/games.actions";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.5rem;

  &:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const Refresh = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 1rem;
  font-size: 1.75rem;
  padding: 1rem;

  &:hover {
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

const UnlockedAchievement = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 95vh;
  max-height: 95vh;
  overflow: scroll;
`;

export default function GameRight() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences } = steamtracker;
  const { selectedGame, gameUnlockType } = preferences;

  const game = games.find((g) => g.id == selectedGame);

  const achievementsUnlockedToday = useMemo(() => {
    let unlockedToday = getaUnlockedAchievementsByType(
      game.achievements,
      gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY
    );
    unlockedToday = unlockedToday.sort(
      (ach1, ach2) => ach2.unlocktime - ach1.unlocktime
    );
    return unlockedToday;
  }, [selectedGame, game.achievements, gameUnlockType]);

  const unlockTextMap = {
    GAME_UNLOCK_TYPE_TODAY: "Unlocked - Today",
    GAME_UNLOCK_TYPE_WEEK: "Unlocked - Week",
    GAME_UNLOCK_TYPE_MONTH: "Unlocked - Month",
  };

  const unlockTypeChange = () => {
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_TODAY) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_WEEK));
    }
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_WEEK) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_MONTH));
    }
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_MONTH) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_TODAY));
    }
  };

  return (
    <Container>
      <Header>
        <Title onClick={unlockTypeChange} color={RARE_COLOR}>
          {unlockTextMap[gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY]}
        </Title>
        <Refresh color={RARE_COLOR}>{getIcon("refresh")}</Refresh>
      </Header>
      <UnlockedAchievement>
        {achievementsUnlockedToday.map((achievement) => {
          return (
            <AchievementCard
              achievement={achievement}
              key={achievement.name}
              gameId={game.id}
              disableOpacity={true}
              margin={"1rem 0rem 0rem 0rem"}
              width={"370px"}
            />
          );
        })}
      </UnlockedAchievement>
    </Container>
  );
}
