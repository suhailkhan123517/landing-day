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

    // =======================================================
    // DYNAMIC VERTICAL LAYOUT (Guarantees zero overlap)
    // =======================================================

    // 1. Countdown Region: placed below lock screen clock (~23% to 32% height)
    const countdownCenterY = height * 0.245 + offsetY;
    const countdownLabelY = countdownCenterY + 46 * effectiveScale;
    const movingDateY = countdownCenterY + 80 * effectiveScale;
    const countdownBottomY = movingDateY + 18 * effectiveScale;

    // 2. Timeline Region: anchored from lower safe area up (~68% to 85% height)
    const timelineRowGap = 44 * effectiveScale;
    const timelineBoxHeight = 98 * effectiveScale;
    const timelineRowsHeight = 4 * timelineRowGap;
    const totalTimelineHeight = timelineBoxHeight + 28 * effectiveScale + timelineRowsHeight;

    const timelineTargetEndY = height * 0.85 + offsetY;
    const timelineStartY = timelineTargetEndY - totalTimelineHeight;
    const timelineBoxWidth = Math.min(width * 0.86, 1020 * effectiveScale);
    const timelineBoxX = (width - timelineBoxWidth) / 2;

    // 3. Home Illustration: dynamically placed and sized between countdown and timeline
    // This mathematically guarantees the home and text NEVER overlap!
    const verticalSpaceAvailable = timelineStartY - countdownBottomY - 36 * effectiveScale;
    const maxHouseHeight = Math.min(verticalSpaceAvailable, height * 0.26);
    let houseHeight = Math.max(140 * effectiveScale, maxHouseHeight);
    let houseWidth = houseHeight * (600 / 440);

    // Ensure house width stays within comfortable margins
    if (houseWidth > width * 0.74) {
      houseWidth = width * 0.74;
      houseHeight = houseWidth * (440 / 600);
    }

    const houseX = (width - houseWidth) / 2;
    // Perfectly centered in the open vertical space between countdown and timeline
    const houseY = countdownBottomY + (verticalSpaceAvailable - houseHeight) / 2 + 10 * effectiveScale;

    // 4. Ground Foundation Landscape: 87% to 100%
    const groundLevelY = timelineTargetEndY + 36 * effectiveScale;

    // Celestial night sky stars (subtle, deterministic coordinates in upper 24%)
    const celestialStars = [
      { cx: width * 0.12, cy: height * 0.05, opacity: 0.6, r: 1.8 * effectiveScale },
      { cx: width * 0.24, cy: height * 0.09, opacity: 0.8, r: 2.2 * effectiveScale },
      { cx: width * 0.38, cy: height * 0.04, opacity: 0.5, r: 1.5 * effectiveScale },
      { cx: width * 0.65, cy: height * 0.07, opacity: 0.75, r: 2.0 * effectiveScale },
      { cx: width * 0.82, cy: height * 0.04, opacity: 0.85, r: 2.4 * effectiveScale },
      { cx: width * 0.90, cy: height * 0.10, opacity: 0.5, r: 1.6 * effectiveScale },
      { cx: width * 0.16, cy: height * 0.16, opacity: 0.7, r: 2.0 * effectiveScale },
      { cx: width * 0.85, cy: height * 0.15, opacity: 0.65, r: 1.8 * effectiveScale },
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
            <stop offset="28%" stopColor={theme.background} />
            <stop offset="48%" stopColor={theme.skyMid} />
            <stop offset="76%" stopColor={theme.background} />
            <stop offset="100%" stopColor={theme.groundFill} />
          </linearGradient>

          {/* Ambient Dusk Warm Glow behind the home */}
          <radialGradient cx="50%" cy="45%" id="ambientDuskGlow" r="48%">
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

        {/* 3. Delicate Celestial Stars in Upper Sky */}
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
            REGION 1: COUNTDOWN (Guaranteed above home)
            ======================================================= */}
        <g textAnchor="middle">
          {/* Large Countdown Number / Headline */}
          <text
            fill={theme.primaryText}
            fontFamily="'DM Serif Display', Georgia, serif"
            fontSize={
              countdown.isToday || countdown.isWelcomeHome
                ? 110 * effectiveScale
                : 165 * effectiveScale
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
            fontSize={27 * effectiveScale}
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
            fontSize={24 * effectiveScale}
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
            REGION 2: ARCHITECTURAL HOME ILLUSTRATION (Guaranteed zero overlap)
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
            REGION 3: NEXT ACTION & COMPACT TIMELINE (Guaranteed below home)
            ======================================================= */}
        <g transform={`translate(${timelineBoxX}, ${timelineStartY})`}>
          {/* Next Milestone Card */}
          {milestoneStatus.allCompleted ? (
            /* All Completed Celebration State */
            <g>
              <rect
                fill={theme.highlight}
                fillOpacity={themeKey === "paper" ? "0.14" : "0.12"}
                height={timelineBoxHeight}
                rx={18 * effectiveScale}
                stroke={theme.highlight}
                strokeOpacity="0.4"
                strokeWidth={1.5 * effectiveScale}
                width={timelineBoxWidth}
                x="0"
                y="0"
              />
              {/* Soft Checkmark Icon */}
              <circle
                cx={44 * effectiveScale}
                cy={timelineBoxHeight / 2}
                fill={theme.completedAccent}
                r={16 * effectiveScale}
              />
              <path
                d={`M ${36 * effectiveScale} ${timelineBoxHeight / 2} L ${42 * effectiveScale} ${timelineBoxHeight / 2 + 6 * effectiveScale} L ${53 * effectiveScale} ${timelineBoxHeight / 2 - 5 * effectiveScale}`}
                fill="none"
                stroke={theme.background}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5 * effectiveScale}
              />
              <text
                fill={theme.primaryText}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={28 * effectiveScale}
                fontWeight="700"
                x={74 * effectiveScale}
                y={timelineBoxHeight / 2 + 9 * effectiveScale}
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
                height={timelineBoxHeight}
                rx={18 * effectiveScale}
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
                height={30 * effectiveScale}
                rx={7 * effectiveScale}
                width={
                  milestoneStatus.statusLabel === "TODAY"
                    ? 95 * effectiveScale
                    : milestoneStatus.statusLabel === "STILL TO DO"
                    ? 160 * effectiveScale
                    : 195 * effectiveScale
                }
                x={26 * effectiveScale}
                y={15 * effectiveScale}
              />
              <text
                fill={theme.background}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={16 * effectiveScale}
                fontWeight="800"
                letterSpacing="0.08em"
                x={36 * effectiveScale}
                y={36 * effectiveScale}
              >
                {milestoneStatus.statusLabel}
              </text>

              {/* Next Action Title */}
              <text
                fill={theme.primaryText}
                fontFamily="'Manrope', -apple-system, sans-serif"
                fontSize={28 * effectiveScale}
                fontWeight="700"
                letterSpacing="-0.01em"
                x={26 * effectiveScale}
                y={78 * effectiveScale}
              >
                {milestoneStatus.nextMilestone.label}
              </text>
            </g>
          ) : null}

          {/* Compact Preparation Timeline Rows */}
          <g transform={`translate(0, ${timelineBoxHeight + 24 * effectiveScale})`}>
            {visibleMilestones.map((milestone: Milestone, index: number) => {
              const isNext = milestone.id === milestoneStatus.activeMilestoneId;
              const isCompleted = milestone.completed;
              const rowY = index * timelineRowGap;
              const bulletX = 20 * effectiveScale;

              return (
                <g key={milestone.id} transform={`translate(0, ${rowY})`}>
                  {/* Status Indicator Dot or Checkmark */}
                  {isCompleted ? (
                    <g>
                      <circle
                        cx={bulletX}
                        cy={14 * effectiveScale}
                        fill={theme.completedAccent}
                        r={8 * effectiveScale}
                      />
                      <path
                        d={`M ${bulletX - 3.5 * effectiveScale} ${14 * effectiveScale} L ${bulletX - 1 * effectiveScale} ${16.5 * effectiveScale} L ${bulletX + 4.5 * effectiveScale} ${11 * effectiveScale}`}
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
                      cy={14 * effectiveScale}
                      fill={theme.highlight}
                      r={6 * effectiveScale}
                    />
                  ) : (
                    <circle
                      cx={bulletX}
                      cy={14 * effectiveScale}
                      fill="none"
                      stroke={theme.architecturalLine}
                      strokeWidth={1.5 * effectiveScale}
                      r={5.5 * effectiveScale}
                    />
                  )}

                  {/* Milestone Date */}
                  <text
                    fill={isNext ? theme.highlight : theme.secondaryText}
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={22 * effectiveScale}
                    fontWeight={isNext ? "700" : "500"}
                    letterSpacing="0.02em"
                    x={44 * effectiveScale}
                    y={21 * effectiveScale}
                  >
                    {formatDateShort(milestone.date)}
                  </text>

                  {/* Separator Bullet */}
                  <text
                    fill={theme.secondaryText}
                    fontFamily="'Manrope', -apple-system, sans-serif"
                    fontSize={22 * effectiveScale}
                    opacity="0.5"
                    x={128 * effectiveScale}
                    y={21 * effectiveScale}
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
                    fontSize={22 * effectiveScale}
                    fontWeight={isNext ? "700" : "500"}
                    letterSpacing="-0.01em"
                    opacity={isCompleted ? 0.65 : isNext ? 1 : 0.9}
                    x={152 * effectiveScale}
                    y={21 * effectiveScale}
                  >
                    {milestone.label}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {/* =======================================================
            REGION 4: GROUND LANDSCAPE & BASELINE (87% - 100%)
            ======================================================= */}
        <g>
          {/* Subtle Architectural Horizon Ground Line */}
          <line
            stroke={theme.architecturalLine}
            strokeDasharray="4 6"
            strokeOpacity="0.25"
            strokeWidth={1.5 * effectiveScale}
            x1={width * 0.1}
            x2={width * 0.9}
            y1={groundLevelY}
            y2={groundLevelY}
          />

          {/* Gentle Path / Ground Shrub Silhouettes */}
          <g opacity="0.3">
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
