
export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: Date;
};

export type ActivityLog = {
  id: string;
  user: string;
  event: string;
  timestamp: Date;
};

export type Invitation = {
  id: string;
  email: string;
  role: string;
  invitedAt: Date;
  status: string;
};
