import { Home, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AppearanceControls } from "./components/AppearanceControls";
import { ExportPanel } from "./components/ExportPanel";
import { MilestoneEditor } from "./components/MilestoneEditor";
import { MovingDetailsForm } from "./components/MovingDetailsForm";
import { WallpaperPreview } from "./components/WallpaperPreview";
import { getTodayIsoString } from "./lib/calendar";
import { loadSavedProject, saveProject } from "./lib/storage";
import type { Project } from "./types/project";

export const App: React.FC = () => {
  const [project, setProject] = useState<Project>(() => loadSavedProject());
  const [shouldShowGuides, setShouldShowGuides] = useState<boolean>(true);
  const [todayDate, setTodayDate] = useState<string>(() => getTodayIsoString());

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Keep today's date fresh on window focus or date changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setTodayDate(getTodayIsoString());
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    saveProject(project);
  }, [project]);

  const handleUpdateProject = (updates: Partial<Project>) => {
    setProject((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleToggleGuides = () => {
    setShouldShowGuides((prev) => !prev);
  };

  const handleGetSvgElement = () => svgRef.current;

  return (
    <div className="min-h-screen bg-[#0A1017] text-[#F5F0E6]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A1017]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2C078]/15 text-[#F2C078] shadow-inner shadow-[#F2C078]/20">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-[#F5F0E6] sm:text-base">
                  Landing Day
                </h1>
                <span className="rounded-full bg-[#F2C078]/15 px-2 py-0.5 text-[10px] font-semibold text-[#F2C078]">
                  A Little Closer to Home
                </span>
              </div>
              <p className="text-[11px] text-[#BBC4C8]">
                Personalized countdown lock screen with progressive illumination
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#BBC4C8]">
              <Sparkles className="h-3.5 w-3.5 text-[#F2C078]" />
              <span>5 Milestones · 5 Lit Windows</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {/* Responsive Layout:
            Mobile: Single column (Preview first, then controls)
            Desktop (lg): Two-column layout (Left: Controls, Right: Sticky preview & export) */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Controls Column (Left on Desktop, 7 cols) */}
          <div className="order-2 space-y-6 lg:order-1 lg:col-span-7">
            {/* Moving Details Card */}
            <MovingDetailsForm
              onUpdateProject={handleUpdateProject}
              project={project}
              todayDate={todayDate}
            />

            {/* Preparation Milestone Editor */}
            <MilestoneEditor
              onUpdateProject={handleUpdateProject}
              project={project}
              todayDate={todayDate}
            />

            {/* Theme & Safe-Area Alignment Controls */}
            <AppearanceControls
              onToggleGuides={handleToggleGuides}
              onUpdateProject={handleUpdateProject}
              project={project}
              shouldShowGuides={shouldShowGuides}
            />
          </div>

          {/* Preview & Export Column (Right on Desktop, 5 cols) */}
          <div className="order-1 space-y-6 lg:order-2 lg:col-span-5 lg:sticky lg:top-20">
            {/* Live Interactive Wallpaper Preview */}
            <WallpaperPreview
              project={project}
              ref={svgRef}
              shouldShowGuides={shouldShowGuides}
              todayDate={todayDate}
            />

            {/* High-Resolution Export Panel */}
            <ExportPanel
              getSvgElement={handleGetSvgElement}
              project={project}
            />
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="mt-12 border-t border-white/5 py-8 text-center text-xs text-white/40">
        <p>
          Landing Day — Created for the Handshake AI Skills Studio × Google November Challenge.
        </p>
        <p className="mt-1 text-[11px] text-white/30">
          Pure client-side vector composition · Zero external tracking · Privacy by design
        </p>
      </footer>
    </div>
  );
};
