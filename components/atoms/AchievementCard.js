import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 390px;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin-right: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  opacity: ${(props) => (props.achieved ? "0.15" : "1")};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Data = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0rem 1rem 0.5rem 1rem;
  flex: 1;
`;

const Description = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b0bec5;
  opacity: 0.75;
  flex: 1;
`;

export default function AchievementCard({ achievement, gameId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, preferences, hiddenDescriptions } = steamtracker;
  const { selectedGame, gameBacklogSort } = preferences;

  const {
    name,
    description,
    icon,
    icongray,
    percentage,
    achieved,
    unlocktime,
    displayName,
  } = achievement;

  return (
    <Container achieved={achieved}>
      <IconContainer>
        <Icon src={icon} />
      </IconContainer>
      <Data>
        <Title>{displayName}</Title>
        <Description>
          {hiddenDescriptions?.[gameId]?.[displayName?.toLowerCase().trim()] ??
            description ??
            "HIDDEN"}
        </Description>
      </Data>
    </Container>
  );
}
