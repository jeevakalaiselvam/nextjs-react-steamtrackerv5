import { API_GET_GAMES } from "@/helpers/urlHelper";
import axios from "axios";
import * as TYPES from "../types/games.types";

export const actionFetchAllGames = () => {
  return (dispatch) => {
    dispatch({ type: TYPES.FETCH_ALL_GAMES_REQUEST });
    return axios.get(API_GET_GAMES).then(
      (data) => {
        dispatch({
          type: TYPES.FETCH_ALL_GAMES_SUCCESS,
          payload: data.data.data,
        });
      },
      (error) => {
        dispatch({ type: TYPES.FETCH_ALL_GAMES_ERROR, payload: error });
      }
    );
  };
};

export const actionRefreshGameData = (gameId, gameRefreshedData) => {
  let lastUnlockedTime = gameRefreshedData?.achievements.sort(
    (ach1, ach2) => ach2.unlocktime - ach1.unlocktime
  )[0]?.unlocktime;
  return (dispatch) => {
    return dispatch({
      type: TYPES.REFRESH_SET_GAME_DATA,
      payload: { gameId, gameRefreshedData, lastUnlockedTime },
    });
  };
};

export const actionSearchTermChanged = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.SEARCH_TERM_CHANGED,
      payload: searchTerm,
    });
  };
};

export const actionAchievementSelected = (achievement) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.ACHIEVEMENT_SELECTED,
      payload: achievement,
    });
  };
};

export const actionAchievementTogglePhaseVisibility = (isVisible) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.ACHIEVEMENT_TOGGLE_PHASE_VISIBILITY,
      payload: isVisible,
    });
  };
};

export const actionGameSelectPhaseActive = (phase) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_SELECT_PHASE_ACTIVE,
      payload: phase,
    });
  };
};

export const actionTogglePlannerViewType = (viewType) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.CHANGE_PLANNER_VIEWTYPE,
      payload: viewType,
    });
  };
};

export const actionGameUnlockViewTypeChange = (viewType) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_UNLOCK_VIEW_TYPE_CHANGE,
      payload: viewType,
    });
  };
};

export const actionAddAchievementPinnned = (achievementId) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.ACHIEVEMENT_ADD_PINNED,
      payload: achievementId,
    });
  };
};

export const actionRemoveAchievementPinnned = (achievementId) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.ACHIEVEMENT_REMOVE_PINNED,
      payload: achievementId,
    });
  };
};

export const actionGameAddAchievementPhase = (gameId, phase, achievementId) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_ADD_ACHIEVEMENT_PHASE,
      payload: { gameId, phase, achievementId },
    });
  };
};

export const actionSetHiddenDescriptionForGame = (gameId, achievements) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.SET_HIDDEN_DESC_GAME,
      payload: { gameId, achievements },
    });
  };
};

export const actionUnlockedTypeChange = (unlockType) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_UNLOCKED_TYPE_CHANGE,
      payload: unlockType,
    });
  };
};

export const actionGameRightTypeChange = (unlockType) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_RIGHT_VIEW_TYPE_CHANGE,
      payload: unlockType,
    });
  };
};

export const actionAchievementAddJournal = (achievementId, journalData) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.ACHIEVEMENT_ADD_JOURNAL,
      payload: { achievementId, journalData },
    });
  };
};

export const actionChangeBacklogFilter = (sortOption) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_BACKLOG_FILTER_CHANGE,
      payload: sortOption,
    });
  };
};

export const actionChangeGameBacklogSort = (sortOption) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.GAME_BACKLOG_SORT_CHANGE,
      payload: sortOption,
    });
  };
};

export const actionChangeThemeId = (themeId) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.CHANGE_THEME_ID,
      payload: themeId,
    });
  };
};

export const actionSetSelectedGame = (gameId) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.SET_SELECTED_GAME,
      payload: gameId,
    });
  };
};

export const actionSetSelectedGameAll = (game) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.SET_SELECTED_GAME_ALL,
      payload: game,
    });
  };
};
