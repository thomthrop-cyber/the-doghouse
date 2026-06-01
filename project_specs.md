# Project Specs — The Doghouse

## What the app does / who uses it
A single-page marketing website for "The Doghouse" — an independent music label focused on visual promotion. Visitors see a full-screen camcorder-aesthetic site with film grain, scanlines, a REC HUD, glitch typography, and a 3D-model camera that links to the video portfolio.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS (design-system tokens)
- **Animations:** GSAP 3 + ScrollTrigger
- **3D Model:** @google/model-viewer (CDN via next/script)
- **Fonts:** Anton, Space Grotesk, Space Mono, VT323 (next/font/google)
- **Deployment:** Vercel

## Pages & Flows
- `/` — The Doghouse landing page (public, no auth)
  - Fixed analog overlays (grain, scanlines, vignette)
  - Fixed camcorder HUD (REC, running timecode, battery, corner brackets)
  - Sticky nav
  - Hero (full-viewport, glitch heading)
  - Manifesto section
  - Camera section (interactive 3D model → links to portfolio page)
  - Footer

## Design Tokens
Three switchable colour themes via `data-dir` on `<html>`:
- `aquatic` (default): cream background, red headline
- `marigold`: yellow background, paper headline
- `deep`: navy background, yellow headline

## Data Models
None — static site, no database.

## What "done" looks like
- Pixel-faithful to The Doghouse.html prototype
- All GSAP scroll reveals working (ScrollTrigger)
- Hero entrance animation (staggered text, glitch burst)
- Running timecode in HUD
- 3D model-viewer renders
- `npm run build` passes with no errors
- Tested in browser end-to-end
