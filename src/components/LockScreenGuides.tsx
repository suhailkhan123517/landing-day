import { Camera, Flashlight, Wifi } from "lucide-react";
import React from "react";

interface LockScreenGuidesProps {
  clockTime?: string;
  dateString?: string;
  isLightMode?: boolean;
}

export const LockScreenGuides: React.FC<LockScreenGuidesProps> = ({
  clockTime = "9:41",
  dateString = "Monday, Nov 17",
  isLightMode = false,
}) => {
  const textColor = isLightMode ? "text-neutral-900" : "text-white";
  const iconBg = isLightMode ? "bg-black/10 text-neutral-800" : "bg-white/20 text-white";
  const barColor = isLightMode ? "bg-neutral-900" : "bg-white";

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 select-none">
      {/* Top Section: Dynamic Island, Status Bar, and Lock Screen Clock */}
      <div className="flex flex-col items-center">
        {/* Top Status Bar Row */}
        <div className="flex w-full items-center justify-between px-3 pt-1 text-xs font-semibold tracking-tight">
          <span className={textColor}>{clockTime}</span>

          {/* Dynamic Island Cutout */}
          <div className="h-6 w-28 rounded-full bg-black shadow-inner shadow-black/60" />

          {/* Status Icons */}
          <div className={`flex items-center gap-1.5 ${textColor}`}>
            {/* Cellular signal bars */}
            <svg className="h-3 w-4 fill-current" viewBox="0 0 17 12">
              <rect height="3" rx="0.5" width="2.5" x="0.5" y="8.5" />
              <rect height="5.5" rx="0.5" width="2.5" x="4.5" y="6" />
              <rect height="8" rx="0.5" width="2.5" x="8.5" y="3.5" />
              <rect height="10.5" rx="0.5" width="2.5" x="12.5" y="1" />
            </svg>
            <Wifi className="h-3 w-3 stroke-[2.5]" />
            {/* Battery icon */}
            <div className="relative flex h-3 w-5 items-center rounded-[3px] border border-current p-[1px]">
              <div className="h-full w-full rounded-[1.5px] bg-current" />
              <div className="absolute -right-[3px] h-1.5 w-[2px] rounded-r-[1px] bg-current" />
            </div>
          </div>
        </div>

        {/* Lock Screen Date & Clock (0% - 24% Safe Area) */}
        <div className="mt-2.5 sm:mt-4 flex flex-col items-center">
          <div
            className={`text-xs sm:text-sm font-semibold tracking-wide drop-shadow-sm opacity-90 ${textColor}`}
          >
            {dateString}
          </div>
          <div
            className={`font-sans-ui text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight drop-shadow-md ${textColor}`}
          >
            {clockTime}
          </div>
        </div>
      </div>

      {/* Bottom Section: Flashlight, Camera & Home Indicator (86% - 100%) */}
      <div className="flex flex-col items-center gap-3 pb-1">
        {/* Quick Action Shortcuts */}
        <div className="flex w-full justify-between px-4 sm:px-6">
          <div
            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full backdrop-blur-md shadow-lg ${iconBg}`}
          >
            <Flashlight className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div
            className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full backdrop-blur-md shadow-lg ${iconBg}`}
          >
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className={`h-1.5 w-32 sm:w-36 rounded-full opacity-70 ${barColor}`} />
      </div>
    </div>
  );
};
