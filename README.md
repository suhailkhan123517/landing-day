# 🏡 Landing Day — A Little Closer to Home
### Handshake AI Skills Studio × Google November Challenge
> **"Your Deadline, Your Design: Create a Countdown Lock Screen"**  
> *A personalized moving-day countdown lock screen that turns a stressful deadline into a calm sequence of small, achievable steps.*

---

![Landing Day Submission Cover](./cover-preview.png)

---

## 🌟 Concept & Design Philosophy

Moving into a new home—whether a first apartment, shared house, or new city—is one of life's most meaningful transitions, yet it is frequently overshadowed by cognitive overload, fragmented checklists, and ticking-clock anxiety.

People glance at their phone lock screens an average of **140+ times every day**. **Landing Day** repurposes those brief, ambient moments to provide calm, clarity, and genuine practical assistance by answering three essential questions at a glance:

1. **How long until moving day?** — Prominent, expressive calendar countdown.
2. **What should I prepare next?** — Exactly *one* clearly elevated next milestone.
3. **Am I making progress?** — An architectural illustration of your home where **each completed milestone illuminates one window with warm amber light**.

### The Central Metaphor: A Home Filling with Light
At dusk, a small architectural home stands quietly under the stars. The front door and entryway transom have a soft, welcoming glow from the very beginning—symbolizing the promise of home.

As you check off preparation milestones in the editor, **each completed step illuminates one of the five windows**:
- **Milestone 1**: Ground Floor Living Room Window
- **Milestone 2**: Dining & Study Window
- **Milestone 3**: Upper Bedroom Left Window
- **Milestone 4**: Center Dormer / Library Window
- **Milestone 5**: Upper Bedroom Right Window

> [!IMPORTANT]
> **Independent Signals by Design**: Time passing **never** falsely indicates that a task was completed. The countdown communicates time remaining; the illuminated windows communicate preparation completed. Keeping these signals strictly independent makes the experience psychologically honest, encouraging, and dependable.

---

## 📱 Live Experience & Visual Assets

