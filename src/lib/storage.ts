import type { Project } from "../types/project";
import { addDaysToIsoDate, getTodayIsoString } from "./calendar";
import { createDefaultMilestones } from "./milestones";

const STORAGE_KEY = "landing_day_project_v1";

export function getDefaultProject(): Project {
  const today = getTodayIsoString();
  // Default to 18 days from today, matching the brief's flagship example
  const defaultMoveDate = addDaysToIsoDate(today, 18);
  const milestones = createDefaultMilestones(defaultMoveDate, today);

  return {
    contentOffsetY: 0,
    height: 2796,
    milestones,
    moveDate: defaultMoveDate,
    theme: "midnight",
    title: "",
    version: 1,
    width: 1290,
  };
}

export function loadSavedProject(): Project {
  if (typeof window === "undefined" || !window.localStorage) {
    return getDefaultProject();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getDefaultProject();
    }
    const parsed = JSON.parse(raw) as Partial<Project>;
    if (parsed.version === 1 && parsed.moveDate && Array.isArray(parsed.milestones)) {
      return {
        contentOffsetY: typeof parsed.contentOffsetY === "number" ? parsed.contentOffsetY : 0,
        height: parsed.height || 2796,
        milestones: parsed.milestones,
        moveDate: parsed.moveDate,
        theme: parsed.theme || "midnight",
        title: parsed.title || "",
        version: 1,
        width: parsed.width || 1290,
      };
    }
  } catch {
    // If corrupted, fallback safely
  }

  return getDefaultProject();
}

export function saveProject(project: Project): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  } catch {
    // Local storage quota or security error
  }
}
