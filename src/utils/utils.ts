export const countDaysLeft = (createdAt: Date, expiration: Date): number => {
  const dayInMiliseconds = 1000 * 3600 * 24;
  return Math.round(
    (expiration.getTime() - createdAt.getTime()) / dayInMiliseconds
  );
};
