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

export const actionSetHiddenDescriptionForGame = (gameId, achievements) => {
  return (dispatch) => {
    return dispatch({
      type: TYPES.SET_HIDDEN_DESC_GAME,
      payload: { gameId, achievements },
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
