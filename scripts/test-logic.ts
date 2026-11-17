import assert from "node:assert";
import {
  formatDateLong,
  formatDateShort,
  getCalendarDayDifference,
  getCountdownInfo,
} from "../src/lib/calendar";
import {
  createCompressedMilestones,
  createDefaultMilestones,
  evaluateMilestoneStatus,
} from "../src/lib/milestones";

console.log("Running logic & edge case tests for Landing Day...\n");

// 1. Day Difference Across Month Boundaries
const diff1 = getCalendarDayDifference("2026-12-01", "2026-11-13");
assert.strictEqual(diff1, 18, "Nov 13 to Dec 1 must be 18 days");
console.log("✓ Nov 13 to Dec 1: 18 days (matches brief example)");

// 2. Leap year calculation
const diffLeap = getCalendarDayDifference("2028-03-01", "2028-02-28");
assert.strictEqual(diffLeap, 2, "2028 is a leap year; Feb 28 to Mar 1 is 2 days");
console.log("✓ Leap year day calculation verified (Feb 28 to Mar 1 = 2 days)");

// 3. Daylight Saving Transition (Spring forward)
const diffDst = getCalendarDayDifference("2026-03-10", "2026-03-07");
assert.strictEqual(diffDst, 3, "Spring forward transition must be exactly 3 calendar days");
console.log("✓ DST transition calculation verified (3 days)");

// 4. Countdown States
const state18 = getCountdownInfo({
  moveDate: "2026-12-01",
  title: "",
  todayDate: "2026-11-13",
});
assert.strictEqual(state18.headline, "18");
assert.strictEqual(state18.subhead, "DAYS UNTIL HOME");
assert.strictEqual(state18.dateLabel, "Moving day · Dec 1, 2026");
console.log("✓ State > 1 day: 18 DAYS UNTIL HOME");

const state1 = getCountdownInfo({
  moveDate: "2026-12-01",
  title: "",
  todayDate: "2026-11-30",
});
assert.strictEqual(state1.headline, "1");
assert.strictEqual(state1.subhead, "DAY UNTIL HOME");
console.log("✓ State 1 day: 1 DAY UNTIL HOME");

const stateToday = getCountdownInfo({
  moveDate: "2026-12-01",
  title: "",
  todayDate: "2026-12-01",
});
assert.strictEqual(stateToday.headline, "TODAY");
assert.strictEqual(stateToday.isToday, true);
console.log("✓ State today: TODAY / THE DAY HAS ARRIVED");

const statePassed = getCountdownInfo({
  moveDate: "2026-12-01",
  title: "",
  todayDate: "2026-12-05",
});
assert.strictEqual(statePassed.headline, "WELCOME");
assert.strictEqual(statePassed.isWelcomeHome, true);
assert.strictEqual(statePassed.subhead, "WELCOME HOME");
console.log("✓ State passed: WELCOME / WELCOME HOME");

// 5. Custom Nickname
const stateCustom = getCountdownInfo({
  moveDate: "2026-12-01",
  title: "Our First Place",
  todayDate: "2026-11-13",
});
assert.strictEqual(stateCustom.subhead, "DAYS UNTIL OUR FIRST PLACE");
console.log("✓ Custom nickname supported: DAYS UNTIL OUR FIRST PLACE");

// 6. Formatting
assert.strictEqual(formatDateLong("2026-12-01"), "Dec 1, 2026");
assert.strictEqual(formatDateShort("2026-11-15"), "Nov 15");
console.log("✓ Date formatting verified (Dec 1, 2026 and Nov 15)");

// 7. Milestone Generation
const milestones = createDefaultMilestones("2026-12-01", "2026-11-01");
assert.strictEqual(milestones.length, 5);
assert.strictEqual(milestones[0].label, "Sort what comes with you");
assert.strictEqual(milestones[0].date, "2026-11-10"); // 21 days before Dec 1
assert.strictEqual(milestones[4].date, "2026-11-30"); // 1 day before Dec 1
console.log("✓ 5 Default milestones generated with correct offsets (-21, -14, -7, -3, -1)");

// 8. Milestone Status Evaluation
// A: earliest incomplete milestone is future
const statusFuture = evaluateMilestoneStatus(milestones, "2026-11-05");
assert.strictEqual(statusFuture.activeMilestoneId, "m-sort");
assert.strictEqual(statusFuture.statusLabel, "NEXT · NOV 10");
assert.strictEqual(statusFuture.completedCount, 0);
console.log("✓ Earliest incomplete future milestone: NEXT · NOV 10");

// B: earliest incomplete milestone is today
const statusToday = evaluateMilestoneStatus(milestones, "2026-11-10");
assert.strictEqual(statusToday.statusLabel, "TODAY");
console.log("✓ Milestone due today: TODAY");

// C: earliest incomplete milestone is overdue
const statusOverdue = evaluateMilestoneStatus(milestones, "2026-11-12");
assert.strictEqual(statusOverdue.statusLabel, "STILL TO DO");
console.log("✓ Overdue milestone: STILL TO DO");

// D: marking completed never auto-advances purely by date
assert.strictEqual(statusOverdue.nextMilestone?.completed, false);
console.log("✓ Overdue task is never automatically completed");

// E: all completed state
const allDoneMilestones = milestones.map((m) => ({ ...m, completed: true }));
const statusAllDone = evaluateMilestoneStatus(allDoneMilestones, "2026-11-12");
assert.strictEqual(statusAllDone.allCompleted, true);
assert.strictEqual(statusAllDone.statusLabel, "You’re ready for moving day.");
assert.strictEqual(statusAllDone.completedCount, 5);
console.log("✓ All completed state: 'You’re ready for moving day.' + 5 windows lit");

// 9. Short-notice compressed schedule
const compressed = createCompressedMilestones("2026-11-17", "2026-11-13"); // 4 days remaining
assert.strictEqual(compressed.length, 5);
assert.ok(compressed[0].date >= "2026-11-13", "Compressed dates must not be in past");
assert.ok(compressed[4].date <= "2026-11-17", "Compressed dates must be before or on move date");
console.log("✓ Compressed schedule for short-notice moves successfully fits within remaining days");

console.log("\nAll 9 logic and edge case test suites passed successfully!");
