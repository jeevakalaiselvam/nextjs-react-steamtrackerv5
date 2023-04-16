import { COMMON_COLOR } from "@/helpers/colorHelper";
import { getIcon } from "@/helpers/iconHelper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 100px;
  min-height: 100px;
  margin: ${(props) => (props.margin ? props.margin : "")};
  position: relative;
  overflow: hidden;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: url(${(props) => props.src});
  background-size: contain;
  position: relative;
`;

const Description = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  justify-content: center;
  position: absolute;
  bottom: ${(props) => (props.hover ? "0px" : "-500px")};
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  font-size: 1.25rem;
  text-align: center;
  max-width: 220px;
  backdrop-filter: blur(20px);
  word-wrap: break-word;
  text-align-last: center;
  overflow: scroll;
`;

const Completed = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default function AchievementIconBig({ achievement, margin, gameId }) {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const {
    games,
    preferences,
    hiddenDescriptions,
    achievementPhaseVisible,
    phaseInfo,
    pinnedAchievements,
  } = steamtracker;

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

  const [hover, setHover] = useState(false);

  return (
    <Container
      margin={margin}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <Description hover={hover}>
        {hiddenDescriptions?.[gameId]?.[displayName?.toLowerCase().trim()] ??
          description ??
          "HIDDEN"}
      </Description>
      <Icon src={icon} achieved={achieved}></Icon>
    </Container>
  );
}
