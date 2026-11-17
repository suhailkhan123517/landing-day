import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LockScreenGuides } from "../src/components/LockScreenGuides";
import { FONT_FACE_CSS } from "../src/lib/fonts";
import { createDefaultMilestones } from "../src/lib/milestones";
import type { Project, ThemeKey } from "../types/project";
import { WallpaperArtwork } from "../src/wallpaper/WallpaperArtwork";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT_DIR = process.cwd();

// Base project matching the brief's sample on Nov 13, 2026 for Dec 1, 2026 (18 days until home)
const baseProject: Project = {
  contentOffsetY: 0,
  height: 2796,
  milestones: [
    {
      completed: false,
      date: "2026-11-15",
      id: "m-sort",
      label: "Sort what comes with you",
    },
    {
      completed: false,
      date: "2026-11-20",
      id: "m-book",
      label: "Book the move",
    },
    {
      completed: false,
      date: "2026-11-25",
      id: "m-services",
      label: "Arrange essential services",
    },
    {
      completed: false,
      date: "2026-11-28",
      id: "m-keys",
      label: "Confirm keys and access",
    },
    {
      completed: false,
      date: "2026-11-30",
      id: "m-bag",
      label: "Pack your first-night bag",
    },
  ],
  moveDate: "2026-12-01",
  theme: "midnight",
  title: "",
  version: 1,
  width: 1290,
};

const themes: ThemeKey[] = ["midnight", "paper", "evergreen"];

