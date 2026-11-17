import React, { forwardRef } from "react";
import type { Project } from "../types/project";
import { WallpaperArtwork } from "../wallpaper/WallpaperArtwork";
import { LockScreenGuides } from "./LockScreenGuides";

interface WallpaperPreviewProps {
  project: Project;
  shouldShowGuides: boolean;
  todayDate: string;
}

export const WallpaperPreview = forwardRef<SVGSVGElement, WallpaperPreviewProps>(
  ({ project, shouldShowGuides, todayDate }, ref) => {
    const aspectRatio = project.width / project.height;

    return (
      <div className="relative mx-auto flex w-full max-w-[420px] flex-col items-center">
        {/* Physical Device Frame Mockup */}
        <div
          className="relative w-full overflow-hidden rounded-[48px] border-[10px] border-[#222930] bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-black/80 transition-all duration-300"
          style={{ aspectRatio }}
        >
          {/* Inner Screen Area */}
          <div className="relative h-full w-full select-none overflow-hidden">
            {/* The Pure Vector Wallpaper SVG (Used both for preview and export) */}
            <div className="h-full w-full">
              <WallpaperArtwork
                embedFonts={true}
                project={project}
                ref={ref}
                todayDate={todayDate}
              />
            </div>

            {/* Lock Screen Guides Overlay (Preview Only, Never exported) */}
            {shouldShowGuides && (
              <LockScreenGuides isLightMode={project.theme === "paper"} />
            )}
          </div>
        </div>

        {/* Device Frame Label & Indicator */}
        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-[#BBC4C8]/70">
          <span className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                shouldShowGuides ? "bg-[#F2C078]" : "bg-white/20"
              }`}
            />
            {shouldShowGuides ? "Lock screen guides active" : "Clean wallpaper view"}
          </span>
          <span className="font-mono">
            {project.width} × {project.height}
          </span>
        </div>
      </div>
    );
  }
);

WallpaperPreview.displayName = "WallpaperPreview";
