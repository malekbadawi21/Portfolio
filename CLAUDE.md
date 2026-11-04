# Portfolio project

This is my personal portfolio website. Stack: React + Vite, plain CSS, deployed to Vercel. (`react-router-dom` is still installed but unused.)

Design decisions (updated 2026-11-04, redesign round 2, `redesign-impeccable`):
- Audience and tone: a software engineering student and AI developer; technical and professional, with personality
- Type: IBM Plex Sans for display and body, IBM Plex Mono for labels, indices and section markers; self-hosted in `src/assets/fonts`
- Palette: paper `#f2f1ec` background, `#fbfaf7` surfaces, `#0f0f10` ink and frame lines, `#2b2b2d` body text, `#5f5e59` secondary, `#d6d3c9` rules; accent signal orange `#ff4f00` for marks and large type, `#c23b00` for small accent text
- Style: drafting sheet: a 12-column grid behind the hero, 1px ink frames, mono section markers (01–04), square corners, no gradients
- Four columns: Roles, Education, Projects, Contact, in a sticky column bar with the MB mark
- Each column is a dropdown menu, only one open at a time; the selected item gets a dash marker and bold weight
- Clicking an item loads its detail below the bar on the same page (no navigation) and scrolls to the top of the detail
- Detail layout: index rail, text, media, then previous/next entry; the page ends with the footer band
- Overview (nothing selected): a directory of every entry by column, with rotating photos
- Landing: the name types in, backspaces to "M"/"B" when the visitor scrolls, and retypes at the top
- Images: frames sized from each image's intrinsic aspect ratio, never cropped, fade in once loaded
- Entries without their own image show a cellular automaton panel (a different rule per entry) until real images exist
- Motion respects `prefers-reduced-motion`

Follow the global teaching methodology in this project.
