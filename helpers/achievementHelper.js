const MONTH = "MONTH";
const WEEK = "WEEK";
const TODAY = "TODAY";
const ALL = "ALL";

export const getaUnlockedAchievementsByType = (achievements, type) => {
  let newAchievements = [];
  if (achievements) {
    if (type == TODAY) {
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

    if (type == WEEK) {
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

    if (type == MONTH) {
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

    if (type == ALL) {
      newAchievements = achievements.filter(
        (achievement) => achievement.achieved == 1
      );
    }
  }

  return newAchievements;
};
