import AchievementCard from "@/components/atoms/AchievementCard";
import { filteredAchievementsForSortOption } from "@/helpers/achievementHelper";
import { GAME_BACKLOG_SORT_ALL } from "@/helpers/constantHelper";
import { actionSetHiddenDescriptionForGame } from "@/store/actions/games.actions";
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
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  min-height: 90vh;
  max-height: 90vh;
`;

const PhaseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  }, [achievements]);

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

  return (
    <Container>
      <BacklogContainer>
        <BacklogHeader>
          {filteredAchievements.map((achievement) => {
            return (
              <AchievementCard
                achievement={achievement}
                key={achievement.name}
                gameId={id}
              />
            );
          })}
        </BacklogHeader>
      </BacklogContainer>
      <PhaseContainer>
        <PhaseHeader></PhaseHeader>
      </PhaseContainer>
    </Container>
  );
}
