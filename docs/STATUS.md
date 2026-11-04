# Portfolio — Status

_Last updated: 2026-11-04_

## Current state
malekbadawi.com is live and deploys from `main` through Vercel. The site is React 19 + Vite 8 with plain CSS.

On 2026-11-04 the site was redesigned as one scrolling page. It's based on the `redesign-taste` round-2 direction, polished in `redesign-finesse`:
- A hero with the name, summary, resume, email, LinkedIn and GitHub links, a section index, and the headshot in a circle with a black border.
- Four numbered sections: Roles, Education, Projects, Contact. Each entry is a row with its number and label in mono, then its title, text and images.
- A band of personal photos before Contact.
- Contact opens with "Have an idea, a project, or just want to talk? I'd love to hear from you.", followed by Email, LinkedIn, GitHub and Resume.
- A header that stays on screen and marks the current section with a dash and bold label.
- Images build in slice by slice the first time they scroll into view, with a `SLICE nn/24` readout. Under reduced motion they fade in instead.
- A ⌘K / Ctrl K jump menu that lists every entry and contact link.

| Section | Entries |
|---|---|
| Roles | Pennington, ADA, LSU Senate |
| Education | LSU, UCL |
| Projects | Community Coffee, PFT Navigator, MRI Motion Agent, Golf Swing |
| Contact | Email, LinkedIn, GitHub, Resume (`public/MalekBadawiResumePortfolio.pdf`) |

Images are compressed to 1200px on the long edge, and the golf GIF to 420px wide. A full scroll loads about 3.6 MB of images, down from about 13.7 MB.

## In progress
- None

## Up next
1. Add images for the entries that don't have their own yet: LSU Senate, Community Coffee, PFT Navigator, MRI Motion Agent. Each needs only an `images` entry in the content.
2. Golf GIF:
   - It still loops while you read.
   - At 1.8 MB it's the largest file on the page; a short muted video would be much smaller.
3. Cleanup:
   - remove the unused `react-router-dom` dependency
   - remove unused files in `src/assets`: All You Can Eat images, old headshots, `IMG_3218.jpg`, `IMG_3208.JPG`, the old resume PDF, and the Vite template images
   - replace the Vite template README
   - update the design notes in `CLAUDE.md` to match the redesign
4. Delete the merged and reference branches once they're no longer needed: `redesign-taste`, `redesign-impeccable`, `redesign-finesse`, `status-redesign-review`, `new-headshot`.

## Blockers
- None
