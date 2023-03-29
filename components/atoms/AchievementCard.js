import {
  getColorForPercentage,
  getXPForPercentage,
} from "@/helpers/achievementHelper";
import { getIcon } from "@/helpers/iconHelper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width ?? "375px"};
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin: ${(props) => props.margin ?? "1rem 1rem 0rem 0rem"};
  border-radius: 4px;
  padding: 1rem;
  align-self: stretch;
  opacity: ${(props) => (props.achieved ? "0.15" : "1")};
  position: relative;

  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
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
`;

const Description = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #b0bec5;
  opacity: 0.75;
  flex: 1;
`;

const XPContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: ${(props) => props.color};
`;

const XPIcon = styled.div`
  display: flex;
  font-size: 1.75rem;
  align-items: center;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.25rem;
  justify-content: center;
`;

export default function AchievementCard({
  achievement,
  gameId,
  disableOpacity,
  margin,
  width,
}) {
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
    <Container
      achieved={!disableOpacity && achieved}
      margin={margin}
      width={width}
    >
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
      <XPContainer color={getColorForPercentage(percentage)}>
        <XPData>{getXPForPercentage(percentage)}</XPData>
        <XPIcon>{getIcon("achievement")}</XPIcon>
      </XPContainer>
    </Container>
  );
}
