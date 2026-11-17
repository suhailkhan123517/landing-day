import { Check, Download, Info, Loader2, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import { exportWallpaperPng, getExportFileName } from "../lib/exportPng";
import type { Project } from "../types/project";

interface ExportPanelProps {
  getSvgElement: () => SVGSVGElement | null;
  project: Project;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  getSvgElement,
  project,
}) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [hasExported, setHasExported] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const handleExport = async () => {
    const svg = getSvgElement();
    if (!svg) {
      setErrorMessage("Wallpaper preview element could not be found.");
      return;
    }

    try {
      setIsExporting(true);
      setErrorMessage(null);
      await exportWallpaperPng({
        project,
        svgElement: svg,
      });
      setHasExported(true);
      setTimeout(() => {
        setHasExported(false);
      }, 4000);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to generate wallpaper image"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const fileName = getExportFileName(project);

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      {/* Primary Download Action Button */}
      <button
        className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#F2C078] px-6 py-4 text-base font-bold text-[#101A23] shadow-lg shadow-[#F2C078]/15 transition-all hover:bg-[#ffd99f] hover:shadow-[#F2C078]/25 active:scale-[0.99] disabled:opacity-60"
        disabled={isExporting}
        onClick={handleExport}
        type="button"
      >
        {isExporting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-[#101A23]" />
            <span>Rendering High-Res Wallpaper...</span>
          </>
        ) : hasExported ? (
          <>
            <Check className="h-5 w-5 stroke-[2.5] text-[#101A23]" />
            <span>Wallpaper Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5 stroke-[2.5] transition-transform group-hover:-translate-y-0.5" />
            <span>Download Wallpaper PNG</span>
          </>
        )}
      </button>

      {/* Target Spec Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#BBC4C8]">
        <span className="font-mono text-white/70">
          Target: {fileName}
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-[#F2C078]">
          {project.width} × {project.height} px
        </span>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
          {errorMessage}
        </div>
      )}

      {/* Reassurance & Transparency Callout */}
      <div className="rounded-xl border border-white/10 bg-black/30 p-3.5 space-y-2 text-xs text-[#BBC4C8]">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F2C078]" />
          <p className="leading-relaxed">
            <span className="font-semibold text-[#F5F0E6]">
              Your countdown is current for today.
            </span>{" "}
            Export again whenever you want a fresh wallpaper snapshot as your move approaches.
          </p>
        </div>

        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-white/50 border-t border-white/5">
          <ShieldCheck className="h-3 w-3 text-[#AEC7AE]" />
          <span>Guaranteed clean export: System clock and controls guides are strictly excluded.</span>
        </div>
      </div>
    </div>
  );
};
