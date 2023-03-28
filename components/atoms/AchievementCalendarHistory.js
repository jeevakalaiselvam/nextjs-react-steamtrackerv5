import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  justify-content: center;
`;

const AchievementDayCount = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0.25rem;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

export default function AchievementCalendarHistory() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  const router = useRouter();
  const { gameId } = router.query;

  return (
    <Container>
      {games &&
        Object.keys(achievementsMapper).map((key) => {
          return (
            <AchievementDayCount onClick={() => {}}>
              {achievementsMapper[key].length || 0}
            </AchievementDayCount>
          );
        })}
    </Container>
  );
}
