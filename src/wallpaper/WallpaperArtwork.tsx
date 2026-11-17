import React, { forwardRef } from "react";
import { formatDateShort, getCountdownInfo } from "../lib/calendar";
import { FONT_FACE_CSS } from "../lib/fonts";
import { evaluateMilestoneStatus, sortMilestonesByDate } from "../lib/milestones";
import type { Milestone, Project } from "../types/project";
import { HomeIllustration } from "./HomeIllustration";
import { WALLPAPER_THEMES } from "./themes";

interface WallpaperArtworkProps {
  embedFonts?: boolean;
  project: Project;
  todayDate: string;
}

export const WallpaperArtwork = forwardRef<SVGSVGElement, WallpaperArtworkProps>(
  ({ embedFonts = true, project, todayDate }, ref) => {
    const { contentOffsetY, height, milestones, moveDate, theme: themeKey, title, width } = project;
    const theme = WALLPAPER_THEMES[themeKey] || WALLPAPER_THEMES.midnight;

    // Evaluate countdown and milestone progress
    const countdown = getCountdownInfo({
      moveDate,
      title,
      todayDate,
    });

    const milestoneStatus = evaluateMilestoneStatus(milestones, todayDate);
    const sortedMilestones = sortMilestonesByDate(milestones);
    // Cap at 5 milestones for maximum visual balance on phone screen as requested by the brief
    const visibleMilestones = sortedMilestones.slice(0, 5);

    // Scale factor relative to 1290 x 2796 reference
    const scale = height / 2796;
    const offsetY = contentOffsetY * scale;

    // Geometry coordinates (scaled)
    // Region 1: 30% to 46% (y ~ 820 to 1280 on 2796h)
    const countdownCenterY = (920 + contentOffsetY) * scale;
    const countdownLabelY = (1050 + contentOffsetY) * scale;
    const movingDateY = (1120 + contentOffsetY) * scale;

    // Region 2: 47% to 68% (Home illustration)
    const houseWidth = Math.min(width * 0.76, 920 * scale);
    const houseHeight = houseWidth * (440 / 600);
    const houseX = (width - houseWidth) / 2;
    const houseY = (1200 + contentOffsetY) * scale;

    // Region 3: 69% to 86% (Next Milestone & Compact Timeline)
    const timelineStartY = (1890 + contentOffsetY) * scale;
    const timelineBoxWidth = Math.min(width * 0.82, 980 * scale);
    const timelineBoxX = (width - timelineBoxWidth) / 2;

    return (
      <svg
        className="block w-full h-full"
        height={height}
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {embedFonts && (
            <style dangerouslySetInnerHTML={{ __html: FONT_FACE_CSS }} />
          )}

          {/* Ambient background subtle dusk glow */}
          <radialGradient cx="50%" cy="45%" id="ambientDuskGlow" r="55%">
            <stop
              offset="0%"
              stopColor={theme.highlight}
              stopOpacity={themeKey === "paper" ? "0.08" : "0.06"}
            />
            <stop offset="60%" stopColor={theme.highlight} stopOpacity="0" />
          </radialGradient>

          {/* Next badge pill gradient */}
          <linearGradient id="badgeGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={theme.highlight} stopOpacity="0.18" />
            <stop offset="100%" stopColor={theme.highlight} stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Background Fill */}
        <rect fill={theme.background} height={height} width={width} x="0" y="0" />

        {/* Subtle Radial Dusk Glow behind the home */}
        <rect
          fill="url(#ambientDuskGlow)"
          height={height}
          width={width}
          x="0"
          y="0"
        />

        {/* =======================================================
            REGION 1: COUNTDOWN (30% - 47%)
            ======================================================= */}
        <g textAnchor="middle">
          {/* Large Countdown Number / Headline */}
          <text
            fill={theme.primaryText}
            fontFamily="'DM Serif Display', Georgia, serif"
            fontSize={countdown.isToday || countdown.isWelcomeHome ? 130 * scale : 190 * scale}
            fontWeight="400"
            letterSpacing="-0.02em"
            x={width / 2}
            y={countdownCenterY}
          >
            {countdown.headline}
          </text>

          {/* Subhead / Days Until Home */}
          <text
            fill={theme.secondaryText}
            fontFamily="'Manrope', -apple-system, sans-serif"
            fontSize={32 * scale}
            fontWeight="600"
            letterSpacing="0.16em"
            x={width / 2}
            y={countdownLabelY}
          >
            {countdown.subhead}
          </text>

          {/* Moving Day Date */}
          <text
            fill={theme.secondaryText}
            fontFamily="'Manrope', -apple-system, sans-serif"
            fontSize={28 * scale}
            fontWeight="500"
            letterSpacing="0.04em"
            opacity="0.85"
            x={width / 2}
            y={movingDateY}
          >
            {countdown.dateLabel}
          </text>
        </g>

        {/* =======================================================
            REGION 2: ARCHITECTURAL HOME ILLUSTRATION (47% - 68%)
            ======================================================= */}
        <g transform={`translate(${houseX}, ${houseY})`}>
          <svg height={houseHeight} viewBox="0 0 600 440" width={houseWidth}>
            <HomeIllustration
              completedCount={milestoneStatus.completedCount}
              theme={theme}
            />
          </svg>
        </g>

        {/* =======================================================
            REGION 3: NEXT ACTION & COMPACT TIMELINE (69% - 86%)
            ======================================================= */}
        <g transform={`translate(${timelineBoxX}, ${timelineStartY})`}>
          {/* Next Milestone Card */}
          {milestoneStatus.allCompleted ? (
            /* All Completed Celebration State */
            <g>
              <rect
                fill={theme.highlight}
                fillOpacity={themeKey === "paper" ? "0.14" : "0.12"}
                height={100 * scale}
                rx={20 * scale}
                stroke={theme.highlight}
                strokeOpacity="0.4"
                strokeWidth={1.5 * scale}
                width={timelineBoxWidth}
                x="0"
                y="0"
              />
              {/* Soft Checkmark / Star Icon */}
              <circle
                cx={48 * scale}
                cy={50 * scale}
                fill={theme.completedAccent}
                r={18 * scale}
              />
              <path
                d={`M ${40 * scale} ${50 * scale} L ${46 * scale} ${56 * scale} L ${57 * scale} ${44 * scale}`}
                fill="none"
                stroke={theme.background}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3 * scale}
              />
              <text
                fill={theme.primaryText}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={32 * scale}
                fontWeight="700"
                x={80 * scale}
                y={58 * scale}
              >
                You’re ready for moving day.
              </text>
            </g>
          ) : milestoneStatus.nextMilestone ? (
            /* Active Next Action Callout */
            <g>
              {/* Pill Container */}
              <rect
                fill="url(#badgeGradient)"
                height={116 * scale}
                rx={20 * scale}
                stroke={theme.highlight}
                strokeOpacity="0.35"
                strokeWidth={1.5 * scale}
                width={timelineBoxWidth}
                x="0"
                y="0"
              />

              {/* Next Badge Pill */}
              <rect
                fill={theme.highlight}
                height={36 * scale}
                rx={8 * scale}
                width={
                  milestoneStatus.statusLabel === "TODAY"
                    ? 110 * scale
                    : milestoneStatus.statusLabel === "STILL TO DO"
                    ? 180 * scale
                    : 220 * scale
                }
                x={32 * scale}
                y={20 * scale}
              />
              <text
                fill={theme.background}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={19 * scale}
                fontWeight="800"
                letterSpacing="0.08em"
                x={44 * scale}
                y={44 * scale}
              >
                {milestoneStatus.statusLabel}
              </text>

              {/* Next Action Title */}
              <text
                fill={theme.primaryText}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={34 * scale}
                fontWeight="700"
                letterSpacing="-0.01em"
                x={32 * scale}
                y={94 * scale}
              >
                {milestoneStatus.nextMilestone.label}
              </text>
            </g>
          ) : null}

          {/* Compact Preparation Timeline Rows */}
          <g transform={`translate(0, ${150 * scale})`}>
            {visibleMilestones.map((milestone: Milestone, index: number) => {
              const isNext = milestone.id === milestoneStatus.activeMilestoneId;
              const isCompleted = milestone.completed;
              const rowY = index * 48 * scale;
              const bulletX = 24 * scale;

              return (
                <g key={milestone.id} transform={`translate(0, ${rowY})`}>
                  {/* Status Indicator Dot or Checkmark */}
                  {isCompleted ? (
                    <g>
                      <circle
                        cx={bulletX}
                        cy={16 * scale}
                        fill={theme.completedAccent}
                        r={9 * scale}
                      />
                      <path
                        d={`M ${bulletX - 4 * scale} ${16 * scale} L ${bulletX - 1 * scale} ${19 * scale} L ${bulletX + 5 * scale} ${13 * scale}`}
                        fill="none"
                        stroke={theme.background}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2 * scale}
                      />
                    </g>
                  ) : isNext ? (
                    <circle
                      cx={bulletX}
                      cy={16 * scale}
                      fill={theme.highlight}
                      r={7 * scale}
                    />
                  ) : (
                    <circle
                      cx={bulletX}
                      cy={16 * scale}
                      fill="none"
                      stroke={theme.architecturalLine}
                      strokeWidth={2 * scale}
                      r={6 * scale}
                    />
                  )}

                  {/* Milestone Date */}
                  <text
                    fill={isNext ? theme.highlight : theme.secondaryText}
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={25 * scale}
                    fontWeight={isNext ? "700" : "500"}
                    letterSpacing="0.02em"
                    x={52 * scale}
                    y={24 * scale}
                  >
                    {formatDateShort(milestone.date)}
                  </text>

                  {/* Separator Bullet */}
                  <text
                    fill={theme.secondaryText}
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={25 * scale}
                    opacity="0.5"
                    x={145 * scale}
                    y={24 * scale}
                  >
                    ·
                  </text>

                  {/* Milestone Label */}
                  <text
                    fill={
                      isCompleted
                        ? theme.secondaryText
                        : isNext
                        ? theme.primaryText
                        : theme.primaryText
                    }
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={25 * scale}
                    fontWeight={isNext ? "700" : "500"}
                    letterSpacing="-0.01em"
                    opacity={isCompleted ? 0.65 : isNext ? 1 : 0.9}
                    x={170 * scale}
                    y={24 * scale}
                  >
                    {milestone.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {/* Region 4 (86% - 100%): Intentionally kept quiet for phone UI controls! */}
      </svg>
    );
  }
);

WallpaperArtwork.displayName = "WallpaperArtwork";
