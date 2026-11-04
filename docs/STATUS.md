# Portfolio — Status

_Last updated: 2026-11-03_

## Current state
malekbadawi.com is live and deploys from `main` through Vercel. The site is React 19 + Vite 8 with plain CSS: a landing screen where the name shrinks into an "MB" mark on scroll, then a home view with four dropdown columns (Roles, Education, Projects, Contact) that open a detail panel below them. The resume was updated on 2026-11-03 (`public/MalekBadawiResumePortfolio.pdf`).

## In progress
- UI redesign, explored as two directions on separate branches, each reviewed on its own Vercel preview before one is chosen — Malek
  - `redesign-taste`: full redesign with new art direction
  - `redesign-impeccable`: keeps the current concept and improves it (typography, hierarchy, motion, mobile, polish)
- Content update so the site matches the current resume and recent project work — Malek

## Up next
1. Update site content from the current resume: Pennington research, ADA internship, and new entries for Community Coffee Onboarding, PFT Navigator and Student Government.
2. Build both redesign branches and compare their Vercel previews.
3. Merge the chosen direction into `main`.
4. Cleanup:
   - compress large images (golf GIF 5.3 MB, Pennington photo 2.5 MB, ADA logo 1.5 MB)
   - remove the unused `uclImg1` import (lint warning)
   - remove the unused `react-router-dom` dependency
   - replace the Vite template README
   - update the design notes in `CLAUDE.md` to match the code

## Blockers
- None
