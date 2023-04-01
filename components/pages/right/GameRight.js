import AchievementCard from "@/components/atoms/AchievementCard";
import {
  getaUnlockedAchievementsByType,
  MONTH,
  TODAY,
} from "@/helpers/achievementHelper";
import { gameRightTabs } from "@/helpers/arrayHelper";
import { RARE_COLOR } from "@/helpers/colorHelper";
import {
  GAME_RIGHT_TAB_JOURNAL,
  GAME_RIGHT_TAB_PINNED,
  GAME_RIGHT_TAB_UNLOCKS,
  GAME_UNLOCK_TYPE_ALL,
  GAME_UNLOCK_TYPE_MONTH,
  GAME_UNLOCK_TYPE_TODAY,
  GAME_UNLOCK_TYPE_WEEK,
  GAME_UNLOCK_VIEW_TYPE_PINNED,
  GAME_UNLOCK_VIEW_TYPE_UNLOCK,
} from "@/helpers/constantHelper";
import { getIcon } from "@/helpers/iconHelper";
import {
  actionAchievementAddJournal,
  actionGameRightTypeChange,
  actionRefreshGameData,
  actionUnlockedTypeChange,
} from "@/store/actions/games.actions";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
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
`;

const Title = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  font-size: 1.5rem;

  &:hover {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const ViewType = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    color: #009eff;
  }
`;

const TypeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const TypeTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Refresh = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  flex: 1;
  font-size: 1.75rem;
  padding: 1rem;
`;

const InnerIcon = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-end;
  font-size: 1.75rem;

  -webkit-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  -moz-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  -ms-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  -o-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  animation: ${(props) => (props.rotate ? "rotating 2s linear infinite" : "")};

  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  &:hover {
    color: ${(props) => props.color};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.75);
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
  const { games, preferences, pinnedAchievements, journal } = steamtracker;
  const {
    selectedGame,
    selectedAchievement,
    gameUnlockType,
    gameRightViewType,
  } = preferences;

  const game = games.find((g) => g.id == selectedGame);
  const { gameId } = router.query;

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
    GAME_UNLOCK_TYPE_ALL: "Unlocked - All",
  };

  const unlockTypeChange = () => {
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_TODAY) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_WEEK));
    }
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_WEEK) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_MONTH));
    }
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_MONTH) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_ALL));
    }
    if ((gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY) == GAME_UNLOCK_TYPE_ALL) {
      dispatch(actionUnlockedTypeChange(GAME_UNLOCK_TYPE_TODAY));
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const refreshClickHandler = async () => {
    dispatch(actionGameRightTypeChange(GAME_RIGHT_TAB_UNLOCKS));
    setRefreshing(true);
    const response = await axios.get(`/api/refresh/${gameId}`);
    const gameRefreshedData = response.data.data;
    dispatch(actionRefreshGameData(gameId, { ...gameRefreshedData }));
    setRefreshing(false);
  };

  const gameTabClicked = (rightTab) => {
    const { id, title } = rightTab;
    dispatch(actionGameRightTypeChange(id));
  };

  const [saveText, setSaveText] = useState("SAVE");
  const [journalData, setJournalData] = useState(
    (journal ?? {})?.[selectedAchievement?.name] ?? ""
  );

  const journalDataChanged = (e) => {
    setJournalData(e.target.value);
  };

  const saveJournalForAchievement = () => {
    setSaveText("SAVING..");
    dispatch(
      actionAchievementAddJournal(selectedAchievement?.name, journalData)
    );
    setTimeout(() => {
      setSaveText("SAVED!!");
    }, 500);
    setTimeout(() => {
      setSaveText("SAVE");
    }, 1000);
  };

  useEffect(() => {
    setJournalData((journal ?? {})?.[selectedAchievement?.name] ?? "");
  }, [(journal ?? {})?.[selectedAchievement?.name] ?? ""]);

  return (
    <Container>
      <Header>
        {gameRightTabs.map((gameRightTab) => {
          const { id, title } = gameRightTab;
          return (
            <PhaseItem
              active={gameRightViewType == id}
              onClick={() => {
                gameTabClicked(gameRightTab);
              }}
            >
              {title}
            </PhaseItem>
          );
        })}

        <Refresh>
          <InnerIcon
            color={RARE_COLOR}
            onClick={refreshClickHandler}
            rotate={refreshing}
          >
            {getIcon("refresh")}
          </InnerIcon>
        </Refresh>
      </Header>
      <UnlockedAchievement>
        {gameRightViewType == GAME_RIGHT_TAB_UNLOCKS && (
          <Title onClick={unlockTypeChange} color={RARE_COLOR}>
            {unlockTextMap[gameUnlockType ?? GAME_UNLOCK_TYPE_TODAY]}
          </Title>
        )}
        {gameRightViewType == GAME_RIGHT_TAB_UNLOCKS &&
          achievementsUnlockedToday.map((achievement) => {
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
        {gameRightViewType == GAME_RIGHT_TAB_PINNED &&
          game?.achievements
            .sort((ach1, ach2) => ach2.percentage - ach1.percentage)
            .filter((achievement) =>
              (pinnedAchievements ?? []).includes(achievement.name)
            )
            .map((achievement) => {
              return (
                <AchievementCard
                  achievement={achievement}
                  key={achievement.name}
                  gameId={game.id}
                  margin={"0.5rem 0rem 0rem 0rem"}
                  width={"370px"}
                />
              );
            })}
        {gameRightViewType == GAME_RIGHT_TAB_JOURNAL && (
          <JournalContainer>
            <JournalHeader>
              <JournalTitle>Journal Entry</JournalTitle>
              <JournalSave>
                <SaveButton onClick={saveJournalForAchievement}>
                  {saveText}
                </SaveButton>
              </JournalSave>
            </JournalHeader>
            <textarea
              value={journalData}
              placeholder={"No Journal"}
              onChange={journalDataChanged}
            />
          </JournalContainer>
        )}
      </UnlockedAchievement>
    </Container>
  );
}

const PhaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.5rem;
  border-bottom: ${(props) =>
    props.active ? "2px solid #009eff" : "2px solid #009eff00"};
  border-radius: 4px 4px 0px 0px;
  margin-right: 0.5rem;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid #009eff;
  }
`;

const JournalContainer = styled.div`
  display: flex;
  min-width: 380px;
  align-items: center;
  min-height: 95vh;
  max-height: 95vh;
  justify-content: flex-start;
  flex-direction: column;

  & textarea {
    min-width: 100%;
    min-height: 92vh;
    max-height: 92vh;
    background-color: rgba(0, 0, 0, 0.5);
    outline: none;
    border: none;
    padding: 1rem;
  }
`;

const JournalHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const JournalTitle = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 0.5rem;
  align-items: center;
`;

const JournalSave = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem;
  flex: 1;
`;

const SaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 0.1rem 0.5rem;
  background-color: #009eff;
  cursor: pointer;
`;
