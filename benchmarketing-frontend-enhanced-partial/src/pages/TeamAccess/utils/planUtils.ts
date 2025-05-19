
export type PlanType = 'free' | 'pro' | 'pro_plus' | 'agency';

export const getPlanLimits = (plan: PlanType): { seats: number; storage: number } => {
  switch (plan) {
    case 'free':
      return { seats: 1, storage: 0.5 };
    case 'pro':
      return { seats: 3, storage: 2 };
    case 'pro_plus':
      return { seats: 10, storage: 5 };
    case 'agency':
      return { seats: 25, storage: 20 };
    default:
      return { seats: 1, storage: 0.5 };
  }
};

export const isEligibleForTeamAccess = (plan: PlanType): boolean => {
  return plan === 'pro_plus' || plan === 'agency';
};

export const getTeamLimitInfo = (plan: PlanType, currentCount: number): { current: number; max: number } => {
  const { seats } = getPlanLimits(plan);
  return {
    current: currentCount,
    max: seats
  };
};
