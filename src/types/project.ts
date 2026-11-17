export interface DevicePreset {
  height: number;
  id: string;
  name: string;
  width: number;
}

export interface Milestone {
  completed: boolean;
  date: string; // YYYY-MM-DD
  id: string;
  label: string;
}

export type ThemeKey = "evergreen" | "midnight" | "paper";

export interface Project {
  contentOffsetY: number;
  height: number;
  milestones: Milestone[];
  moveDate: string; // YYYY-MM-DD
  theme: ThemeKey;
  title: string;
  version: 1;
  width: number;
}

export interface MilestoneStatus {
  activeMilestoneId: null | string;
  allCompleted: boolean;
  completedCount: number;
  nextMilestone: Milestone | null;
  statusLabel: string;
}

export interface CountdownInfo {
  dateLabel: string;
  daysRemaining: number;
  headline: string;
  isToday: boolean;
  isWelcomeHome: boolean;
  subhead: string;
}
