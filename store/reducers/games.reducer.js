import { addOrRemoveAchievementFromPhase } from "@/helpers/achievementHelper";
import { PHASE_ALL } from "@/helpers/constantHelper";
import { refreshGameDataByGameId } from "@/helpers/gameHelper";
import * as TYPES from "../types/games.types";

const INITIAL_STATE = {
  games: [],
  hiddenDescriptions: {},
  preferences: {
    themeGameId: 1328670,
    selectedGame: "",
    selectedGameAll: {},
    gameBacklogSort: "",
    gameBacklogFilter: "",
    gameUnlockType: "",
  },
  phaseInfo: {},
  phaseActive: PHASE_ALL,
  achievementPhaseVisible: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPES.REFRESH_SET_GAME_DATA:
      return {
        ...state,
        games: refreshGameDataByGameId(
          state.games,
          payload.gameId,
          payload.gameRefreshedData
        ),
        lastUnlockedTime: payload.lastUnlockedTime,
      };

    case TYPES.GAME_ADD_ACHIEVEMENT_PHASE:
      const gameId = payload.gameId;
      const phase = payload.phase;
      const achievementId = payload.achievementId;

      return addOrRemoveAchievementFromPhase(
        state,
        phase,
        gameId,
        achievementId
      );

    case TYPES.ACHIEVEMENT_TOGGLE_PHASE_VISIBILITY:
      return {
        ...state,
        achievementPhaseVisible: payload,
      };

    case TYPES.GAME_SELECT_PHASE_ACTIVE:
      return {
        ...state,
        phaseActive: payload,
      };

    case TYPES.SET_HIDDEN_DESC_GAME:
      return {
        ...state,
        hiddenDescriptions: {
          ...(state?.hiddenDescriptions ?? {}),
          [payload.gameId]: payload.achievements,
        },
      };

    case TYPES.GAME_UNLOCKED_TYPE_CHANGE:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          gameUnlockType: payload,
        },
      };

    case TYPES.GAME_BACKLOG_FILTER_CHANGE:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          gameBacklogFilter: payload,
        },
      };

    case TYPES.GAME_BACKLOG_SORT_CHANGE:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          gameBacklogSort: payload,
        },
      };

    case TYPES.SET_SELECTED_GAME:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          selectedGame: payload,
        },
      };

    case TYPES.SET_SELECTED_GAME_ALL:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          selectedGameAll: payload,
        },
      };

    case TYPES.CHANGE_THEME_ID:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          themeGameId: payload,
        },
      };

    case TYPES.FETCH_ALL_GAMES_REQUEST:
      return {
        ...state,
        games: [],
      };
    case TYPES.FETCH_ALL_GAMES_SUCCESS:
      return {
        ...state,
        games: payload.sort(
          (game1, game2) => game2.completion - game1.completion
        ),
      };
    case TYPES.FETCH_ALL_GAMES_ERROR:
      return {
        ...state,
        games: [],
      };

    default:
      return state;
  }
};

export default reducer;
