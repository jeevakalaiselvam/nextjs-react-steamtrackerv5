import {
  BACKLOG,
  BRONZE,
  BRONZE_COLOR,
  COMMON,
  COMMON_COLOR,
  EPIC,
  EPIC_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL,
  MARVEL_COLOR,
  RARE,
  RARE_COLOR,
} from "./colorHelper";
import {
  GAME_CATEGORY_BACKLOG,
  GAME_CATEGORY_BRONZE,
  GAME_CATEGORY_COMMON,
  GAME_CATEGORY_EPIC,
  GAME_CATEGORY_LEGENDARY,
  GAME_CATEGORY_MARVEL,
  GAME_CATEGORY_RARE,
} from "./constantHelper";

export const filterGamesForCategory = (games, categoryId) => {
  let filteredGamesForCategory = [];
  let gamesCountForCategory = 0;

  switch (categoryId) {
    case BACKLOG:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion > 0 && game.completion < 10) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case MARVEL:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion == 100) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case LEGENDARY:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 90 && game.completion < 100) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case EPIC:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 75 && game.completion < 90) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case RARE:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 50 && game.completion < 75) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case COMMON:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 25 && game.completion < 50) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case BRONZE:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 10 && game.completion < 25) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    default:
      gamesCountForCategory++;
      filteredGamesForCategory = games;
      break;
  }

  const gamesSortedByLastPlayed = filteredGamesForCategory.sort(
    (game1, game2) => game2.lastPlayed - game1.lastPlayed
  );

  return {
    filteredGamesForCategory: gamesSortedByLastPlayed,
    gamesCountForCategory,
  };
};

export const calculaNextStageForGame = (game) => {
  let nextStage = {
    NEXT: 0,
    BRONZE: 0,
    COMMON: 0,
    RARE: 0,
    EPIC: 0,
    LEGENDARY: 0,
    MARVEL: 0,
    NEXTCOLOR: "",
    OBTAINED: "",
    OBTAINEDCOLOR: "",
  };

  let completion = +game.completion;

  nextStage.MARVEL = Math.ceil(game.total * 1.0) - game.completed;
  nextStage.LEGENDARY = Math.ceil(game.total * 0.9) - game.completed;
  nextStage.EPIC = Math.ceil(game.total * 0.75) - game.completed;
  nextStage.RARE = Math.ceil(game.total * 0.5) - game.completed;
  nextStage.COMMON = Math.ceil(game.total * 0.25) - game.completed;
  nextStage.BRONZE = Math.ceil(game.total * 0.1) - game.completed;

  if (completion == 100) {
    nextStage.NEXT = 0;
    nextStage.NEXTCOLOR = MARVEL_COLOR;
    nextStage.OBTAINED = MARVEL;
    nextStage.OBTAINEDCOLOR = MARVEL_COLOR;
  } else if (completion >= 90 && completion < 100) {
    nextStage.NEXT = Math.ceil(game.total * 1.0) - game.completed;
    nextStage.NEXTCOLOR = MARVEL_COLOR;
    nextStage.OBTAINED = LEGENDARY;
    nextStage.OBTAINEDCOLOR = LEGENDARY_COLOR;
  } else if (completion >= 75 && completion < 90) {
    nextStage.NEXT = Math.ceil(game.total * 0.9) - game.completed;
    nextStage.NEXTCOLOR = LEGENDARY_COLOR;
    nextStage.OBTAINED = EPIC;
    nextStage.OBTAINEDCOLOR = EPIC_COLOR;
  } else if (completion >= 50 && completion < 75) {
    nextStage.NEXT = Math.ceil(game.total * 0.75) - game.completed;
    nextStage.NEXTCOLOR = EPIC_COLOR;
    nextStage.OBTAINED = RARE;
    nextStage.OBTAINEDCOLOR = RARE_COLOR;
  } else if (completion >= 25 && completion < 50) {
    nextStage.NEXT = Math.ceil(game.total * 0.5) - game.completed;
    nextStage.NEXTCOLOR = RARE_COLOR;
    nextStage.OBTAINED = COMMON;
    nextStage.OBTAINEDCOLOR = COMMON_COLOR;
  } else if (completion >= 10 && completion < 25) {
    nextStage.NEXT = Math.ceil(game.total * 0.25) - game.completed;
    nextStage.NEXTCOLOR = COMMON_COLOR;
    nextStage.OBTAINED = BRONZE;
    nextStage.OBTAINEDCOLOR = BRONZE_COLOR;
  } else if (completion >= 1 && completion < 10) {
    nextStage.NEXT = Math.ceil(game.total * 0.1) - game.completed;
    nextStage.NEXTCOLOR = BRONZE_COLOR;
    nextStage.OBTAINED = NORMAL;
    nextStage.OBTAINEDCOLOR = NORMAL_COLOR;
  } else {
    nextStage.NEXT = Math.ceil(game.total * 0.01) - game.completed;
    nextStage.NEXTCOLOR = NORMAL_COLOR;
    nextStage.OBTAINED = NORMAL;
    nextStage.OBTAINEDCOLOR = NORMAL_COLOR;
  }

  return nextStage;
};

export const refreshGameDataByGameId = (games, gameId, gameRefreshedData) => {
  let newGames = [];
  newGames = games.map((game) => {
    let newGame = { ...game };
    if (game.id == gameId) {
      newGame = { ...newGame, ...gameRefreshedData, recentRefresh: new Date() };
    }
    return newGame;
  });

  return newGames;
};
