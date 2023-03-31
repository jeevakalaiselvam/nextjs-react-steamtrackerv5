import {
  getColorForPercentage,
  getXPForPercentage,
} from "@/helpers/achievementHelper";
import { phaseItems } from "@/helpers/arrayHelper";
import { PHASE_ALL, PHASE_ALL_TITLE } from "@/helpers/constantHelper";
import { getIcon } from "@/helpers/iconHelper";
import {
  actionAchievementSelected,
  actionAchievementTogglePhaseVisibility,
  actionAddAchievementPinnned,
  actionGameAddAchievementPhase,
  actionRemoveAchievementPinnned,
} from "@/store/actions/games.actions";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PhaseButton from "./PhaseButton";

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width ?? "370px"};
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin: ${(props) => props.margin ?? "0.5rem 0.5rem 0rem 0rem"};
  border-radius: 4px;
  align-self: stretch;
  padding: 1rem 1rem 3rem 1rem;
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

const PinnedData = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  position: absolute;
  bottom: 0.5rem;
  left: 1rem;
  color: ${(props) => (props.isPinned ? "#009EFF" : "")};

  &:hover {
    color: #009eff;
  }
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
  const { selectedGame, selectedGameAll, gameBacklogSort } = preferences;

  const [hovered, setHovered] = useState(false);

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

  const phaseSelectedForAchievment = (phase, gameId) => {
    dispatch(actionGameAddAchievementPhase(gameId, phase.id, name));
  };

  const addToPinOrRemoveHandler = () => {
    if (!(pinnedAchievements ?? []).includes(name)) {
      dispatch(actionAddAchievementPinnned(name));
    } else {
      dispatch(actionRemoveAchievementPinnned(name));
    }
  };

  return (
    <Container
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        dispatch(actionAchievementSelected(achievement));
      }}
      achieved={!disableOpacity && achieved}
      margin={margin}
      width={width}
    >
      <IconContainer>
        <Icon src={icon}></Icon>
      </IconContainer>
      <Data>
        <Title
          onClick={() => {
            if (window !== "undefined") {
              const searchQuery = `${displayName} achievement ${selectedGameAll.name} `;
              window.open(`https://www.google.com/search?q=${searchQuery}`);
              // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
            }
          }}
        >
          {displayName}
        </Title>
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
      <PhaseActivate
        onClick={() => {
          dispatch(
            actionAchievementTogglePhaseVisibility(!achievementPhaseVisible)
          );
        }}
      >
        {getIcon("phaseactivate")}
      </PhaseActivate>
      {achievementPhaseVisible && (
        <PhaseSelection hovered={hovered}>
          {phaseItems.map((phase) => {
            if (phase.title !== PHASE_ALL_TITLE) {
              return (
                <PhaseButton
                  active={(
                    (phaseInfo ?? {})?.[gameId]?.[phase.id] ?? []
                  ).includes(name)}
                  phase={phase}
                  onClick={() => {
                    phaseSelectedForAchievment(phase, selectedGame);
                  }}
                />
              );
            }
          })}
        </PhaseSelection>
      )}
      {!achievementPhaseVisible && (
        <PinnedData
          isPinned={(pinnedAchievements ?? []).includes(name)}
          onClick={addToPinOrRemoveHandler}
        >
          {getIcon("pinnedonly")}
        </PinnedData>
      )}
    </Container>
  );
}

const PhaseSelection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 1rem;
  display: flex;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  align-items: center;
  justify-content: center;
  transform: translateY(2px);
  opacity: ${(props) => (props.hovered ? "1" : "0.25")};
`;

const PhaseActivate = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  align-items: center;
  justify-content: center;
  transform: translateY(-1px);

  &:hover {
    color: #009eff;
  }
`;
