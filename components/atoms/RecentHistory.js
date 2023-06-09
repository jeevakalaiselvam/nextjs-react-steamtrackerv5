import { getIcon } from "@/helpers/iconHelper";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { calculateRecentHistory } from "../../helpers/xpHelper";
import { setShowHistoryModal } from "../../store/actions/games.actions";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  align-items: center;
  padding: 1rem 0.25rem;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const LevelFragment = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const IconStart = styled.div`
  display: flex;
  color: #009eff;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 1.5rem;
`;

const IconEnd = styled.div`
  display: flex;
  align-items: center;
  color: #009eff;
  justify-content: center;
  flex: 1;
  font-size: 1.5rem;
`;

const Title = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const HistoryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0.25rem;
  overflow: scroll;
`;

const HistoryItem = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  align-items: center;
  margin: 0.5rem;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${(props) =>
    props.current ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.2)"};
  color: ${(props) => (props.current ? "#fefefe" : "#737c9d")};
  opacity: ${(props) => (props.transparent ? "0.25" : "1.0")};
  &:hover {
    background-color: #009eff;
    color: #fefefe;
  }
`;

const RecentHistory = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  const { recentHistory } = calculateRecentHistory(games);

  const historyDayClicked = (achievements) => {
    // dispatch(setShowHistoryModal(achievements));
  };

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <IconStart>{getIcon("sidebartitle")}</IconStart>
          <Title>History</Title>
          <IconEnd>{getIcon("sidebartitle")}</IconEnd>
        </Header>
        <HistoryContainer>
          {Object.keys(recentHistory).map((key, index) => {
            return (
              <HistoryItem
                transparent={recentHistory[key].length == 0}
                id={index}
                current={false}
                onClick={() => {
                  historyDayClicked(
                    recentHistory[key] ?? 0,
                    recentHistory[key][0]?.unlocktime ?? ""
                  );
                }}
              >
                {recentHistory[key].length}
              </HistoryItem>
            );
          })}
        </HistoryContainer>
      </LevelFragment>
    </Container>
  );
};

export default RecentHistory;
