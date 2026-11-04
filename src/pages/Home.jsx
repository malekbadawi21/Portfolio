import { useState, useEffect, useRef } from 'react'
import './Home.css'

import penningtonImg from '../assets/PenningtonPics/IMG_3174.jpg'
import adaImg from '../assets/ADAPics/ADAlogo.png'
import uclImg1 from '../assets/UCLPics/IMG_3208.JPG'
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
        label: 'Senate',
        title: 'Student Government Senator, LSU',
        body: 'Since August 2025, I\'ve represented the College of Engineering as an elected senator in LSU Student Government. I serve on the Student Auxiliary Services and Academic Affairs committees, contributing to initiatives on campus technology resources and ethical AI policy.',
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
        body: 'Studying Software Engineering at Louisiana State University with minors in Mathematics and Honors Research, as a Stamps Scholar. I\'m building toward a focus in AI and machine learning.\n\nThis fall, I\'m taking LLM Application Development! A project-based course where cross-functional teams build LLM-enabled applications for real Louisiana businesses. The curriculum covers probabilistic language models, tokenization, agentic system design, human-AI interaction, and local model fine-tuning. It\'s exactly the kind of applied, state-of-the-art work I want to be doing.',
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
        body: 'Through LSU\'s Applied Intelligence Lab, I\'m on a three-person team building an employee onboarding platform for Community Coffee. Instead of hardcoding a checklist for every job, each role answers yes/no questions and the platform computes its checklist from a shared task catalog. I own that data model and checklist generation, plus the pages managers and new hires use; my teammates built an AI onboarding buddy and an admin dashboard. Built with React, FastAPI, and PostgreSQL, with tests and CI on GitHub Actions.',
      },
      {
        id: 'pft-navigator',
        label: 'PFT Navigator',
        title: 'PFT Navigator',
        body: 'PFT Navigator makes LSU\'s 3D digital twin of Patrick F. Taylor Hall useful for students: explore the building, search for a room, course, professor, or department, get a route, then walk it in first person. As Git Master on our CSC 3380 team, I build navigation features in Unreal Engine with Blueprints and UMG, including destination selection, room highlighting, floor-path visualization, and guided routing, all driven by structured JSON data connected to the digital twin.',
      },
      {
        id: 'mri-motion',
        label: 'MRI Motion',
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

export default function Home() {
  const [activeColumn, setActiveColumn] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const currentPhotoRef = useRef(0)
  const intervalRef = useRef(null)

  function startPhotoInterval() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      const next = (currentPhotoRef.current + 1) % photos.length
      currentPhotoRef.current = next
      setCurrentPhoto(next)
    }, 3500)
  }

  useEffect(() => {
    startPhotoInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  function handleColumnClick(colId) {
    if (activeColumn === colId) {
      setActiveColumn(null)
    } else {
      setActiveColumn(colId)
    }
  }

  function handleItemClick(item) {
    const next = item === activeItem ? null : item
    setIsVisible(false)
    startPhotoInterval()
    setTimeout(() => {
      setActiveItem(next)
      setTimeout(() => setIsVisible(true), 150)
    }, 300)
  }

  return (
    <div className="page">
      <hr className="rule" />

      <main className="main">
        <div className="col-grid">
          {columns.map((col) => (
            <div key={col.id} className="col">
              <button
                className={`col-header ${activeColumn === col.id ? 'open' : ''}`}
                onClick={() => handleColumnClick(col.id)}
              >
                {col.label.toUpperCase()}
                <span className="chevron" aria-hidden="true">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
              </button>

              {activeColumn === col.id && (
                <ul className="col-items">
                  {col.items.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`item ${activeItem?.id === item.id ? 'selected' : ''}`}
                        onClick={() => handleItemClick(item)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="content-area" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <div className="content-left">
            {activeItem ? (
              <div className="detail-panel">
                <p className="detail-label">
                  {columns.find((c) => c.items.some((i) => i.id === activeItem.id))?.label} — {activeItem.label}
                </p>
                <h2 className="detail-title">{activeItem.title}</h2>
                {activeItem.body && activeItem.body.split('\n\n').map((para, i) => (
                  <p key={i} className="detail-body">{para}</p>
                ))}
                {activeItem.link && (
                  <a
                    href={activeItem.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    {activeItem.id === 'linkedin' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px', verticalAlign: 'middle', position: 'relative', top: '-1px' }}>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {activeItem.link.label}
                  </a>
                )}
              </div>
            ) : (
              <p className="summary-text">
                <strong>Student, researcher, builder.</strong> <br /> 
                Studying Software Engineering at LSU, researching at Pennington Biomedical, and building toward a future in AI.
              </p>
            )}
          </div>

          <div className={activeItem?.pdf ? 'content-right-pdf' : activeItem?.logo ? 'content-right' : activeItem?.images?.length > 1 ? 'content-right-collage' : activeItem?.images?.length === 1 ? 'content-right-item' : 'content-right'}>
            {activeItem?.pdf ? (
              <iframe
                src={activeItem.pdf + '#toolbar=0&navpanes=0&scrollbar=0'}
                className="pdf-embed"
                title="Resume"
              />
            ) : activeItem?.logo ? (
              <img src="/favicon.svg" alt="MB" className="logo-display" loading="lazy" />
            ) : activeItem?.images?.length > 1 ? (
              <div className="photo-collage">
                {activeItem.images.map((img, i) => (
                  <img key={i} src={img} alt={activeItem.label} className={`${activeItem.collageStyle}-img-${i + 1}`} loading="lazy" />
                ))}
              </div>
            ) : activeItem?.images?.length === 1 ? (
              <img
                src={activeItem.images[0]}
                alt={activeItem.label}
                className="item-image"
                loading="lazy"
              />
            ) : (
              photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt="Malek Badawi"
                  className="personality-photo"
                  style={{ opacity: i === currentPhoto ? 1 : 0, transition: 'opacity 0.8s ease' }}
                  loading="lazy"
                />
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        © 2026 Malek Badawi
      </footer>
    </div>
  )
}
