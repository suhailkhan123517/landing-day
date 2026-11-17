import confetti from "canvas-confetti";
import { CheckCircle2, Circle, Clock, Plus, RotateCcw, Sparkles, Trash2 } from "lucide-react";
import React from "react";
import { getCalendarDayDifference } from "../lib/calendar";
import {
  createCompressedMilestones,
  createDefaultMilestones,
  sortMilestonesByDate,
} from "../lib/milestones";
import type { Milestone, Project } from "../types/project";

interface MilestoneEditorProps {
  onUpdateProject: (updates: Partial<Project>) => void;
  project: Project;
  todayDate: string;
}

export const MilestoneEditor: React.FC<MilestoneEditorProps> = ({
  onUpdateProject,
  project,
  todayDate,
}) => {
  const { milestones, moveDate } = project;
  const daysRemaining = getCalendarDayDifference(moveDate, todayDate);
  const isShortNotice = daysRemaining > 0 && daysRemaining < 21;
  const sorted = sortMilestonesByDate(milestones);
  const completedCount = sorted.filter((m) => m.completed).length;

  const handleToggleComplete = (id: string) => {
    const nextMilestones = milestones.map((m) => {
      if (m.id === id) {
        const nextCompleted = !m.completed;
        // Trigger celebratory confetti if this completes all milestones
        const currentDone = milestones.filter((x) => x.completed).length;
        if (nextCompleted && currentDone === milestones.length - 1) {
          try {
            confetti({
              colors: ["#F2C078", "#AEC7AE", "#F5F0E6"],
              origin: { y: 0.6 },
              particleCount: 50,
              spread: 60,
            });
          } catch {
            // Non-critical celebration effect
          }
        }
        return {
          ...m,
          completed: nextCompleted,
        };
      }
      return m;
    });

    onUpdateProject({ milestones: nextMilestones });
  };

  const handleLabelChange = (id: string, nextLabel: string) => {
    const nextMilestones = milestones.map((m) =>
      m.id === id ? { ...m, label: nextLabel } : m
    );
    onUpdateProject({ milestones: nextMilestones });
  };

  const handleDateChange = (id: string, nextDate: string) => {
    const nextMilestones = milestones.map((m) =>
      m.id === id ? { ...m, date: nextDate } : m
    );
    onUpdateProject({ milestones: nextMilestones });
  };

  const handleRemoveMilestone = (id: string) => {
    if (milestones.length <= 1) return;
    const nextMilestones = milestones.filter((m) => m.id !== id);
    onUpdateProject({ milestones: nextMilestones });
  };

  const handleAddMilestone = () => {
    if (milestones.length >= 5) return;
    const newId = `m-${Date.now()}`;
    const newMilestone: Milestone = {
      completed: false,
      date: todayDate,
      id: newId,
      label: "New preparation step",
    };
    onUpdateProject({ milestones: [...milestones, newMilestone] });
  };

  const handleRestoreDefaultSchedule = () => {
    const nextMilestones = createDefaultMilestones(moveDate, todayDate);
    onUpdateProject({ milestones: nextMilestones });
  };

  const handleApplyCompressedSchedule = () => {
    const nextMilestones = createCompressedMilestones(moveDate, todayDate);
    onUpdateProject({ milestones: nextMilestones });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#AEC7AE]/15 text-[#AEC7AE]">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-[#F5F0E6]">
              Preparation Milestones
            </h2>
            <p className="text-xs text-[#BBC4C8]">
              {completedCount} of {milestones.length} completed ·{" "}
              <span className="text-[#F2C078]">
                {completedCount} {completedCount === 1 ? "window" : "windows"} illuminated
              </span>
            </p>
          </div>
        </div>

        <button
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-[#BBC4C8] transition-colors hover:border-white/20 hover:text-[#F5F0E6]"
          onClick={handleRestoreDefaultSchedule}
          title="Reset milestones to recommended schedule"
          type="button"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Schedule</span>
        </button>
      </div>

      {/* Short Notice Callout */}
      {isShortNotice && (
        <div className="flex items-start gap-2.5 rounded-xl border border-[#F2C078]/25 bg-[#F2C078]/10 p-3 text-xs text-[#F5F0E6]">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#F2C078]" />
          <div className="flex-1 space-y-1">
            <p className="font-medium text-[#F2C078]">
              Short-Notice Move ({daysRemaining} days remaining)
            </p>
            <p className="text-[#BBC4C8]">
              Would you like to compress preparation steps evenly across your remaining days?
            </p>
            <button
              className="mt-1 flex items-center gap-1 rounded-md bg-[#F2C078] px-2.5 py-1 text-xs font-semibold text-[#101A23] transition-colors hover:bg-[#ffd696]"
              onClick={handleApplyCompressedSchedule}
              type="button"
            >
              <Sparkles className="h-3 w-3" />
              Apply Compressed Schedule
            </button>
          </div>
        </div>
      )}

      {/* Milestone List */}
      <div className="space-y-2.5">
        {sorted.map((milestone, index) => {
          const isDone = milestone.completed;
          return (
            <div
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                isDone
                  ? "border-[#AEC7AE]/30 bg-[#AEC7AE]/5"
                  : "border-white/10 bg-black/30 hover:border-white/20"
              }`}
              key={milestone.id}
            >
              {/* Checkbox (illuminates window) */}
              <button
                aria-label={isDone ? "Mark incomplete" : "Mark completed"}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isDone
                    ? "border-[#AEC7AE] bg-[#AEC7AE] text-[#101A23]"
                    : "border-white/30 text-transparent hover:border-[#F2C078]"
                }`}
                onClick={() => handleToggleComplete(milestone.id)}
                type="button"
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 fill-current stroke-none" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </button>

              {/* Editable Label */}
              <div className="flex-1 min-w-0">
                <input
                  className={`w-full bg-transparent text-sm font-medium focus:outline-none ${
                    isDone
                      ? "text-[#BBC4C8] line-through opacity-75"
                      : "text-[#F5F0E6]"
                  }`}
                  maxLength={40}
                  onChange={(e) => handleLabelChange(milestone.id, e.target.value)}
                  type="text"
                  value={milestone.label}
                />
              </div>

              {/* Due Date Input */}
              <div className="shrink-0">
                <input
                  aria-label="Milestone due date"
                  className="rounded-lg border border-white/10 bg-black/40 px-2 py-1 text-xs text-[#BBC4C8] focus:border-[#F2C078] focus:outline-none"
                  onChange={(e) => handleDateChange(milestone.id, e.target.value)}
                  type="date"
                  value={milestone.date}
                />
              </div>

              {/* Window Number Indicator Badge */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                  isDone
                    ? "bg-[#F2C078] text-[#101A23]"
                    : "bg-white/10 text-white/50"
                }`}
                title={`Illuminates Window ${index + 1}`}
              >
                W{index + 1}
              </div>

              {/* Delete button (if more than 1 milestone) */}
              {milestones.length > 1 && (
                <button
                  aria-label="Remove milestone"
                  className="shrink-0 text-white/30 transition-colors hover:text-red-400"
                  onClick={() => handleRemoveMilestone(milestone.id)}
                  type="button"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Milestone Button (up to 5) */}
      {milestones.length < 5 && (
        <button
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 py-2.5 text-xs font-medium text-[#BBC4C8] transition-colors hover:border-[#F2C078]/50 hover:bg-[#F2C078]/5 hover:text-[#F2C078]"
          onClick={handleAddMilestone}
          type="button"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Preparation Step ({milestones.length}/5)</span>
        </button>
      )}
    </div>
  );
};
