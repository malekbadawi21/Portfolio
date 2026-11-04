import { useCallback, useEffect, useRef, useState } from 'react'
import './Home.css'

import penningtonImg from '../assets/PenningtonPics/IMG_3174.jpg'
import adaImg from '../assets/ADAPics/ADAlogo.png'
import uclImg2 from '../assets/UCLPics/IMG_3218.jpeg'
import uclImg3 from '../assets/UCLPics/UCLSLIDE1.png'
import uclImg4 from '../assets/UCLPics/UCLSLIDE2.png'
import lsuImg from '../assets/LSUPics/IMG_3219.jpg'
import golfGif from '../assets/ProjectPics/golf_swing.gif'

import photo0 from '../assets/PersonalityPics/DC315D96-E015-4833-A50C-4C34E06EA505.JPG'
import photo1 from '../assets/PersonalityPics/IMG_1099.JPG'
import photo3 from '../assets/PersonalityPics/IMG_1628.jpg'
import photo4 from '../assets/PersonalityPics/IMG_4404.JPG'
import photo5 from '../assets/PersonalityPics/IMG_4756.jpg'

const photos = [photo0, photo1, photo3, photo4, photo5,]

const columns = [
  {
    id: 'roles',
    label: 'Roles',
    items: [
      {
        id: 'pennington',
        label: 'Pennington',
        title: 'Undergraduate Researcher, Pennington Biomedical',
        body: 'Since March 2026, I\'ve been working on a study of how brain age can be derived from gray and white matter volumes, and what it means when your brain ages faster than you do. I showed the lab\'s BRISQUE pipeline missed MRI-specific artifacts like motion, helping move the lab to MRIQC. Since then, I\'ve organized FreeSurfer outputs for about 460 subjects and built batch workflows across seven studies.',
        images: [penningtonImg],
      },
      {
        id: 'ada',
        label: 'ADA',
        title: 'Software & Data Engineering Intern, Automotive Data Analytics',
        body: 'From September 2025 to June 2026, I interned remotely at Automotive Data Analytics. I built Microsoft Fabric ETL pipelines that unified 10,000+ customer records from multiple dealership systems into one lakehouse, with automatic refreshes feeding Power BI reports. I also built a two-factor authentication service on Azure Logic Apps, Azure Table Storage, and Twilio, sending one-time codes by email and SMS and handling code expiration and session validation. Real tools, real data, real users.',
        images: [adaImg],
      },
      {
        id: 'senate',
        label: 'LSU Senate',
        title: 'Student Government Senator, LSU',
        body: 'Since August 2025, I\'ve represented the College of Engineering as an elected senator in LSU Student Government. I serve on the Academic Affairs committee, contributing to initiatives on campus technology resources and ethical AI policy.',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    items: [
      {
        id: 'lsu',
        label: 'LSU',
        title: 'Louisiana State University',
        body: 'Studying Software Engineering at Louisiana State University with minors in Mathematics and Honors Research, as a Stamps Scholar. I\'m building toward a focus in AI and machine learning.\n\nI\'m currently taking LLM Application Development! A project-based course where cross-functional teams build LLM-enabled applications for real Louisiana businesses. The curriculum covers probabilistic language models, tokenization, agentic system design, human-AI interaction, and local model fine-tuning. It\'s exactly the kind of applied, state-of-the-art work I want to be doing.',
        images: [lsuImg],
      },
      {
        id: 'ucl',
        label: 'UCL',
        title: 'University College London',
        body: 'In the summer of 2025, I spent three weeks at University College London studying Artificial Intelligence Concepts & Applications, finishing with distinction. The course was a structured deep-dive across the full AI stack: supervised and unsupervised learning, neural networks and deep learning, NLP, computer vision, reinforcement learning, and AI in society. It was my first formal exposure to AI as a discipline, and it confirmed the direction I want to go.',
        images: [uclImg2, uclImg3, uclImg4],
        collageStyle: 'ucl',
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    items: [
      {
        id: 'community-coffee',
        label: 'Community Coffee',
        title: 'Community Coffee Onboarding Platform',
        body: 'Through LSU\'s Applied Intelligence Lab, our team built an in-house onboarding web app for Community Coffee, grounded in the company\'s own onboarding data. It streamlines onboarding: new hires see their role\'s tasks the moment they\'re added. We also built an AI onboarding buddy that answers a hire\'s questions from their own plan, and an admin analytics dashboard tracking every hire\'s progress. Built with React, FastAPI, and PostgreSQL.',      },
      {
        id: 'pft-navigator',
        label: 'PFT Navigator',
        title: 'PFT Navigator',
        body: 'PFT Navigator makes LSU\'s 3D digital twin of Patrick F. Taylor Hall useful for students: explore the building, search for a room, course, professor, or department, get a route, then walk it in first person. For my team, I manage the shared GitHub and build navigation features in Unreal Engine with Blueprints and UMG, including destination selection, room highlighting, floor-path visualization, and guided routing, all driven by structured JSON data connected to the digital twin.',
      },
      {
        id: 'mri-motion',
        label: 'MRI Motion Agent',
        title: 'MRI Motion Agent',
        body: 'Can a vision model tell when an MRI scan is ruined by head motion? That\'s the question behind my CSC 4700 project. Using MR-ART, an open dataset of 436 expert-rated brain scans, I render slice montages, including a boosted view that exposes faint artifacts, and ask vision models to rate each scan\'s clinical usability. Early results: the models rank scans correctly but rarely call one unusable, while a regression on MRIQC metrics catches the worst scans but blurs good from medium. That\'s why I\'m building an agent that combines both.',
      },
      {
        id: 'golf',
        label: 'Golf Swing',
        title: 'Golf Swing Analyzer',
        body: 'A computer vision tool that analyzes golf swings in real time. Built with Python, OpenCV, and MediaPipe, it tracks 33 body landmarks per frame, applies a hybrid pose detection model to handle partial occlusion, and automatically identifies the swing plane from the club shaft in the opening frames drawing it as a dotted reference line throughout the swing.',
        images: [golfGif],
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    items: [
      { id: 'email', label: 'Email', title: 'Email', body: 'malekbadawi21@gmail.com', logo: true },
      { id: 'linkedin', label: 'LinkedIn', title: 'LinkedIn', body: '', link: { href: 'https://www.linkedin.com/in/malekbadawi21/', label: 'View LinkedIn Profile' }, logo: true },
      { id: 'resume', label: 'Resume', title: 'Resume', body: '', link: { href: '/MalekBadawiResumePortfolio.pdf', label: 'Download Resume' }, pdf: '/MalekBadawiResumePortfolio.pdf' },
    ],
  },
]


// Intrinsic image sizes: frames reserve exactly this shape, so images are
// never cropped and nothing jumps while they load.
const imageSizes = new Map([
  [penningtonImg, [4032, 3024]],
  [adaImg, [1024, 1024]],
  [lsuImg, [1551, 1012]],
  [golfGif, [500, 893]],
  [uclImg2, [900, 1200]],
  [uclImg3, [2080, 1174]],
  [uclImg4, [2078, 1172]],
])

// Entries without their own image get a one-dimensional cellular automaton,
// a different rule and seed for each, instead of a repeated photo.
const automata = {
  senate: { rule: 90, seed: 'single' },
  'community-coffee': { rule: 110, seed: 'random' },
  'pft-navigator': { rule: 30, seed: 'single' },
  'mri-motion': { rule: 105, seed: 'random' },
}

const RESUME_PREVIEW = '/resume-preview.webp'
const PHOTO_INTERVAL = 3500

const contactColumn = columns.find((c) => c.id === 'contact')
const flat = columns.flatMap((col, ci) => col.items.map((item, ii) => ({ item, col, ci, ii })))
const pad = (n) => String(n).padStart(2, '0')
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function preload(item) {
  item.images?.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

function kindOf(item) {
  if (item.pdf) return 'resume'
  if (item.logo) return 'contact'
  if (item.images?.length > 1) return 'collage'
  if (item.images?.length === 1) return 'image'
  return 'automaton'
}

function channelOf(item) {
  if (item.id === 'email') return { href: `mailto:${item.body}`, text: item.body }
  return { href: item.link.href, text: item.link.label, external: item.id === 'linkedin', download: item.id === 'resume' }
}

/* Media ------------------------------------------------------------------- */

// An <img> that fades in once loaded instead of popping in.
function FadeImg({ className = '', ...props }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      {...props}
      className={`${className} fade-img`}
      data-loaded={loaded}
      decoding="async"
      ref={(el) => {
        if (el?.complete && el.naturalWidth && !loaded) setLoaded(true)
      }}
      onLoad={() => setLoaded(true)}
    />
  )
}

function Framed({ src, alt }) {
  const [w, h] = imageSizes.get(src) ?? [4, 3]
  return (
    <div className="frame frame-image" style={{ '--ar': w / h }}>
      <FadeImg src={src} alt={alt} width={w} height={h} />
    </div>
  )
}

function Collage({ item }) {
  return (
    <div className="collage">
      {item.images.map((img, i) => {
        const [w, h] = imageSizes.get(img) ?? [4, 3]
        return (
          <FadeImg
            key={i}
            src={img}
            alt={item.label}
            width={w}
            height={h}
            className={`collage-img ${item.collageStyle}-img-${i + 1}`}
          />
        )
      })}
    </div>
  )
}

function hashString(s) {
  let h = 2166136261
  for (const ch of s) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function seededRandom(seed) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function runAutomaton({ rule, seed }, id, cols, rows) {
  const rand = seededRandom(hashString(id))
  let row = new Uint8Array(cols)
  if (seed === 'single') row[cols >> 1] = 1
  else for (let i = 0; i < cols; i++) row[i] = rand() < 0.5 ? 1 : 0
  const out = [row]
  for (let r = 1; r < rows; r++) {
    const next = new Uint8Array(cols)
    for (let i = 0; i < cols; i++) {
      const l = row[(i - 1 + cols) % cols]
      const c = row[i]
      const rr = row[(i + 1) % cols]
      next[i] = (rule >> ((l << 2) | (c << 1) | rr)) & 1
    }
    out.push(next)
    row = next
  }
  return out
}

// Draws the automaton row by row, like a computation running; instantly with reduced motion.
function Automaton({ id }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const cols = 56
    const rows = 70
    const grid = runAutomaton(automata[id] ?? { rule: 30, seed: 'single' }, id, cols, rows)
    let frame = 0
    let start = 0

    function draw(limit) {
      const { width } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const cell = width / cols
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(cell * rows * dpr)
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      const style = getComputedStyle(canvas)
      ctx.fillStyle = style.getPropertyValue('--auto-bg').trim()
      ctx.fillRect(0, 0, width, cell * rows)
      ctx.fillStyle = style.getPropertyValue('--auto-ink').trim()
      const gap = cell > 5 ? 1 : 0.5
      for (let r = 0; r < limit; r++) {
        for (let i = 0; i < cols; i++) {
          if (grid[r][i]) ctx.fillRect(i * cell, r * cell, cell - gap, cell - gap)
        }
      }
    }

    function animate(t) {
      if (!start) start = t
      const limit = Math.min(rows, Math.ceil(((t - start) / 900) * rows))
      draw(limit)
      if (limit < rows) frame = requestAnimationFrame(animate)
    }

    if (prefersReducedMotion()) draw(rows)
    else frame = requestAnimationFrame(animate)

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      draw(rows)
    })
    ro.observe(canvas)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [id])

  return (
    <div className="frame frame-auto">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  )
}

// Rotating personal photos on the intro. Pauses while hovered, off screen, or in a hidden tab.
function Portraits() {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [tabVisible, setTabVisible] = useState(!document.hidden)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    io.observe(ref.current)
    const onVis = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  const running = !hovered && onScreen && tabVisible
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), PHOTO_INTERVAL)
    return () => clearInterval(id)
  }, [running])

  return (
    <div
      className="frame frame-portrait"
      ref={ref}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {photos.map((photo, i) => (
        <img
          key={i}
          src={photo}
          alt="Malek Badawi"
          className="portrait"
          data-active={i === index}
          aria-hidden={i === index ? undefined : true}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}
    </div>
  )
}

/* Icons ------------------------------------------------------------------- */

const Chevron = () => (
  <svg className="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
)

const Arrow = ({ dir = 'right' }) => (
  <svg className={`arrow arrow-${dir}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v8.5M4 7l4 4 4-4M2.5 14h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/* Column bar ---------------------------------------------------------------- */

function Bar({ activeItem, openCol, setOpenCol, onPick, onHome }) {
  const barRef = useRef(null)
  const triggerRefs = useRef({})

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const top = barRef.current.getBoundingClientRect().top
      barRef.current.dataset.stuck = top <= 0.5 ? 'true' : 'false'
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!openCol) return
    const onDown = (e) => {
      if (!barRef.current.contains(e.target)) setOpenCol(null)
    }
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      triggerRefs.current[openCol]?.focus()
      setOpenCol(null)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openCol, setOpenCol])

  function toggle(colId) {
    if (barRef.current.dataset.stuck !== 'true') onHome()
    setOpenCol((current) => (current === colId ? null : colId))
  }

  return (
    <div className="bar" ref={barRef}>
      <a className="bar-mark" href="#top" aria-label="Malek Badawi">
        MB<span className="bar-caret" aria-hidden="true" />
      </a>
      {columns.map((col, ci) => {
        const open = openCol === col.id
        const current = col.items.find((i) => i.id === activeItem?.id)
        return (
          <div key={col.id} className="bar-col">
            <button
              ref={(el) => { triggerRefs.current[col.id] = el }}
              className="trigger"
              aria-expanded={open}
              aria-controls={`menu-${col.id}`}
              data-current={Boolean(current)}
              onClick={() => toggle(col.id)}
            >
              <span className="trigger-index mono">{pad(ci + 1)}</span>
              <span className="trigger-label mono">{col.label}</span>
              <span className="trigger-current mono">{current?.label}</span>
              <Chevron />
            </button>
            <div id={`menu-${col.id}`} className="menu" data-open={open} inert={!open}>
              <ul>
                {col.items.map((item, ii) => (
                  <li key={item.id}>
                    <button
                      className="menu-item"
                      aria-pressed={activeItem?.id === item.id}
                      onClick={() => onPick(item, 'menu')}
                      onPointerEnter={() => preload(item)}
                      onFocus={() => preload(item)}
                    >
                      <span className="menu-label">{item.label}</span>
                      <span className="menu-index mono">{pad(ci + 1)}.{pad(ii + 1)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Views ------------------------------------------------------------------- */

function Intro({ onPick }) {
  return (
    <div className="intro">
      <div className="directory">
        {columns.map((col, ci) => (
          <section key={col.id} className="dir-col">
            <h2 className="dir-head mono">
              <span className="dir-index">{pad(ci + 1)}</span>
              {col.label}
            </h2>
            <ul>
              {col.items.map((item) => (
                <li key={item.id}>
                  <button
                    className="dir-item"
                    onClick={() => onPick(item, 'directory')}
                    onPointerEnter={() => preload(item)}
                    onFocus={() => preload(item)}
                  >
                    <span className="dir-label">{item.label}</span>
                    {item.title !== item.label && <span className="dir-title">{item.title}</span>}
                    <Arrow />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="intro-media">
        <Portraits />
      </div>
    </div>
  )
}

function Channels({ activeId }) {
  return (
    <ul className="channels">
      {contactColumn.items.map((item, i) => {
        const ch = channelOf(item)
        return (
          <li key={item.id} data-active={item.id === activeId}>
            <a
              href={ch.href}
              target={ch.external ? '_blank' : undefined}
              rel={ch.external ? 'noopener noreferrer' : undefined}
              download={ch.download ? '' : undefined}
            >
              <span className="ch-index mono">{pad(i + 1)}</span>
              <span className="ch-label mono">{item.label}</span>
              <span className="ch-value">{ch.text}</span>
              {ch.download ? <DownloadIcon /> : <Arrow />}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function Body({ item }) {
  if (!item.body) return null
  return item.body.split('\n\n').map((para, i) => (
    <p key={i} className="detail-body">{para}</p>
  ))
}

function Pager({ index, onPick }) {
  const prev = flat[(index - 1 + flat.length) % flat.length]
  const next = flat[(index + 1) % flat.length]
  return (
    <div className="pager">
      <button className="pager-btn pager-prev" onClick={() => onPick(prev.item, 'pager')}>
        <span className="pager-meta mono"><Arrow dir="left" /> {pad(prev.ci + 1)} {prev.col.label}</span>
        <span className="pager-label">{prev.item.label}</span>
      </button>
      <button className="pager-btn pager-next" onClick={() => onPick(next.item, 'pager')}>
        <span className="pager-meta mono">{pad(next.ci + 1)} {next.col.label} <Arrow /></span>
        <span className="pager-label">{next.item.label}</span>
      </button>
    </div>
  )
}

function Detail({ entry, titleRef, onPick }) {
  const { item, col, ci, ii } = entry
  const kind = kindOf(item)
  const index = flat.indexOf(entry)

  let text
  let media
  if (kind === 'contact') {
    const ch = channelOf(item)
    text = (
      <>
        <h2 className="detail-title" ref={titleRef} tabIndex={-1}>{item.title}</h2>
        {item.id === 'email' ? (
          <a className="big-link" href={ch.href}>{ch.text}</a>
        ) : (
          <a className="btn-primary" href={ch.href} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            {ch.text}
          </a>
        )}
      </>
    )
    media = <Channels activeId={item.id} />
  } else if (kind === 'resume') {
    text = (
      <>
        <h2 className="detail-title" ref={titleRef} tabIndex={-1}>{item.title}</h2>
        <a className="btn-primary" href={item.link.href} download>
          <DownloadIcon />
          {item.link.label}
        </a>
        <p className="file-name mono">{item.pdf.slice(1)}</p>
      </>
    )
    media = (
      <a className="paper" href={item.pdf} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
        <FadeImg src={RESUME_PREVIEW} alt="" width="1275" height="1650" />
      </a>
    )
  } else {
    text = (
      <>
        <h2 className="detail-title" ref={titleRef} tabIndex={-1}>{item.title}</h2>
        <Body item={item} />
      </>
    )
    if (kind === 'collage') media = <Collage item={item} />
    else if (kind === 'image') media = <Framed src={item.images[0]} alt={item.label} />
    else media = <Automaton id={item.id} />
  }

  return (
    <article className="detail" data-kind={kind}>
      <div className="detail-meta mono">
        <span className="meta-index">{pad(ci + 1)}.{pad(ii + 1)}</span>
        <span className="meta-col">{col.label}</span>
        <span className="meta-count">{ii + 1} / {col.items.length}</span>
      </div>
      <div className="detail-text">{text}</div>
      <div className="detail-media">{media}</div>
      <Pager index={index} onPick={onPick} />
    </article>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-copy mono">© 2026 Malek Badawi</p>
      <ul className="footer-links">
        {contactColumn.items.map((item) => {
          const ch = channelOf(item)
          return (
            <li key={item.id}>
              <a
                href={ch.href}
                target={ch.external ? '_blank' : undefined}
                rel={ch.external ? 'noopener noreferrer' : undefined}
                download={ch.download ? '' : undefined}
              >
                {ch.text}
              </a>
            </li>
          )
        })}
      </ul>
    </footer>
  )
}

/* Page -------------------------------------------------------------------- */

export default function Home() {
  const [activeId, setActiveId] = useState(null)
  const [openCol, setOpenCol] = useState(null)
  const homeRef = useRef(null)
  const titleRef = useRef(null)
  const focusTitle = useRef(false)

  const entry = flat.find((e) => e.item.id === activeId) ?? null

  const scrollToHome = useCallback(() => {
    const top = homeRef.current.offsetTop
    if (Math.abs(window.scrollY - top) < 2) return
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const pick = useCallback((item, source) => {
    setOpenCol(null)
    // Choosing the open entry again from its menu closes it (back to the overview).
    setActiveId((current) => (source === 'menu' && current === item.id ? null : item.id))
    // Directory and pager buttons unmount on change, so focus moves to the new title.
    focusTitle.current = source !== 'menu'
    scrollToHome()
  }, [scrollToHome])

  useEffect(() => {
    if (focusTitle.current && titleRef.current) titleRef.current.focus({ preventScroll: true })
    focusTitle.current = false
  }, [activeId])

  return (
    <div className="home snap" id="home" ref={homeRef}>
      <Bar
        activeItem={entry?.item}
        openCol={openCol}
        setOpenCol={setOpenCol}
        onPick={pick}
        onHome={scrollToHome}
      />
      <main className="sheet">
        <p className="sr-only" aria-live="polite">{entry ? entry.item.title : ''}</p>
        <div className="view" key={activeId ?? 'intro'}>
          {entry ? <Detail entry={entry} titleRef={titleRef} onPick={pick} /> : <Intro onPick={pick} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}
