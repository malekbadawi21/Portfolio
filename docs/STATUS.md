# Portfolio — Status

_Last updated: 2026-11-03_

## Current state
malekbadawi.com is live and deploys from `main` through Vercel. The site is React 19 + Vite 8 with plain CSS: a landing screen where the name shrinks into an "MB" mark on scroll, then a home view with four dropdown columns (Roles, Education, Projects, Contact) that open a detail panel below them.

The site content was updated on 2026-11-03 to match the current resume (branch `content-update`):

| Column | Entries |
|---|---|
| Roles | Pennington, ADA, LSU Senate |
| Education | LSU, UCL |
| Projects | Community Coffee, PFT Navigator, MRI Motion Agent, Golf Swing |
| Contact | Email, LinkedIn, Resume (`public/MalekBadawiResumePortfolio.pdf`) |

## In progress
- UI redesign, new approach to be decided — Malek
  - The first two directions were built, revised once each, and **not adopted**. Their branches stay on GitHub for reference:
    - `redesign-taste`: full redesign (round 1: dark editorial; round 2: light "engineering" direction)
    - `redesign-impeccable`: kept the current concept (round 1: refined light layout; round 2: "drafting-sheet" direction with IBM Plex)
  - What worked and should carry forward:
    - all work visible on one scrolling page
    - the image load-in treatment
    - a dash marker plus bold weight on the selected item
  - What didn't work:
    - display fonts and colors that read as editorial or lifestyle rather than technical
    - a hero card over a busy photo
    - floating landing letters
    - scrolling past the navigation
    - too much empty white space
    - weak contact views

## Up next
1. Choose a new approach for the redesign and build it from `main`.
2. Whatever the approach, fix the current layout limits:
   - The home view is fixed at one screen height and can't scroll, so long text and images get clipped.
   - On phones, images below the text are cut off.
   - At 1280×720, some entries (ADA, LSU) are already clipped.
3. Add images for the entries that don't have their own yet: LSU Senate, Community Coffee, PFT Navigator, MRI Motion Agent.
4. Cleanup:
   - compress large images (golf GIF 5.3 MB, Pennington photo 2.5 MB, ADA logo 1.5 MB)
   - remove the unused `uclImg1` import (lint warning)
   - remove the unused All You Can Eat images and their CSS
   - remove the unused `react-router-dom` dependency
   - replace the Vite template README
   - update the design notes in `CLAUDE.md` to match the code

## Blockers
- None
