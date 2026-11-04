# Portfolio — Status

_Last updated: 2026-11-04_

## Current state
malekbadawi.com is live and deploys from `main` through Vercel. The site is React 19 + Vite 8 with plain CSS: a landing screen where the name shrinks into an "MB" mark on scroll, then a home view with four dropdown columns (Roles, Education, Projects, Contact) that open a detail panel below them. (`main` is still the pre-redesign site.)

The site content was updated on 2026-11-03 to match the current resume (branch `content-update`):

| Column | Entries |
|---|---|
| Roles | Pennington, ADA, LSU Senate |
| Education | LSU, UCL |
| Projects | Community Coffee, PFT Navigator, MRI Motion Agent, Golf Swing |
| Contact | Email, LinkedIn, Resume (`public/MalekBadawiResumePortfolio.pdf`) |

## In progress
- UI redesign, explored as two directions on separate branches. Each is reviewed on its own Vercel preview before one is chosen — Malek
  - `redesign-taste`: full redesign with new art direction
  - `redesign-impeccable`: keeps the four columns and detail view. Round 1 pushed 2026-11-04 and reviewed by Malek (still too bland). Round 2 pushed 2026-11-04: drafting-sheet direction (IBM Plex Sans + Mono, paper and signal orange), sticky column bar, typing name transition, overview directory, automaton panels for entries without images, new contact and resume views. Fixes the three layout limits below. Design notes in `CLAUDE.md` updated to match. Waiting on Vercel preview review

## Up next
1. Build both redesign branches from the updated `main` and compare their Vercel previews on desktop and phone.
2. Both redesigns must fix the current layout limits:
   - The home view is fixed at one screen height and can't scroll, so long text and images get clipped.
   - On phones, images below the text are cut off.
   - At 1280×720, some entries (ADA, LSU) are already clipped.
3. Merge the chosen direction into `main`.
4. Add images for the entries that don't have their own yet: LSU Senate, Community Coffee, PFT Navigator, MRI Motion Agent. (On `redesign-impeccable` they show an automaton panel meanwhile.)
5. On `redesign-impeccable`, the resume preview is a rendered image (`public/resume-preview.webp`). Re-render it whenever the resume PDF changes: `pdftoppm -png -r 150 -f 1 -l 1 public/MalekBadawiResumePortfolio.pdf /tmp/rp` and convert `/tmp/rp-1.png` to WebP.
6. Cleanup:
   - compress large images (golf GIF 5.3 MB, Pennington photo 2.5 MB, ADA logo 1.5 MB)
   - remove the unused `uclImg1` import (lint warning) — done on `redesign-impeccable`
   - remove the unused All You Can Eat images and their CSS — CSS removed on `redesign-impeccable`; the images are still in `src/assets/ProjectPics/`
   - remove the unused `react-router-dom` dependency
   - replace the Vite template README
   - update the design notes in `CLAUDE.md` to match the code — done on `redesign-impeccable`

## Blockers
- None