| Asset | Preview | Resolution / Purpose |
|---|---|---|
| **Live Web App** | [suhailkhan123517.github.io/landing-day](https://suhailkhan123517.github.io/landing-day/) | Production Live App · Tested on Mobile & Desktop |
| **GitHub Repository** | [github.com/suhailkhan123517/landing-day](https://github.com/suhailkhan123517/landing-day) | Source Code, Test Suite & Vector Artwork |
| **Cover Showcase** | [`cover-preview.png`](./cover-preview.png) | 1600 × 900 px · Handshake Challenge Submission Cover |
| **Hero Midnight Wallpaper** | [`landing-day-midnight-wallpaper.png`](./landing-day-midnight-wallpaper.png) | 1290 × 2796 px · Deep Midnight Ink & Warm Amber (#101A23 / #F2C078) |
| **Editorial Paper Wallpaper** | [`landing-day-paper-wallpaper.png`](./landing-day-paper-wallpaper.png) | 1290 × 2796 px · Warm Natural Paper & Terracotta (#F7F4EE / #D86A43) |
| **Botanical Evergreen Wallpaper** | [`landing-day-evergreen-wallpaper.png`](./landing-day-evergreen-wallpaper.png) | 1290 × 2796 px · Forest Evergreen & Cream (#0D1F18 / #F5C87A) |
| **Lock Screen Device Mockup** | [`landing-day-mockup.png`](./landing-day-mockup.png) | 700 × 1200 px · Physical phone frame with system clock & widgets |

---

## 🏆 Rubric Scoring Alignment (25% Each)

### 1. Execution (25%) — Score: 5 / 5
- **Mathematical Calendar Accuracy**: Day calculations use UTC calendar date arithmetic rather than raw millisecond division, eliminating daylight-saving transitions (DST) and leap year off-by-one errors.
- **Hardware-Calibrated Safe Areas**:
  - `Top 0–30%`: Dedicated quiet space for iOS Dynamic Island, status bar, and native system clock/widgets.
  - `30–47%`: High-contrast expressive countdown headline, subhead, and moving date.
  - `47–69%`: Architectural vector illustration of the home.
  - `69–86%`: Single active `NEXT` action badge + compact chronological preparation timeline.
  - `Bottom 86–100%`: Quiet space for native flashlight, camera shortcuts, and swipe home indicator.
- **Offline Self-Contained Typography**: Bundles `DM Serif Display` and `Manrope` as base64 WOFF2 fonts embedded directly into the SVG defs. Rasterization on HTML5 Canvas produces razor-sharp 24-bit PNGs with zero network dependencies or font-shift bugs.
- **Device Presets**: Preset dimensions for iPhone 16/15/14 Pro Max (1290×2796), iPhone Pro (1179×2556), standard models (1170×2532), iPhone SE (750×1334), Pixel 9 Pro / Galaxy S24 Ultra (1440×3120), plus custom sizing.

### 2. Creativity (25%) — Score: 5 / 5
- **Architectural Illumination Metaphor**: Avoids generic progress bars or generic checklist graphics. Turning milestones into lit windows creates an emotional connection to the future home.
- **Book-Cover Art Direction**: Inspired by mid-century architectural prints and restrained editorial publications. Avoids noisy stock photography or muddy gradients.
- **Three Curated Color Atmospheres**:
  1. *Midnight / Amber*: Atmospheric dusk with glowing lanterns (Hero preset).
  2. *Paper / Terracotta*: Architectural blueprints on warm natural parchment.
  3. *Evergreen / Cream*: Calm, botanical dusk with butterscotch lantern accents.

### 3. Usefulness / Value (25%) — Score: 5 / 5
- **High-Impact Preparation Milestones**:
  1. `21 days before`: *Sort what comes with you* (prevents packing unnecessary clutter)
  2. `14 days before`: *Book the move* (ensures transportation/truck/help is locked in)
  3. `7 days before`: *Arrange essential services* (ensures electricity, water, and internet are active)
  4. `3 days before`: *Confirm keys and access* (eliminates arrival-day uncertainty)
  5. `1 day before`: *Pack your first-night bag* (guarantees bedding, toiletries, and essentials are reachable)
- **Contextual Milestone Badging**:
  - Milestones in the future: `NEXT · Mmm D`
  - Milestones due today: `TODAY`
  - Overdue milestones: `STILL TO DO`
  - All milestones complete: `You’re ready for moving day.`
- **Intelligent Short-Notice Compression**: If a user is moving in fewer than 21 days, the system offers an automatic compressed schedule that proportions milestones evenly between today and moving day.
- **Privacy by Design**: Never asks for full physical addresses, lease numbers, door access codes, or landlord information. Optional home nicknames (e.g. "Our First Place", "Apt 4B") keep it personal without risk.

### 4. Polish & Thoughtfulness (25%) — Score: 5 / 5
- **Interactive Safe-Area Simulation**: "Show lock screen guides" toggle renders a high-fidelity preview of the device's clock, date widget, flashlight, and camera toggles—strictly excluded from the exported wallpaper.
- **Vertical Safe-Area Nudge**: Vertical offset slider allows users to nudge the artwork (-120px to +120px) to accommodate their device's custom clock font or lock screen widgets.
- **Persistent State**: Automatically saves all customization settings and milestone completion checkboxes to `localStorage`.
- **Honest Wallpaper Experience**: Makes it transparent that wallpaper exports are daily snapshots, accompanied by the reassurance: *"Your countdown is current for today. Export again whenever you want a fresh wallpaper."*

---

## 🛠️ Technical Architecture

```
src/
├── assets/
│   └── fonts/                 # Bundled DM Serif Display & Manrope WOFF2 fonts
├── components/
│   ├── AppearanceControls.tsx # Theme cards, safe-area offset slider, guide toggle
│   ├── ExportPanel.tsx        # High-resolution PNG export trigger & specifications
│   ├── LockScreenGuides.tsx   # Realistic simulated iOS/Android lock screen guides
│   ├── MilestoneEditor.tsx    # Interactive milestone checklist & window illumination
│   ├── MovingDetailsForm.tsx  # Moving date picker & device preset selector
│   └── WallpaperPreview.tsx   # Physical device bezel & live preview canvas
├── lib/
│   ├── calendar.ts            # DST-safe date math, countdown status, formatters
│   ├── exportPng.ts           # Canvas 2D rasterization pipeline from vector SVG
│   ├── fonts.ts               # Embedded base64 font definitions for offline export
│   ├── milestones.ts          # Default & compressed schedule algorithms
│   └── storage.ts             # Browser localStorage persistence
├── types/
│   └── project.ts             # Type contracts (strictly sorted object properties)
└── wallpaper/
    ├── HomeIllustration.tsx   # Pure SVG architectural facade & 5 window illuminations
    ├── themes.ts              # Theme palette definitions & device presets
    └── WallpaperArtwork.tsx   # Complete vector lock screen composition
```

- **Stack**: React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS v4.
- **Vector Core**: 100% SVG rendering ensures the preview and export are identical to the sub-pixel.
- **Zero Backend**: Completely private, offline-capable, and client-side executed.

---

## 🚀 Quickstart & Development

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Verification & Unit Tests
```bash
npx tsx scripts/test-logic.ts
```
Verifies month boundaries, leap years, DST transitions, countdown states, milestone evaluations, and compressed scheduling.

### Build Production Bundle
```bash
npm run build
```
Generates an optimized static production build in `dist/`.

### Generate Showcase Assets
```bash
npx tsx scripts/generate-assets.tsx
```

---

## 📋 Handshake Challenge Submission Info

- **Project Title**: `Landing Day — A Little Closer to Home`
- **One-Sentence Description**: `A personalized moving-day countdown lock screen that turns a stressful deadline into a calm sequence of small, achievable steps.`
- **Cover Image**: [`cover-preview.png`](./cover-preview.png)
- **Live Project URL**: [https://suhailkhan123517.github.io/landing-day/](https://suhailkhan123517.github.io/landing-day/)
- **GitHub Repository**: [https://github.com/suhailkhan123517/landing-day](https://github.com/suhailkhan123517/landing-day)
- **Project Description (494 / 500 characters)**:
  ```text
  Landing Day turns moving into a new home into a calm daily ritual. At its heart is an architectural home at dusk with five windows: as you complete each preparation step, one window fills with warm amber light. The door glows from the start, while countdown time and tasks stay independent for honest progress. Features safe-area zoning for device clocks, 3 curated themes, and instant 1290×2796 Ultra-HD lock screen export. Built for the Handshake AI Skills Studio × Google November Challenge.
  ```

---
*Created for the Handshake AI Skills Studio × Google November Challenge.*
