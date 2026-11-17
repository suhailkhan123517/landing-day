import { Calendar, Smartphone } from "lucide-react";
import React from "react";
import { DEVICE_PRESETS } from "../wallpaper/themes";
import type { DevicePreset, Project } from "../types/project";

interface MovingDetailsFormProps {
  onUpdateProject: (updates: Partial<Project>) => void;
  project: Project;
  todayDate: string;
}

export const MovingDetailsForm: React.FC<MovingDetailsFormProps> = ({
  onUpdateProject,
  project,
  todayDate,
}) => {
  const currentPreset =
    DEVICE_PRESETS.find(
      (p) => p.width === project.width && p.height === project.height
    ) || null;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateProject({ moveDate: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateProject({ title: e.target.value });
  };

  const handlePresetSelect = (preset: DevicePreset) => {
    onUpdateProject({
      height: preset.height,
      width: preset.width,
    });
  };

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2C078]/10 text-[#F2C078]">
          <Calendar className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-[#F5F0E6]">
            Moving Details
          </h2>
          <p className="text-xs text-[#BBC4C8]">
            Set your target date and personal home reference
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Moving Date Input */}
        <div>
          <label
            className="mb-1.5 block text-xs font-medium text-[#BBC4C8]"
            htmlFor="move-date-input"
          >
            Moving Date
          </label>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-[#F5F0E6] transition-colors focus:border-[#F2C078] focus:outline-none focus:ring-1 focus:ring-[#F2C078]"
            id="move-date-input"
            min={todayDate}
            onChange={handleDateChange}
            type="date"
            value={project.moveDate}
          />
        </div>

        {/* Optional Home Nickname */}
        <div>
          <label
            className="mb-1.5 block text-xs font-medium text-[#BBC4C8]"
            htmlFor="nickname-input"
          >
            Home Nickname <span className="text-white/40">(Optional)</span>
          </label>
          <input
            className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-[#F5F0E6] placeholder:text-white/30 transition-colors focus:border-[#F2C078] focus:outline-none focus:ring-1 focus:ring-[#F2C078]"
            id="nickname-input"
            maxLength={24}
            onChange={handleTitleChange}
            placeholder="e.g. Our First Place, Apt 4B"
            type="text"
            value={project.title}
          />
        </div>
      </div>

      {/* Device Preset Selector */}
      <div>
        <label className="mb-2 flex items-center justify-between text-xs font-medium text-[#BBC4C8]">
          <span className="flex items-center gap-1.5">
            <Smartphone className="h-3.5 w-3.5" /> Device Dimensions
          </span>
          <span className="font-mono text-[11px] text-[#F2C078]">
            {project.width} × {project.height} px
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {DEVICE_PRESETS.map((preset) => {
            const isSelected =
              project.width === preset.width && project.height === preset.height;
            return (
              <button
                className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all ${
                  isSelected
                    ? "border-[#F2C078] bg-[#F2C078]/10 text-[#F5F0E6]"
                    : "border-white/10 bg-white/[0.02] text-[#BBC4C8] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
                key={preset.id}
                onClick={() => handlePresetSelect(preset)}
                type="button"
              >
                <span className="text-xs font-medium leading-tight">
                  {preset.name.split(" (")[0]}
                </span>
                <span className="font-mono text-[10px] text-white/50">
                  {preset.width} × {preset.height}
                </span>
              </button>
            );
          })}
        </div>
        {!currentPreset && (
          <p className="mt-1.5 text-xs text-[#BBC4C8]/70">
            Custom size: {project.width} × {project.height} px
          </p>
        )}
      </div>
    </div>
  );
};
