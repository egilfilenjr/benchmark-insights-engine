
// Define the PlanType to avoid string literal comparison issues
export type PlanType = 'free' | 'pro' | 'pro_plus' | 'agency';

// Check if user is eligible for team access based on plan
export const isEligibleForTeamAccess = (plan: PlanType, teamMembersCount: number): boolean => {
  // Define the plans that allow basic access
  const basicPlans: PlanType[] = ['free', 'pro', 'agency'];
  // Define the plans that allow team access
  const teamPlans: PlanType[] = ['pro_plus', 'agency'];
  
  // Check if the plan is in basicPlans array using includes
  if (basicPlans.includes(plan)) {
    return true;
  }
  
  // Check if the plan is in teamPlans array and if team members are <= 1
  if (teamPlans.includes(plan) && teamMembersCount <= 1) {
    return true;
  }
  
  // Default return
  return false;
};

export const getTeamLimitInfo = (plan: PlanType): string => {
  // Use a switch statement with type-safe cases
  switch (plan) {
    case 'free':
      return '1 user (yourself)';
    case 'pro':
      return '1 user (yourself)';
    case 'pro_plus':
      return '5 users';
    case 'agency':
      return '100 users';
    default:
      return '1 user';
  }
};

// Define plan limits for reuse
export const getPlanLimits = (plan: PlanType): number => {
  const planLimits = {
    free: 1,
    pro: 1,
    pro_plus: 5,
    agency: 100
  };
  
  return planLimits[plan];
};
