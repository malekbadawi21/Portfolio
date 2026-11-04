import { useEffect, useRef, useState } from 'react'
import photo from '../assets/HeadShot3.jpg'
import './Landing.css'

const FIRST = 'alek'
const LAST = 'adawi'
const FULL = FIRST.length + LAST.length
const STEP_MS = 42

// The name types itself in on load. Once the visitor scrolls, it backspaces to
// the initials "M" / "B" (the mark in the column bar); back at the top, it retypes.
// Typing order: "alek", then "adawi". Deleting runs in reverse.
export default function Landing() {
  const reduce = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [typed, setTyped] = useState(reduce.current ? FULL : 0)
  const target = useRef(FULL)

  useEffect(() => {
    if (reduce.current) return
    let timer = 0
    let current = 0
    const tick = () => {
      if (current === target.current) {
        timer = 0
        return
      }
      current += current < target.current ? 1 : -1
      setTyped(current)
      timer = window.setTimeout(tick, STEP_MS)
    }
    const run = () => {
      if (!timer) timer = window.setTimeout(tick, STEP_MS)
    }
    const onScroll = () => {
      const next = window.scrollY > 24 ? 0 : window.scrollY < 8 ? FULL : target.current
      if (next !== target.current) {
        target.current = next
        run()
      }
    }
    // A short beat before the name starts typing.
    const start = window.setTimeout(() => {
      onScroll()
      run()
    }, 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(start)
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const first = FIRST.slice(0, Math.min(typed, FIRST.length))
  const last = LAST.slice(0, Math.max(0, typed - FIRST.length))
  const caretOnFirst = typed <= FIRST.length && typed < FULL

  return (
    <section className="hero snap" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-inner">
        <h1 className="hero-name" aria-label="Malek Badawi">
          <span className="name-line" aria-hidden="true">
            <span className="initial">M</span>
            {first}
            {caretOnFirst && <span className="caret" />}
          </span>
          <span className="name-line" aria-hidden="true">
            <span className="initial">B</span>
            {last}
            {!caretOnFirst && <span className="caret" />}
          </span>
        </h1>

        <p className="hero-summary">
          <strong>Student, researcher, builder.</strong> <br />
          Studying Software Engineering at LSU, researching at Pennington Biomedical, and building toward a future in AI.
        </p>

        <figure className="hero-photo">
          <img src={photo} alt="Malek Badawi" width="1023" height="1279" fetchPriority="high" decoding="async" />
        </figure>
      </div>
    </section>
  )
}
