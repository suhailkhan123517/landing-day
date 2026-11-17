import React from "react";
import type { WallpaperTheme } from "./themes";

interface HomeIllustrationProps {
  completedCount: number;
  theme: WallpaperTheme;
}

export const HomeIllustration: React.FC<HomeIllustrationProps> = ({
  completedCount,
  theme,
}) => {
  // 5 windows: index 1 to 5
  const isWindow1Lit = completedCount >= 1; // Ground Floor Left (Living Room)
  const isWindow2Lit = completedCount >= 2; // Ground Floor Right (Dining / Study)
  const isWindow3Lit = completedCount >= 3; // Upper Floor Left (Bedroom 1)
  const isWindow4Lit = completedCount >= 4; // Center Dormer (Attic / Library)
  const isWindow5Lit = completedCount >= 5; // Upper Floor Right (Bedroom 2)

  return (
    <svg
      aria-label="Architectural illustration of a home filling with warm light as moving milestones are completed"
      className="w-full h-full overflow-visible"
      viewBox="0 0 600 440"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft radial glow for illuminated windows */}
        <radialGradient cx="50%" cy="50%" id="windowGlow" r="50%">
          <stop offset="0%" stopColor={theme.windowLitGlow} stopOpacity="0.85" />
          <stop offset="50%" stopColor={theme.windowLitGlow} stopOpacity="0.4" />
          <stop offset="100%" stopColor={theme.windowLitGlow} stopOpacity="0" />
        </radialGradient>

        {/* Welcoming front door lantern glow */}
        <radialGradient cx="50%" cy="50%" id="doorLanternGlow" r="50%">
          <stop offset="0%" stopColor={theme.doorGlow} stopOpacity="0.9" />
          <stop offset="45%" stopColor={theme.doorGlow} stopOpacity="0.45" />
          <stop offset="100%" stopColor={theme.doorGlow} stopOpacity="0" />
        </radialGradient>

        {/* Chimney dusk smoke gradient */}
        <linearGradient id="smokeGradient" x1="0" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor={theme.secondaryText} stopOpacity="0.35" />
          <stop offset="60%" stopColor={theme.secondaryText} stopOpacity="0.15" />
          <stop offset="100%" stopColor={theme.secondaryText} stopOpacity="0" />
        </linearGradient>

        {/* Soft shadow filter for architectural depth */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Gentle Chimney Smoke Wisps */}
      <g opacity="0.85">
        <path
          d="M 445 105 C 448 85, 435 70, 442 50 C 448 35, 460 25, 455 10"
          fill="none"
          stroke="url(#smokeGradient)"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <path
          d="M 453 105 C 458 90, 450 78, 458 62 C 465 48, 470 38, 468 22"
          fill="none"
          stroke="url(#smokeGradient)"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </g>

      {/* Chimney */}
      <g>
        <rect
          fill={theme.roofFill}
          height="75"
          stroke={theme.architecturalLine}
          strokeWidth="2.5"
          width="36"
          x="432"
          y="105"
        />
        {/* Chimney cap */}
        <rect
          fill={theme.facadeFill}
          height="8"
          stroke={theme.architecturalLine}
          strokeWidth="2"
          width="44"
          x="428"
          y="100"
        />
        {/* Subtle brick courses */}
        <line
          stroke={theme.architecturalLine}
          strokeOpacity="0.5"
          strokeWidth="1.5"
          x1="432"
          x2="468"
          y1="125"
          y2="125"
        />
        <line
          stroke={theme.architecturalLine}
          strokeOpacity="0.5"
          strokeWidth="1.5"
          x1="432"
          x2="468"
          y1="145"
          y2="145"
        />
        <line
          stroke={theme.architecturalLine}
          strokeOpacity="0.5"
          strokeWidth="1.5"
          x1="432"
          x2="468"
          y1="165"
          y2="165"
        />
      </g>

      {/* Main Roof Gable */}
      <path
        d="M 100 200 L 300 90 L 500 200 L 485 200 L 300 102 L 115 200 Z"
        fill={theme.roofFill}
        stroke={theme.architecturalLine}
        strokeLinejoin="round"
        strokeWidth="3"
      />

      {/* Roof Fascia & Eaves Overhang Line */}
      <line
        stroke={theme.architecturalLine}
        strokeWidth="3.5"
        x1="90"
        x2="510"
        y1="202"
        y2="202"
      />

      {/* House Main Facade */}
      <rect
        fill={theme.facadeFill}
        height="200"
        stroke={theme.architecturalLine}
        strokeWidth="3"
        width="370"
        x="115"
        y="202"
      />

      {/* Gable Wall Triangle */}
      <polygon
        fill={theme.facadeFill}
        points="115,202 300,102 485,202"
        stroke={theme.architecturalLine}
        strokeWidth="3"
      />

      {/* Attic Dormer Eaves */}
      <path
        d="M 265 130 L 300 105 L 335 130 Z"
        fill={theme.roofFill}
        stroke={theme.architecturalLine}
        strokeWidth="2"
      />

      {/* Ground Foundation Line & Steps */}
      <line
        stroke={theme.architecturalLine}
        strokeLinecap="round"
        strokeWidth="3"
        x1="60"
        x2="540"
        y1="402"
        y2="402"
      />
      <rect
        fill={theme.facadeFill}
        height="12"
        stroke={theme.architecturalLine}
        strokeWidth="2"
        width="390"
        x="105"
        y="402"
      />
      {/* Front Step */}
      <rect
        fill={theme.roofFill}
        height="8"
        stroke={theme.architecturalLine}
        strokeWidth="2"
        width="96"
        x="252"
        y="408"
      />

      {/* Architectural Floor Division Band */}
      <line
        stroke={theme.architecturalLine}
        strokeDasharray="6 4"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        x1="120"
        x2="480"
        y1="298"
        y2="298"
      />

      {/* =======================================================
          THE FIVE WINDOWS (Illuminated by Milestones)
          ======================================================= */}

      {/* --- WINDOW 4: Center Attic Dormer (Milestone 4) --- */}
      <g>
        {isWindow4Lit && (
          <ellipse
            cx="300"
            cy="158"
            fill="url(#windowGlow)"
            opacity="0.9"
            rx="46"
            ry="46"
          />
        )}
        {/* Window Frame with Arched Top */}
        <path
          d="M 282 178 L 282 152 A 18 18 0 0 1 318 152 L 318 178 Z"
          fill={isWindow4Lit ? theme.windowLitFill : theme.windowUnlitFill}
          stroke={isWindow4Lit ? theme.highlight : theme.architecturalLine}
          strokeWidth="2.5"
        />
        {/* Glazing bars */}
        <line
          stroke={isWindow4Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="300"
          x2="300"
          y1="135"
          y2="178"
        />
        <line
          stroke={isWindow4Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="282"
          x2="318"
          y1="156"
          y2="156"
        />
        {/* Window Sill */}
        <rect
          fill={theme.roofFill}
          height="4"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="44"
          x="278"
          y="178"
        />
      </g>

      {/* --- WINDOW 3: Upper Floor Left (Milestone 3) --- */}
      <g>
        {isWindow3Lit && (
          <ellipse
            cx="185"
            cy="248"
            fill="url(#windowGlow)"
            opacity="0.9"
            rx="56"
            ry="52"
          />
        )}
        {/* Window Panes */}
        <rect
          fill={isWindow3Lit ? theme.windowLitFill : theme.windowUnlitFill}
          height="54"
          stroke={isWindow3Lit ? theme.highlight : theme.architecturalLine}
          strokeWidth="2.5"
          width="44"
          x="163"
          y="222"
        />
        {/* Pane Mullions */}
        <line
          stroke={isWindow3Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="185"
          x2="185"
          y1="222"
          y2="276"
        />
        <line
          stroke={isWindow3Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="163"
          x2="207"
          y1="248"
          y2="248"
        />
        {/* Decorative Shutters Left & Right */}
        <rect
          fill={theme.roofFill}
          height="54"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="12"
          x="148"
          y="222"
        />
        <rect
          fill={theme.roofFill}
          height="54"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="12"
          x="210"
          y="222"
        />
        {/* Window Sill */}
        <rect
          fill={theme.roofFill}
          height="5"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="78"
          x="146"
          y="276"
        />
      </g>

      {/* --- WINDOW 5: Upper Floor Right (Milestone 5) --- */}
      <g>
        {isWindow5Lit && (
          <ellipse
            cx="415"
            cy="248"
            fill="url(#windowGlow)"
            opacity="0.9"
            rx="56"
            ry="52"
          />
        )}
        {/* Window Panes */}
        <rect
          fill={isWindow5Lit ? theme.windowLitFill : theme.windowUnlitFill}
          height="54"
          stroke={isWindow5Lit ? theme.highlight : theme.architecturalLine}
          strokeWidth="2.5"
          width="44"
          x="393"
          y="222"
        />
        {/* Pane Mullions */}
        <line
          stroke={isWindow5Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="415"
          x2="415"
          y1="222"
          y2="276"
        />
        <line
          stroke={isWindow5Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="393"
          x2="437"
          y1="248"
          y2="248"
        />
        {/* Decorative Shutters Left & Right */}
        <rect
          fill={theme.roofFill}
          height="54"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="12"
          x="378"
          y="222"
        />
        <rect
          fill={theme.roofFill}
          height="54"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="12"
          x="440"
          y="222"
        />
        {/* Window Sill */}
        <rect
          fill={theme.roofFill}
          height="5"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="78"
          x="376"
          y="276"
        />
      </g>

      {/* --- WINDOW 1: Ground Floor Left (Living Room, Milestone 1) --- */}
      <g>
        {isWindow1Lit && (
          <ellipse
            cx="185"
            cy="352"
            fill="url(#windowGlow)"
            opacity="0.9"
            rx="65"
            ry="58"
          />
        )}
        {/* Window Frame */}
        <rect
          fill={isWindow1Lit ? theme.windowLitFill : theme.windowUnlitFill}
          height="62"
          stroke={isWindow1Lit ? theme.highlight : theme.architecturalLine}
          strokeWidth="2.5"
          width="54"
          x="158"
          y="322"
        />
        {/* 6-Pane Glazing Bars */}
        <line
          stroke={isWindow1Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="185"
          x2="185"
          y1="322"
          y2="384"
        />
        <line
          stroke={isWindow1Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="158"
          x2="212"
          y1="342"
          y2="342"
        />
        <line
          stroke={isWindow1Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="158"
          x2="212"
          y1="363"
          y2="363"
        />
        {/* Window Sill */}
        <rect
          fill={theme.roofFill}
          height="5"
          stroke={theme.architecturalLine}
          strokeWidth="2"
          width="62"
          x="154"
          y="384"
        />
        {/* Window Header Trim */}
        <line
          stroke={theme.architecturalLine}
          strokeWidth="2.5"
          x1="154"
          x2="216"
          y1="319"
          y2="319"
        />
      </g>

      {/* --- WINDOW 2: Ground Floor Right (Dining / Study, Milestone 2) --- */}
      <g>
        {isWindow2Lit && (
          <ellipse
            cx="415"
            cy="352"
            fill="url(#windowGlow)"
            opacity="0.9"
            rx="65"
            ry="58"
          />
        )}
        {/* Window Frame */}
        <rect
          fill={isWindow2Lit ? theme.windowLitFill : theme.windowUnlitFill}
          height="62"
          stroke={isWindow2Lit ? theme.highlight : theme.architecturalLine}
          strokeWidth="2.5"
          width="54"
          x="388"
          y="322"
        />
        {/* 6-Pane Glazing Bars */}
        <line
          stroke={isWindow2Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="415"
          x2="415"
          y1="322"
          y2="384"
        />
        <line
          stroke={isWindow2Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="388"
          x2="442"
          y1="342"
          y2="342"
        />
        <line
          stroke={isWindow2Lit ? theme.architecturalLine : theme.windowUnlitLine}
          strokeWidth="1.5"
          x1="388"
          x2="442"
          y1="363"
          y2="363"
        />
        {/* Window Sill */}
        <rect
          fill={theme.roofFill}
          height="5"
          stroke={theme.architecturalLine}
          strokeWidth="2"
          width="62"
          x="384"
          y="384"
        />
        {/* Window Header Trim */}
        <line
          stroke={theme.architecturalLine}
          strokeWidth="2.5"
          x1="384"
          x2="446"
          y1="319"
          y2="319"
        />
      </g>

      {/* =======================================================
          THE WELCOMING FRONT DOOR (Always illuminated with warm welcoming glow!)
          ======================================================= */}
      <g>
        {/* Radial lantern glow always shining at the entryway */}
        <ellipse
          cx="300"
          cy="345"
          fill="url(#doorLanternGlow)"
          opacity="0.8"
          rx="70"
          ry="65"
        />

        {/* Door Casing & Frame */}
        <rect
          fill={theme.roofFill}
          height="88"
          stroke={theme.architecturalLine}
          strokeWidth="3"
          width="60"
          x="270"
          y="314"
        />

        {/* Door Panel */}
        <rect
          fill={theme.doorWood}
          height="84"
          width="52"
          x="274"
          y="318"
        />

        {/* Welcoming Door Transom Window (Lighted Glass above door) */}
        <rect
          fill={theme.doorGlow}
          height="14"
          opacity="0.95"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
          width="48"
          x="276"
          y="320"
        />
        {/* Transom grid */}
        <line
          stroke={theme.architecturalLine}
          strokeWidth="1"
          x1="292"
          x2="292"
          y1="320"
          y2="334"
        />
        <line
          stroke={theme.architecturalLine}
          strokeWidth="1"
          x1="308"
          x2="308"
          y1="320"
          y2="334"
        />

        {/* Welcoming Door Small Viewport Window */}
        <circle
          cx="300"
          cy="348"
          fill={theme.doorGlow}
          opacity="0.9"
          r="6"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
        />

        {/* Door Lower Architectural Panels */}
        <rect
          fill="none"
          height="32"
          stroke={theme.architecturalLine}
          strokeOpacity="0.6"
          strokeWidth="1.5"
          width="18"
          x="277"
          y="364"
        />
        <rect
          fill="none"
          height="32"
          stroke={theme.architecturalLine}
          strokeOpacity="0.6"
          strokeWidth="1.5"
          width="18"
          x="305"
          y="364"
        />

        {/* Door Handle / Brass Knob (Gleams in amber) */}
        <circle
          cx="318"
          cy="364"
          fill={theme.highlight}
          r="3"
        />

        {/* Entryway Porch Lantern above Door */}
        <polygon
          fill={theme.roofFill}
          points="292,300 308,300 304,312 296,312"
          stroke={theme.architecturalLine}
          strokeWidth="1.5"
        />
        <circle
          cx="300"
          cy="306"
          fill={theme.doorGlow}
          filter="url(#softGlow)"
          r="4"
        />
      </g>
    </svg>
  );
};
