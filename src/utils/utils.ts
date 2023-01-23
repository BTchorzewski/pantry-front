export const countDaysLeft = (createdAt: Date, expiration: Date): number => {
  const dayInMiliseconds = 1000 * 3600 * 24;
  return Math.round(
    (expiration.getTime() - createdAt.getTime()) / dayInMiliseconds
  );
};

type ExpirationStatus = 'fresh' | 'expiredSoon' | 'expired';
export const expirationStatus = (daysLeft: number): ExpirationStatus => {
  if (daysLeft < 1) {
    return 'expired';
  } else if (daysLeft < 4) {
    return 'expiredSoon';
  } else {
    return 'fresh';
  }
};
