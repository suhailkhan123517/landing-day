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

    // Responsive scaling based on both dimensions so short/wide or tall screens stay proportional
    const scale = Math.min(width / 1290, height / 2796);
    const effectiveScale = Math.max(0.65, scale);
    const offsetY = contentOffsetY * effectiveScale;

    // Full-height vertical percentage distribution
    // 1. Countdown Region: 24% to 37%
    const countdownCenterY = height * 0.27 + offsetY;
    const countdownLabelY = height * 0.325 + offsetY;
    const movingDateY = height * 0.36 + offsetY;

    // 2. Home Illustration: 38% to 60%
    const houseWidth = Math.min(width * 0.82, height * 0.38 * (600 / 440));
    const houseHeight = houseWidth * (440 / 600);
    const houseX = (width - houseWidth) / 2;
    const houseY = height * 0.385 + offsetY;

    // 3. Next Milestone & Timeline: 61% to 85%
    const timelineBoxWidth = Math.min(width * 0.86, 1020 * effectiveScale);
    const timelineBoxX = (width - timelineBoxWidth) / 2;
    const timelineStartY = height * 0.61 + offsetY;
    const timelineRowGap = 56 * effectiveScale;

    // 4. Ground Foundation Landscape: 86% to 100%
    const groundLevelY = height * 0.89;

    // Celestial night sky stars (subtle, deterministic coordinates in upper 25%)
    const celestialStars = [
      { cx: width * 0.12, cy: height * 0.06, opacity: 0.6, r: 1.8 * effectiveScale },
      { cx: width * 0.24, cy: height * 0.11, opacity: 0.8, r: 2.2 * effectiveScale },
      { cx: width * 0.38, cy: height * 0.05, opacity: 0.5, r: 1.5 * effectiveScale },
      { cx: width * 0.65, cy: height * 0.08, opacity: 0.75, r: 2.0 * effectiveScale },
      { cx: width * 0.82, cy: height * 0.05, opacity: 0.85, r: 2.4 * effectiveScale },
      { cx: width * 0.90, cy: height * 0.12, opacity: 0.5, r: 1.6 * effectiveScale },
      { cx: width * 0.16, cy: height * 0.19, opacity: 0.7, r: 2.0 * effectiveScale },
      { cx: width * 0.85, cy: height * 0.18, opacity: 0.65, r: 1.8 * effectiveScale },
      { cx: width * 0.08, cy: height * 0.28, opacity: 0.55, r: 1.5 * effectiveScale },
      { cx: width * 0.92, cy: height * 0.27, opacity: 0.7, r: 2.1 * effectiveScale },
    ];

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

          {/* Full-Height Atmospheric Sky-to-Ground Gradient */}
          <linearGradient id="fullHeightAtmosphere" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={theme.skyTop} />
            <stop offset="30%" stopColor={theme.background} />
            <stop offset="52%" stopColor={theme.skyMid} />
            <stop offset="78%" stopColor={theme.background} />
            <stop offset="100%" stopColor={theme.groundFill} />
          </linearGradient>

          {/* Ambient Dusk Warm Glow behind the home */}
          <radialGradient cx="50%" cy="48%" id="ambientDuskGlow" r="50%">
            <stop
              offset="0%"
              stopColor={theme.highlight}
              stopOpacity={themeKey === "paper" ? "0.12" : "0.09"}
            />
            <stop
              offset="50%"
              stopColor={theme.highlight}
              stopOpacity={themeKey === "paper" ? "0.04" : "0.03"}
            />
            <stop offset="100%" stopColor={theme.highlight} stopOpacity="0" />
          </radialGradient>

          {/* Next Badge Pill Gradient */}
          <linearGradient id="badgeGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={theme.highlight} stopOpacity="0.2" />
            <stop offset="100%" stopColor={theme.highlight} stopOpacity="0.06" />
          </linearGradient>

          {/* Ground Silhouette Gradient */}
          <linearGradient id="groundLandscapeFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={theme.groundFill} stopOpacity="0.3" />
            <stop offset="100%" stopColor={theme.groundFill} stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* 1. Full-Height Atmospheric Background (covers 100% of height) */}
        <rect
          fill="url(#fullHeightAtmosphere)"
          height={height}
          width={width}
          x="0"
          y="0"
        />

        {/* 2. Soft Ambient Dusk Glow behind home */}
        <rect
          fill="url(#ambientDuskGlow)"
          height={height}
          width={width}
          x="0"
          y="0"
        />

        {/* 3. Delicate Celestial Stars in Upper Sky (Upper 30%) */}
        {themeKey !== "paper" && (
          <g>
            {celestialStars.map((star, i) => (
              <circle
                cx={star.cx}
                cy={star.cy}
                fill={theme.starsColor}
                key={i}
                opacity={star.opacity}
                r={star.r}
              />
            ))}
          </g>
        )}

        {/* =======================================================
            REGION 1: COUNTDOWN (24% - 37%)
            ======================================================= */}
        <g textAnchor="middle">
          {/* Large Countdown Number / Headline */}
          <text
            fill={theme.primaryText}
            fontFamily="'DM Serif Display', Georgia, serif"
            fontSize={
              countdown.isToday || countdown.isWelcomeHome
                ? 130 * effectiveScale
                : 185 * effectiveScale
            }
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
            fontSize={31 * effectiveScale}
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
            fontSize={27 * effectiveScale}
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
            REGION 2: ARCHITECTURAL HOME ILLUSTRATION (38% - 60%)
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
            REGION 3: NEXT ACTION & COMPACT TIMELINE (61% - 85%)
            ======================================================= */}
        <g transform={`translate(${timelineBoxX}, ${timelineStartY})`}>
          {/* Next Milestone Card */}
          {milestoneStatus.allCompleted ? (
            /* All Completed Celebration State */
            <g>
              <rect
                fill={theme.highlight}
                fillOpacity={themeKey === "paper" ? "0.14" : "0.12"}
                height={104 * effectiveScale}
                rx={20 * effectiveScale}
                stroke={theme.highlight}
                strokeOpacity="0.4"
                strokeWidth={1.5 * effectiveScale}
                width={timelineBoxWidth}
                x="0"
                y="0"
              />
              {/* Soft Checkmark Icon */}
              <circle
                cx={48 * effectiveScale}
                cy={52 * effectiveScale}
                fill={theme.completedAccent}
                r={18 * effectiveScale}
              />
              <path
                d={`M ${40 * effectiveScale} ${52 * effectiveScale} L ${46 * effectiveScale} ${58 * effectiveScale} L ${57 * effectiveScale} ${46 * effectiveScale}`}
                fill="none"
                stroke={theme.background}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3 * effectiveScale}
              />
              <text
                fill={theme.primaryText}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={32 * effectiveScale}
                fontWeight="700"
                x={82 * effectiveScale}
                y={61 * effectiveScale}
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
                height={118 * effectiveScale}
                rx={20 * effectiveScale}
                stroke={theme.highlight}
                strokeOpacity="0.35"
                strokeWidth={1.5 * effectiveScale}
                width={timelineBoxWidth}
                x="0"
                y="0"
              />

              {/* Next Badge Pill */}
              <rect
                fill={theme.highlight}
                height={36 * effectiveScale}
                rx={8 * effectiveScale}
                width={
                  milestoneStatus.statusLabel === "TODAY"
                    ? 110 * effectiveScale
                    : milestoneStatus.statusLabel === "STILL TO DO"
                    ? 180 * effectiveScale
                    : 220 * effectiveScale
                }
                x={32 * effectiveScale}
                y={20 * effectiveScale}
              />
              <text
                fill={theme.background}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={19 * effectiveScale}
                fontWeight="800"
                letterSpacing="0.08em"
                x={44 * effectiveScale}
                y={44 * effectiveScale}
              >
                {milestoneStatus.statusLabel}
              </text>

              {/* Next Action Title */}
              <text
                fill={theme.primaryText}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={33 * effectiveScale}
                fontWeight="700"
                letterSpacing="-0.01em"
                x={32 * effectiveScale}
                y={95 * effectiveScale}
              >
                {milestoneStatus.nextMilestone.label}
              </text>
            </g>
          ) : null}

          {/* Compact Preparation Timeline Rows */}
          <g transform={`translate(0, ${150 * effectiveScale})`}>
            {visibleMilestones.map((milestone: Milestone, index: number) => {
              const isNext = milestone.id === milestoneStatus.activeMilestoneId;
              const isCompleted = milestone.completed;
              const rowY = index * timelineRowGap;
              const bulletX = 24 * effectiveScale;

              return (
                <g key={milestone.id} transform={`translate(0, ${rowY})`}>
                  {/* Status Indicator Dot or Checkmark */}
                  {isCompleted ? (
                    <g>
                      <circle
                        cx={bulletX}
                        cy={16 * effectiveScale}
                        fill={theme.completedAccent}
                        r={9 * effectiveScale}
                      />
                      <path
                        d={`M ${bulletX - 4 * effectiveScale} ${16 * effectiveScale} L ${bulletX - 1 * effectiveScale} ${19 * effectiveScale} L ${bulletX + 5 * effectiveScale} ${13 * effectiveScale}`}
                        fill="none"
                        stroke={theme.background}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2 * effectiveScale}
                      />
                    </g>
                  ) : isNext ? (
                    <circle
                      cx={bulletX}
                      cy={16 * effectiveScale}
                      fill={theme.highlight}
                      r={7 * effectiveScale}
                    />
                  ) : (
                    <circle
                      cx={bulletX}
                      cy={16 * effectiveScale}
                      fill="none"
                      stroke={theme.architecturalLine}
                      strokeWidth={2 * effectiveScale}
                      r={6 * effectiveScale}
                    />
                  )}

                  {/* Milestone Date */}
                  <text
                    fill={isNext ? theme.highlight : theme.secondaryText}
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={25 * effectiveScale}
                    fontWeight={isNext ? "700" : "500"}
                    letterSpacing="0.02em"
                    x={52 * effectiveScale}
                    y={24 * effectiveScale}
                  >
                    {formatDateShort(milestone.date)}
                  </text>

                  {/* Separator Bullet */}
                  <text
                    fill={theme.secondaryText}
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={25 * effectiveScale}
                    opacity="0.5"
                    x={145 * effectiveScale}
                    y={24 * effectiveScale}
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
                    fontSize={25 * effectiveScale}
                    fontWeight={isNext ? "700" : "500"}
                    letterSpacing="-0.01em"
                    opacity={isCompleted ? 0.65 : isNext ? 1 : 0.9}
                    x={170 * effectiveScale}
                    y={24 * effectiveScale}
                  >
                    {milestone.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {/* =======================================================
            REGION 4: GROUND LANDSCAPE & BASELINE (86% - 100%)
            ======================================================= */}
        <g>
          {/* Subtle Architectural Horizon Ground Line */}
          <line
            stroke={theme.architecturalLine}
            strokeDasharray="4 6"
            strokeOpacity="0.3"
            strokeWidth={1.5 * effectiveScale}
            x1={width * 0.1}
            x2={width * 0.9}
            y1={groundLevelY}
            y2={groundLevelY}
          />

          {/* Gentle Path / Ground Shrub Silhouettes */}
          <g opacity="0.35">
            <path
              d={`M ${width * 0.44} ${groundLevelY} C ${width * 0.45} ${height * 0.94}, ${width * 0.42} ${height * 0.98}, ${width * 0.40} ${height}`}
              fill="none"
              stroke={theme.architecturalLine}
              strokeWidth={1.5 * effectiveScale}
            />
            <path
              d={`M ${width * 0.56} ${groundLevelY} C ${width * 0.55} ${height * 0.94}, ${width * 0.58} ${height * 0.98}, ${width * 0.60} ${height}`}
              fill="none"
              stroke={theme.architecturalLine}
              strokeWidth={1.5 * effectiveScale}
            />
          </g>

          {/* Ambient Ground Base Tone */}
          <rect
            fill="url(#groundLandscapeFade)"
            height={height - groundLevelY}
            width={width}
            x="0"
            y={groundLevelY}
          />
        </g>
      </svg>
    );
  }
);

WallpaperArtwork.displayName = "WallpaperArtwork";
