import type { CountdownInfo } from "../types/project";

/**
 * Returns today's date formatted as YYYY-MM-DD in the user's local timezone.
 */
export function getTodayIsoString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parses YYYY-MM-DD into a UTC timestamp at midnight.
 * Using UTC prevents daylight saving time from causing off-by-one calculations.
 */
export function parseDateToUtcMidnight(isoDate: string): number {
  const [yearStr, monthStr, dayStr] = isoDate.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  return Date.UTC(year, month - 1, day);
}

/**
 * Calculates calendar day difference between two YYYY-MM-DD strings.
 */
export function getCalendarDayDifference(targetDate: string, baseDate: string): number {
  const MS_PER_DAY = 86_400_000;
  const targetUtc = parseDateToUtcMidnight(targetDate);
  const baseUtc = parseDateToUtcMidnight(baseDate);
  return Math.round((targetUtc - baseUtc) / MS_PER_DAY);
}

/**
 * Adds an integer number of days to a YYYY-MM-DD string and returns a new YYYY-MM-DD string.
 */
export function addDaysToIsoDate(isoDate: string, daysToAdd: number): string {
  const utc = parseDateToUtcMidnight(isoDate);
  const MS_PER_DAY = 86_400_000;
  const newDate = new Date(utc + daysToAdd * MS_PER_DAY);
  const year = newDate.getUTCFullYear();
  const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(newDate.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats YYYY-MM-DD into "Mmm D, YYYY" (e.g. "Dec 1, 2026").
 */
export function formatDateLong(isoDate: string): string {
  const [yearStr, monthStr, dayStr] = isoDate.split("-");
  const monthIndex = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  const monthName = MONTH_NAMES[monthIndex] || "";
  return `${monthName} ${day}, ${yearStr}`;
}

/**
 * Formats YYYY-MM-DD into "Mmm D" (e.g. "Nov 15").
 */
export function formatDateShort(isoDate: string): string {
  const [, monthStr, dayStr] = isoDate.split("-");
  const monthIndex = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  const monthName = MONTH_NAMES[monthIndex] || "";
  return `${monthName} ${day}`;
}

interface CountdownOptions {
  moveDate: string;
  title: string;
  todayDate: string;
}

/**
 * Calculates complete countdown presentation state.
 */
export function getCountdownInfo(options: CountdownOptions): CountdownInfo {
  const { moveDate, title, todayDate } = options;
  const daysRemaining = getCalendarDayDifference(moveDate, todayDate);
  const trimmedTitle = title.trim();
  const targetName = trimmedTitle.length > 0 ? trimmedTitle.toUpperCase() : "HOME";

  if (daysRemaining > 1) {
    return {
      dateLabel: `Moving day · ${formatDateLong(moveDate)}`,
      daysRemaining,
      headline: String(daysRemaining),
      isToday: false,
      isWelcomeHome: false,
      subhead: `DAYS UNTIL ${targetName}`,
    };
  }

  if (daysRemaining === 1) {
    return {
      dateLabel: `Moving day · ${formatDateLong(moveDate)}`,
      daysRemaining,
      headline: "1",
      isToday: false,
      isWelcomeHome: false,
      subhead: `DAY UNTIL ${targetName}`,
    };
  }

  if (daysRemaining === 0) {
    return {
      dateLabel: `Moving day · ${formatDateLong(moveDate)}`,
      daysRemaining: 0,
      headline: "TODAY",
      isToday: true,
      isWelcomeHome: false,
      subhead: "THE DAY HAS ARRIVED",
    };
  }

  return {
    dateLabel: `Moved in · ${formatDateLong(moveDate)}`,
    daysRemaining,
    headline: "WELCOME",
    isToday: false,
    isWelcomeHome: true,
    subhead: targetName === "HOME" ? "WELCOME HOME" : `WELCOME TO ${targetName}`,
  };
}
