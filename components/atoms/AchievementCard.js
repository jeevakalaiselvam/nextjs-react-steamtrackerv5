import {
  getColorForPercentage,
  getXPForPercentage,
} from "@/helpers/achievementHelper";
import { getIcon } from "@/helpers/iconHelper";
import {
  actionAchievementSelected,
  actionAddAchievementPinnned,
  actionGameAddAchievementPhase,
  actionRemoveAchievementPinnned,
} from "@/store/actions/games.actions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useDrag } from "react-dnd";

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width ?? "370px"};
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  margin: ${(props) => props.margin ?? "0.5rem 0.5rem 0rem 0rem"};
  border-radius: 4px;
  align-self: stretch;
  padding: 1rem 1rem 1rem 1rem;
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
  background-color: red;
  height: 60px;
  background: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
`;

const PinnedData = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.25);
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "achievement",
    item: { name: achievement.name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        dispatch(
          actionGameAddAchievementPhase(gameId, dropResult.name, item.name)
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

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

  const [showPin, setShowPin] = useState(false);

  return (
    <Container
      ref={drag}
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
        <Icon
          src={icon}
          onMouseEnter={() => {
            setShowPin(true);
          }}
          onMouseLeave={() => {
            setShowPin(false);
          }}
        >
          {showPin && (
            <PinnedData
              isPinned={(pinnedAchievements ?? []).includes(name)}
              onClick={addToPinOrRemoveHandler}
            >
              {getIcon("pinnedonly")}
            </PinnedData>
          )}
        </Icon>
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
    </Container>
  );
}
