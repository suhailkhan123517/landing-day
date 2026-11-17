import type { Milestone, MilestoneStatus } from "../types/project";
import { addDaysToIsoDate, formatDateShort, getCalendarDayDifference } from "./calendar";

export const DEFAULT_MILESTONE_TEMPLATES = [
  {
    daysBefore: 21,
    id: "m-sort",
    label: "Sort what comes with you",
  },
  {
    daysBefore: 14,
    id: "m-book",
    label: "Book the move",
  },
  {
    daysBefore: 7,
    id: "m-services",
    label: "Arrange essential services",
  },
  {
    daysBefore: 3,
    id: "m-keys",
    label: "Confirm keys and access",
  },
  {
    daysBefore: 1,
    id: "m-bag",
    label: "Pack your first-night bag",
  },
];

/**
 * Creates default milestones based on the move date.
 * If the move is far enough away, uses standard 21/14/7/3/1 day offsets.
 * If the move is close, distributes them evenly before the move date.
 */
export function createDefaultMilestones(moveDate: string, todayDate: string): Milestone[] {
  const daysRemaining = getCalendarDayDifference(moveDate, todayDate);

  if (daysRemaining >= 21) {
    return DEFAULT_MILESTONE_TEMPLATES.map((template) => ({
      completed: false,
      date: addDaysToIsoDate(moveDate, -template.daysBefore),
      id: template.id,
      label: template.label,
    }));
  }

  return createCompressedMilestones(moveDate, todayDate);
}

/**
 * Creates a compressed schedule when the move date is less than 21 days away.
 * Ensures milestones are not scheduled in the past.
 */
export function createCompressedMilestones(moveDate: string, todayDate: string): Milestone[] {
  const daysRemaining = Math.max(1, getCalendarDayDifference(moveDate, todayDate));
  const count = DEFAULT_MILESTONE_TEMPLATES.length;

  return DEFAULT_MILESTONE_TEMPLATES.map((template, index) => {
    // Distribute from day 0 (today) up to (daysRemaining - 1)
    const targetOffsetFromToday = Math.min(
      daysRemaining - 1,
      Math.floor((index / (count - 1)) * Math.max(0, daysRemaining - 1))
    );
    const date = addDaysToIsoDate(todayDate, targetOffsetFromToday);

    return {
      completed: false,
      date,
      id: template.id,
      label: template.label,
    };
  });
}

/**
 * Sorts milestones chronologically by calendar date.
 */
export function sortMilestonesByDate(milestones: Milestone[]): Milestone[] {
  return [...milestones].sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Evaluates the milestone list to determine current progress, the single next action,
 * and contextual labels ("STILL TO DO", "TODAY", or "NEXT · Mmm D").
 */
export function evaluateMilestoneStatus(
  milestones: Milestone[],
  todayDate: string
): MilestoneStatus {
  const sorted = sortMilestonesByDate(milestones);
  const completedCount = sorted.filter((m) => m.completed).length;
  const nextMilestone = sorted.find((m) => !m.completed) || null;

  if (!nextMilestone) {
    return {
      activeMilestoneId: null,
      allCompleted: sorted.length > 0,
      completedCount,
      nextMilestone: null,
      statusLabel: "You’re ready for moving day.",
    };
  }

  const diffDays = getCalendarDayDifference(nextMilestone.date, todayDate);
  let statusLabel: string;

  if (diffDays < 0) {
    statusLabel = "STILL TO DO";
  } else if (diffDays === 0) {
    statusLabel = "TODAY";
  } else {
    statusLabel = `NEXT · ${formatDateShort(nextMilestone.date).toUpperCase()}`;
  }

  return {
    activeMilestoneId: nextMilestone.id,
    allCompleted: false,
    completedCount,
    nextMilestone,
    statusLabel,
  };
}
