import {
  BRONZE_COLOR,
  COMMON_COLOR,
  EPIC_COLOR,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  RARE_COLOR,
} from "./colorHelper";
import {
  GAME_BACKLOG_FILTER_ALL,
  GAME_BACKLOG_FILTER_BRONZE,
  GAME_BACKLOG_FILTER_COMMON,
  GAME_BACKLOG_FILTER_EPIC,
  GAME_BACKLOG_FILTER_LEGENDARY,
  GAME_BACKLOG_FILTER_MARVEL,
  GAME_BACKLOG_FILTER_RARE,
  GAME_BACKLOG_SORT_ALL,
  GAME_BACKLOG_SORT_LOCKED,
  GAME_BACKLOG_SORT_PINNED,
  GAME_BACKLOG_SORT_UNLOCKED,
  GAME_UNLOCK_TYPE_ALL,
  GAME_UNLOCK_TYPE_MONTH,
  GAME_UNLOCK_TYPE_TODAY,
  GAME_UNLOCK_TYPE_WEEK,
} from "./constantHelper";

export const MONTH = "MONTH";
export const WEEK = "WEEK";
export const TODAY = "TODAY";
export const ALL = "ALL";

const MARVEL_LOWER = 0;
const MARVEL_HIGHER = 3;
const LEGENDARY_LOWER = 3;
const LEGENDARY_HIGHER = 10;
const EPIC_LOWER = 10;
const EPIC_HIGHER = 25;
const RARE_LOWER = 25;
const RARE_HIGHER = 50;
const COMMON_LOWER = 50;
const COMMON_HIGHER = 75;
const BRONZE_LOWER = 75;
const BRONZE_HIGHER = 100;

const MARVEL_XP_POINTS = 100;
const LEGENDARY_XP_POINTS = 75;
const EPIC_XP_POINTS = 50;
const RARE_XP_POINTS = 25;
const COMMON_XP_POINTS = 10;
const BRONZE_XP_POINTS = 5;

export const getXPForPercentage = (percentage) => {
  if (percentage <= BRONZE_HIGHER && percentage > BRONZE_LOWER) {
    return BRONZE_XP_POINTS;
  }
  if (percentage <= COMMON_HIGHER && percentage > COMMON_LOWER) {
    return COMMON_XP_POINTS;
  }
  if (percentage <= RARE_HIGHER && percentage > RARE_LOWER) {
    return RARE_XP_POINTS;
  }
  if (percentage <= EPIC_HIGHER && percentage > EPIC_LOWER) {
    return EPIC_XP_POINTS;
  }
  if (percentage <= LEGENDARY_HIGHER && percentage > LEGENDARY_LOWER) {
    return LEGENDARY_XP_POINTS;
  }
  if (percentage <= MARVEL_HIGHER && percentage > MARVEL_LOWER) {
    return MARVEL_XP_POINTS;
  }
};

export const getColorForPercentage = (percentage) => {
  if (percentage <= BRONZE_HIGHER && percentage > BRONZE_LOWER) {
    return BRONZE_COLOR;
  }
  if (percentage <= COMMON_HIGHER && percentage > COMMON_LOWER) {
    return COMMON_COLOR;
  }
  if (percentage <= RARE_HIGHER && percentage > RARE_LOWER) {
    return RARE_COLOR;
  }
  if (percentage <= EPIC_HIGHER && percentage > EPIC_LOWER) {
    return EPIC_COLOR;
  }
  if (percentage <= LEGENDARY_HIGHER && percentage > LEGENDARY_LOWER) {
    return LEGENDARY_COLOR;
  }
  if (percentage <= MARVEL_HIGHER && percentage > MARVEL_LOWER) {
    return MARVEL_COLOR;
  }
};

export const getaUnlockedAchievementsByType = (achievements, type) => {
  let newAchievements = [];
  if (achievements) {
    if (type == GAME_UNLOCK_TYPE_TODAY) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate());
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }

    if (type == GAME_UNLOCK_TYPE_WEEK) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - 7);
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }

    if (type == GAME_UNLOCK_TYPE_MONTH) {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - 7);
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }

    if (type == GAME_UNLOCK_TYPE_ALL) {
      newAchievements = achievements.filter(
        (achievement) => achievement.achieved == 1
      );
    }
  }

  return newAchievements;
};

export const filteredAchievementsForSortAndFilterOption = (
  achievements,
  gameBacklogSort,
  gameBacklogFilter
) => {
  let sortAchievements = [];
  let filterAchievements = [];
  let finalAchievements = [];

  sortAchievements = getAchievementsForSortType(achievements, gameBacklogSort);
  filterAchievements = getAchievementsForFilterType(
    sortAchievements,
    gameBacklogFilter
  );
  finalAchievements = filterAchievements;
  return finalAchievements;
};

export const getAchievementsForSortType = (achievements, sortType) => {
  let sortAchievements = [];

  switch (sortType) {
    case GAME_BACKLOG_SORT_ALL:
      sortAchievements = achievements;
      sortAchievements = sortAchievements.sort(
        (ach1, ach2) => ach2.percentage - ach1.percentage
      );
      break;
    case GAME_BACKLOG_SORT_LOCKED:
      sortAchievements = achievements.filter((ach) => ach.achieved != 1);
      sortAchievements = sortAchievements.sort(
        (ach1, ach2) => ach2.percentage - ach1.percentage
      );
      break;
    case GAME_BACKLOG_SORT_UNLOCKED:
      sortAchievements = achievements.filter((ach) => ach.achieved == 1);
      sortAchievements = sortAchievements.sort(
        (ach1, ach2) => ach2.unlocktime - ach1.unlocktime
      );
      break;
    default:
      sortAchievements = achievements;
      break;
  }

  return sortAchievements;
};

export const getAchievementsForFilterType = (achievements, filterType) => {
  let filterAchievements = [];

  switch (filterType) {
    case GAME_BACKLOG_FILTER_ALL:
      filterAchievements = achievements;
      break;
    case GAME_BACKLOG_FILTER_BRONZE:
      filterAchievements = achievements.filter((achievement) => {
        return (
          achievement.percentage <= BRONZE_HIGHER &&
          achievement.percentage > BRONZE_LOWER
        );
      });
      break;
    case GAME_BACKLOG_FILTER_COMMON:
      filterAchievements = achievements.filter((achievement) => {
        return (
          achievement.percentage <= COMMON_HIGHER &&
          achievement.percentage > COMMON_LOWER
        );
      });
      break;
    case GAME_BACKLOG_FILTER_RARE:
      filterAchievements = achievements.filter((achievement) => {
        return (
          achievement.percentage <= RARE_HIGHER &&
          achievement.percentage > RARE_LOWER
        );
      });
      break;
    case GAME_BACKLOG_FILTER_EPIC:
      filterAchievements = achievements.filter((achievement) => {
        return (
          achievement.percentage <= EPIC_HIGHER &&
          achievement.percentage > EPIC_LOWER
        );
      });
      break;
    case GAME_BACKLOG_FILTER_LEGENDARY:
      filterAchievements = achievements.filter((achievement) => {
        return (
          achievement.percentage <= LEGENDARY_HIGHER &&
          achievement.percentage > LEGENDARY_LOWER
        );
      });
      break;
    case GAME_BACKLOG_FILTER_MARVEL:
      filterAchievements = achievements.filter((achievement) => {
        return (
          achievement.percentage <= MARVEL_HIGHER &&
          achievement.percentage > MARVEL_LOWER
        );
      });
      break;
    default:
      filterAchievements = achievements;
      break;
  }
  return filterAchievements;
};
