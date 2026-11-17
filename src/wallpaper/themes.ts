import type { DevicePreset, ThemeKey } from "../types/project";

export interface WallpaperTheme {
  architecturalLine: string;
  background: string;
  character: string;
  completedAccent: string;
  doorGlow: string;
  doorWood: string;
  facadeFill: string;
  highlight: string;
  id: ThemeKey;
  name: string;
  primaryText: string;
  roofFill: string;
  secondaryText: string;
  tagline: string;
  timelineTrack: string;
  windowLitFill: string;
  windowLitGlow: string;
  windowUnlitFill: string;
  windowUnlitLine: string;
}

export const WALLPAPER_THEMES: Record<ThemeKey, WallpaperTheme> = {
  evergreen: {
    architecturalLine: "#4D675A",
    background: "#0D1F18",
    character: "Calm, soft, nature-inspired botanical dusk",
    completedAccent: "#88D4A6",
    doorGlow: "#F5C87A",
    doorWood: "#1B3B2F",
    facadeFill: "#122820",
    highlight: "#F5C87A",
    id: "evergreen",
    name: "Evergreen / Cream",
    primaryText: "#F7F5EE",
    roofFill: "#0A1813",
    secondaryText: "#9CB0A3",
    tagline: "Quiet botanical warmth",
    timelineTrack: "rgba(156, 176, 163, 0.2)",
    windowLitFill: "#FFF2CF",
    windowLitGlow: "#F5C87A",
    windowUnlitFill: "#162E23",
    windowUnlitLine: "#334A3F",
  },
  midnight: {
    architecturalLine: "#647780",
    background: "#101A23",
    character: "Dark, warm, atmospheric; the flagship hero",
    completedAccent: "#AEC7AE",
    doorGlow: "#F2C078",
    doorWood: "#1E3040",
    facadeFill: "#15222E",
    highlight: "#F2C078",
    id: "midnight",
    name: "Midnight / Amber",
    primaryText: "#F5F0E6",
    roofFill: "#0D151D",
    secondaryText: "#BBC4C8",
    tagline: "Dusk architectural serenity",
    timelineTrack: "rgba(187, 196, 200, 0.2)",
    windowLitFill: "#FFDFA3",
    windowLitGlow: "#F2C078",
    windowUnlitFill: "#1B2A38",
    windowUnlitLine: "#425665",
  },
  paper: {
    architecturalLine: "#50575E",
    background: "#F7F4EE",
    character: "Light, editorial, architectural print",
    completedAccent: "#4E6B56",
    doorGlow: "#E59560",
    doorWood: "#E0D7C7",
    facadeFill: "#EFEBE2",
    highlight: "#D86A43",
    id: "paper",
    name: "Paper / Terracotta",
    primaryText: "#22252A",
    roofFill: "#E4DED3",
    secondaryText: "#6F767E",
    tagline: "Warm book-cover edition",
    timelineTrack: "rgba(111, 118, 126, 0.25)",
    windowLitFill: "#FFF1E0",
    windowLitGlow: "#FFA76B",
    windowUnlitFill: "#E3DDD0",
    windowUnlitLine: "#B5ADA0",
  },
};

export const DEVICE_PRESETS: DevicePreset[] = [
  {
    height: 2796,
    id: "iphone-pro-max",
    name: "iPhone 16 / 15 / 14 Pro Max (1290 × 2796)",
    width: 1290,
  },
  {
    height: 2556,
    id: "iphone-pro",
    name: "iPhone 16 / 15 / 14 Pro (1179 × 2556)",
    width: 1179,
  },
  {
    height: 2532,
    id: "iphone-standard",
    name: "iPhone 14 / 13 / 12 (1170 × 2532)",
    width: 1170,
  },
  {
    height: 1334,
    id: "iphone-se",
    name: "iPhone SE / 8 (750 × 1334)",
    width: 750,
  },
  {
    height: 3120,
    id: "android-flagship",
    name: "Pixel 9 Pro / Galaxy S24 Ultra (1440 × 3120)",
    width: 1440,
  },
  {
    height: 2400,
    id: "android-standard",
    name: "Pixel 9 / Galaxy S24 (1080 × 2400)",
    width: 1080,
  },
];
