
// Define the TeamMember type
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "removed";
  lastActive: Date | null;
}

// Define ActivityLog type
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: Date;
}

// Define DateRange type for consistency
export interface DateRange {
  from: Date;
  to: Date;
}

// Define Invitation type
export interface Invitation {
  email: string;
  role: "admin" | "editor" | "viewer";
}

// Define EditRole type
export interface EditRole {
  userId: string;
  role: string;
}
