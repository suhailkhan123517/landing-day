import { Eye, EyeOff, Palette, Sliders } from "lucide-react";
import React from "react";
import { WALLPAPER_THEMES } from "../wallpaper/themes";
import type { Project, ThemeKey } from "../types/project";

interface AppearanceControlsProps {
  onToggleGuides: () => void;
  onUpdateProject: (updates: Partial<Project>) => void;
  project: Project;
  shouldShowGuides: boolean;
}

export const AppearanceControls: React.FC<AppearanceControlsProps> = ({
  onToggleGuides,
  onUpdateProject,
  project,
  shouldShowGuides,
}) => {
  const handleThemeChange = (themeKey: ThemeKey) => {
    onUpdateProject({ theme: themeKey });
  };

  const handleOffsetYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateProject({ contentOffsetY: parseInt(e.target.value, 10) });
  };

  const handleResetOffset = () => {
    onUpdateProject({ contentOffsetY: 0 });
  };

  const themeKeys: ThemeKey[] = ["midnight", "paper", "evergreen"];

  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F2C078]/10 text-[#F2C078]">
          <Palette className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-[#F5F0E6]">
            Appearance & Alignment
          </h2>
          <p className="text-xs text-[#BBC4C8]">
            Curated themes and lock screen safe-area positioning
          </p>
        </div>
      </div>

      {/* 3 Curated Themes */}
      <div>
        <label className="mb-2 block text-xs font-medium text-[#BBC4C8]">
          Curated Visual Themes
        </label>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {themeKeys.map((key) => {
            const t = WALLPAPER_THEMES[key];
            const isSelected = project.theme === key;
            return (
              <button
                className={`relative flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? "border-[#F2C078] bg-white/[0.06] shadow-sm ring-1 ring-[#F2C078]"
                    : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
                key={key}
                onClick={() => handleThemeChange(key)}
                type="button"
              >
                {/* Color preview swatch bar */}
                <div className="mb-2.5 flex h-4 w-full overflow-hidden rounded-md border border-white/15">
                  <div
                    className="w-1/2 h-full"
                    style={{ backgroundColor: t.background }}
                  />
                  <div
                    className="w-1/4 h-full"
                    style={{ backgroundColor: t.highlight }}
                  />
                  <div
                    className="w-1/4 h-full"
                    style={{ backgroundColor: t.completedAccent }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#F5F0E6]">
                      {t.name}
                    </span>
                    {key === "midnight" && (
                      <span className="rounded bg-[#F2C078]/20 px-1 py-0.5 text-[9px] font-bold text-[#F2C078]">
                        HERO
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#BBC4C8]/80">
                    {t.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Vertical Alignment Slider */}
      <div className="space-y-2 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <label
            className="flex items-center gap-1.5 text-xs font-medium text-[#BBC4C8]"
            htmlFor="offset-slider"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Vertical Safe-Area Nudge</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#F2C078]">
              {project.contentOffsetY > 0 ? `+${project.contentOffsetY}` : project.contentOffsetY}px
            </span>
            {project.contentOffsetY !== 0 && (
              <button
                className="text-[11px] text-white/50 hover:text-white"
                onClick={handleResetOffset}
                type="button"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <input
          className="w-full accent-[#F2C078]"
          id="offset-slider"
          max={120}
          min={-120}
          onChange={handleOffsetYChange}
          step={5}
          type="range"
          value={project.contentOffsetY}
        />
        <p className="text-[11px] text-white/40">
          Nudge the artwork up or down to create space for your phone's clock or lock screen widgets.
        </p>
      </div>

      {/* Show Lock Screen Guides Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-3">
        <div className="flex items-center gap-2.5">
          {shouldShowGuides ? (
            <Eye className="h-4 w-4 text-[#F2C078]" />
          ) : (
            <EyeOff className="h-4 w-4 text-[#BBC4C8]" />
          )}
          <div>
            <p className="text-xs font-semibold text-[#F5F0E6]">
              Show Lock Screen Guides
            </p>
            <p className="text-[11px] text-[#BBC4C8]">
              Simulates iOS/Android clock and shortcuts (excluded from export)
            </p>
          </div>
        </div>

        <button
          aria-checked={shouldShowGuides}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#F2C078] ${
            shouldShowGuides ? "bg-[#F2C078]" : "bg-white/20"
          }`}
          onClick={onToggleGuides}
          role="switch"
          type="button"
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#101A23] shadow-md transition duration-200 ease-in-out ${
              shouldShowGuides ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
