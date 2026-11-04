import { useEffect, useRef, useState } from 'react'
import './Home.css'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Roles from '../components/Roles'
import Education from '../components/Education'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

import headshot from '../assets/HeadShot3.jpg'
import roomImg from '../assets/PenningtonPics/IMG_3174-room.jpg'

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

// The two halves of the original summary line, kept word for word.
const summary = {
  lead: 'Student, researcher, builder.',
  line: 'Studying Software Engineering at LSU, researching at Pennington Biomedical, and building toward a future in AI.',
}

const byId = (id) => columns.find((c) => c.id === id)

export default function Home() {
  const heroRef = useRef(null)
  const [headerShown, setHeaderShown] = useState(false)

  // Scroll progress through the first screen drives the badge and the header.
  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
      heroRef.current?.style.setProperty('--p', p.toFixed(3))
      setHeaderShown(p > 0.55)
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Entrances: every [data-reveal] rises in once as it enters. Content is
  // visible without this script; the hidden start state only exists under
  // html.motion, which is set here.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return
    document.documentElement.classList.add('motion')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const roles = byId('roles')
  const education = byId('education')
  const projects = byId('projects')
  const contact = byId('contact')

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header shown={headerShown} columns={columns} resume={contact.items.find((i) => i.id === 'resume')} />
      <main id="main">
        <Hero
          ref={heroRef}
          room={roomImg}
          headshot={headshot}
          line={summary.line}
          index={[roles, education, projects]}
          contact={contact}
        />
        <Intro heading={summary.lead} photos={photos} />
        <Roles column={roles} />
        <Education column={education} />
        <Projects column={projects} />
        <Contact column={contact} />
      </main>
      <Footer photo={photo1} columns={columns} contact={contact} />
    </>
  )
}
