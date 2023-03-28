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
    case GAME_CATEGORY_BACKLOG:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion > 0 && game.completion < 10) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case GAME_CATEGORY_MARVEL:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion == 100) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case GAME_CATEGORY_LEGENDARY:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 90 && game.completion < 100) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case GAME_CATEGORY_EPIC:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 75 && game.completion < 90) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case GAME_CATEGORY_RARE:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 50 && game.completion < 75) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case GAME_CATEGORY_COMMON:
      filteredGamesForCategory = games.filter((game) => {
        if (game.completion >= 25 && game.completion < 50) {
          gamesCountForCategory++;
          return true;
        }
      });
      break;
    case GAME_CATEGORY_BRONZE:
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

  return { filteredGamesForCategory, gamesCountForCategory };
};