function renderWallpaperHtml(project: Project, todayDate: string): string {
  const svgMarkup = renderToStaticMarkup(
    <WallpaperArtwork embedFonts={true} project={project} todayDate={todayDate} />
  );

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: ${project.width}px; height: ${project.height}px; overflow: hidden; background: #101A23; }
  ${FONT_FACE_CSS}
</style>
</head>
<body>
${svgMarkup}
</body>
</html>`;
}

async function run() {
  console.log("Generating wallpapers and mockups via Headless Chrome...\n");

  const tempDir = path.join(OUTPUT_DIR, ".tmp_render");
  fs.mkdirSync(tempDir, { recursive: true });

  // 1. Generate Clean Wallpapers for 3 Themes
  for (const theme of themes) {
    const proj: Project = { ...baseProject, theme };
    // Let's mark 2 milestones completed for showcase to highlight the illuminated windows!
    proj.milestones = proj.milestones.map((m, idx) => ({
      ...m,
      completed: idx < 2, // 2 windows illuminated!
    }));

    const html = renderWallpaperHtml(proj, "2026-11-13");
    const htmlPath = path.join(tempDir, `wallpaper-${theme}.html`);
    const pngPath = path.join(OUTPUT_DIR, `landing-day-${theme}-wallpaper.png`);

    fs.writeFileSync(htmlPath, html);
    console.log(`Rendering ${pngPath} (${proj.width}x${proj.height})...`);

    execSync(
      `"${CHROME_PATH}" --headless --disable-gpu --screenshot="${pngPath}" --window-size=${proj.width},${proj.height} --hide-scrollbars "file://${htmlPath}"`
    );
  }

  // 2. Generate Realistic Lock Screen Mockup (Phone Frame + Wallpaper + Guides)
  const mockupHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.tailwindcss.com"></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  ${FONT_FACE_CSS}
</style>
</head>
<body class="bg-[#05080E] flex items-center justify-center min-h-screen p-8 text-[#F5F0E6]">
  <div class="relative w-[500px] h-[1080px] rounded-[56px] border-[12px] border-[#222930] shadow-[0_35px_80px_rgba(0,0,0,0.9)] overflow-hidden bg-black">
    <iframe src="file://${path.join(tempDir, "wallpaper-midnight.html")}" class="w-[1290px] h-[2796px] border-0 pointer-events-none origin-top-left" style="transform: scale(${476 / 1290});"></iframe>
    <div class="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
      <div class="flex flex-col items-center">
        <div class="flex w-full items-center justify-between px-3 pt-2 text-sm font-semibold text-white">
          <span>9:41</span>
          <div class="h-6 w-28 rounded-full bg-black"></div>
          <span>5G 100%</span>
        </div>
        <div class="mt-8 flex flex-col items-center text-white">
          <div class="text-sm font-semibold tracking-wide drop-shadow-md opacity-90">Monday, Nov 17</div>
          <div class="text-8xl font-bold tracking-tight drop-shadow-lg font-sans">09:41</div>
        </div>
      </div>
      <div class="flex flex-col items-center gap-4 pb-2">
        <div class="flex w-full justify-between px-6">
          <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg">⚡</div>
          <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg">📷</div>
        </div>
        <div class="w-36 h-1.5 rounded-full bg-white opacity-80"></div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const mockupHtmlPath = path.join(tempDir, "mockup.html");
  fs.writeFileSync(mockupHtmlPath, mockupHtml);
  const mockupPngPath = path.join(OUTPUT_DIR, "landing-day-mockup.png");
  console.log(`Rendering ${mockupPngPath}...`);
  execSync(
    `"${CHROME_PATH}" --headless --disable-gpu --screenshot="${mockupPngPath}" --window-size=700,1200 --hide-scrollbars "file://${mockupHtmlPath}"`
  );

  // 3. Generate Submission Cover Image (1600 × 900)
  // Per brief: "Cover image: Use one large phone mockup showing the finished midnight wallpaper.
  // Place a small supporting caption beside it:
  // A little closer to home. Your moving date. Your next step. One calm lock screen.
  // Make the actual wallpaper large enough to judge. Avoid filling the cover with feature badges or several tiny screenshots."
  const coverHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  ${FONT_FACE_CSS}
  body {
    width: 1600px;
    height: 900px;
    background: radial-gradient(circle at 65% 50%, #15222E 0%, #0A1017 75%, #05080C 100%);
    font-family: 'Manrope', -apple-system, sans-serif;
    color: #F5F0E6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    overflow: hidden;
  }
  .left-copy {
    max-width: 620px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(242, 192, 120, 0.12);
    border: 1px solid rgba(242, 192, 120, 0.3);
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 700;
    color: #F2C078;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .title {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 64px;
    line-height: 1.08;
    color: #F5F0E6;
    margin-bottom: 20px;
    letter-spacing: -0.02em;
  }
  .subtitle {
    font-size: 26px;
    line-height: 1.4;
    color: #F2C078;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .description {
    font-size: 17px;
    line-height: 1.6;
    color: #BBC4C8;
    margin-bottom: 32px;
  }
  .caption-pill {
    padding: 16px 22px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 14px;
    color: #BBC4C8;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .caption-pill strong {
    color: #F5F0E6;
    font-size: 16px;
  }
  .phone-frame {
    width: 375px;
    height: 800px;
    border-radius: 52px;
    border: 10px solid #222930;
    background: #000;
    box-shadow: 0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.15);
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }
  .phone-frame iframe {
    width: 1290px;
    height: 2796px;
    border: 0;
    transform: scale(${355 / 1290});
    transform-origin: top left;
    pointer-events: none;
  }
</style>
</head>
<body>
  <div class="left-copy">
    <div class="badge">Handshake × Google November Challenge</div>
    <div class="title">Landing Day</div>
    <div class="subtitle">A little closer to home.</div>
    <div class="description">
      Your moving date. Your next step. One calm lock screen.
      An illustrated home that fills with warm light as preparation milestones are completed.
    </div>
    <div class="caption-pill">
      <strong>Your Deadline, Your Design</strong>
      <span>Dynamic calendar countdown · Progressive window illumination · High-res OLED export</span>
    </div>
  </div>

  <div class="phone-frame">
    <iframe src="file://${path.join(tempDir, "wallpaper-midnight.html")}"></iframe>
  </div>
</body>
</html>`;

  const coverHtmlPath = path.join(tempDir, "cover.html");
  fs.writeFileSync(coverHtmlPath, coverHtml);
  const coverPngPath = path.join(OUTPUT_DIR, "cover-preview.png");
  console.log(`Rendering ${coverPngPath} (1600x900)...`);
  execSync(
    `"${CHROME_PATH}" --headless --disable-gpu --screenshot="${coverPngPath}" --window-size=1600,900 --hide-scrollbars "file://${coverHtmlPath}"`
  );

  // Clean up temp HTML
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log("\nAll assets rendered successfully!");
}

run().catch((err) => {
  console.error("Asset generation error:", err);
  process.exit(1);
});
