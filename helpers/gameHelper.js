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
  let filteredGames = [];

  switch (categoryId) {
    case GAME_CATEGORY_BACKLOG:
      filteredGames = games.filter(
        (game) => game.completion > 0 && game.completion < 10
      );
      break;
    case GAME_CATEGORY_MARVEL:
      filteredGames = games.filter((game) => game.completion == 100);
      break;
    case GAME_CATEGORY_LEGENDARY:
      filteredGames = games.filter(
        (game) => game.completion >= 90 && game.completion < 100
      );
      break;
    case GAME_CATEGORY_EPIC:
      filteredGames = games.filter(
        (game) => game.completion >= 75 && game.completion < 90
      );
      break;
    case GAME_CATEGORY_RARE:
      filteredGames = games.filter(
        (game) => game.completion >= 50 && game.completion < 75
      );
      break;
    case GAME_CATEGORY_COMMON:
      filteredGames = games.filter(
        (game) => game.completion >= 25 && game.completion < 50
      );
      break;
    case GAME_CATEGORY_BRONZE:
      filteredGames = games.filter(
        (game) => game.completion >= 10 && game.completion < 25
      );
      break;
    default:
      filteredGames = games;
      break;
  }

  return filteredGames;
};
