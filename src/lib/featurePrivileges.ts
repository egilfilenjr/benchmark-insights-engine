export const featurePrivileges = {
  free: {
    aiEnabled: false,
    exports: false,
    whiteLabel: false,
    maxUsers: 1,
  },
  pro: {
    aiEnabled: false,
    exports: false,
    whiteLabel: false,
    maxUsers: 1,
  },
  pro_plus: {
    aiEnabled: true,
    exports: true,
    whiteLabel: false,
    maxUsers: 5,
  },
  agency: {
    aiEnabled: true,
    exports: true,
    whiteLabel: true,
    maxUsers: 100,
  },
} as const;

export type PlanKey = keyof typeof featurePrivileges;
