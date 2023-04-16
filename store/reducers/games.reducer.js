import { addOrRemoveAchievementFromPhase } from "@/helpers/achievementHelper";
import { PHASE_ALL } from "@/helpers/constantHelper";
import { calculateLevel, refreshGameDataByGameId } from "@/helpers/gameHelper";
import * as TYPES from "../types/games.types";

const INITIAL_STATE = {
  games: [],
  hiddenDescriptions: {},
  preferences: {
    themeGameId: 1328670,
    selectedGame: "",
    selectedAchievement: {},
    selectedGameAll: {},
    gameBacklogSort: "",
    gameBacklogFilter: "",
    gameUnlockType: "",
    gameRightViewType: "",
    plannerViewType: "",
  },
  phaseInfo: {},
  phaseActive: PHASE_ALL,
  achievementPhaseVisible: false,
  pinnedAchievements: [],
  journal: {},
  currentProfileLevel: "0",
  toProfileNextLevel: "0",
  searchTerm: "",
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
        currentProfileLevel:
          calculateLevel(
            refreshGameDataByGameId(
              state.games,
              payload.gameId,
              payload.gameRefreshedData
            )
          )?.currentLevel ?? "0",
        toProfileNextLevel:
          calculateLevel(
            refreshGameDataByGameId(
              state.games,
              payload.gameId,
              payload.gameRefreshedData
            )
          )?.toNextlevel ?? "0",
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

    case TYPES.CHANGE_PLANNER_VIEWTYPE:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          plannerViewType: payload,
        },
      };

    case TYPES.ACHIEVEMENT_SELECTED:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          selectedAchievement: payload,
        },
      };

    case TYPES.ACHIEVEMENT_ADD_PINNED:
      return {
        ...state,
        pinnedAchievements: [...(state?.pinnedAchievements ?? []), payload],
      };

    case TYPES.ACHIEVEMENT_REMOVE_PINNED:
      return {
        ...state,
        pinnedAchievements: (state?.pinnedAchievements ?? []).filter(
          (achievement) => achievement != payload
        ),
      };

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

    case TYPES.ACHIEVEMENT_ADD_JOURNAL:
      return {
        ...state,
        journal: {
          ...(state?.journal ?? {}),
          [payload?.achievementId]: payload.journalData,
        },
      };

    case TYPES.SEARCH_TERM_CHANGED:
      return {
        ...state,
        searchTerm: payload,
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

    case TYPES.GAME_RIGHT_VIEW_TYPE_CHANGE:
      return {
        ...state,
        preferences: {
          ...(state?.preferences ?? {}),
          gameRightViewType: payload,
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
