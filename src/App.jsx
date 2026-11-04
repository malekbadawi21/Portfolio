import { useLayoutEffect, useRef } from 'react'
import Home from './pages/Home'
import Landing from './pages/Landing'
import './App.css'

const clamp01 = (v) => Math.min(Math.max(v, 0), 1)
const lerp = (a, b, t) => a + (b - a) * t
const smoothstep = (t) => t * t * (3 - 2 * t)

function App() {
  const landingRef = useRef(null)
  const nameRef = useRef(null)
  const startM = useRef(null)
  const startB = useRef(null)
  const navRef = useRef(null)
  const navNameRef = useRef(null)
  const targetM = useRef(null)
  const targetB = useRef(null)
  const flyM = useRef(null)
  const flyB = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let geo = null
    let frame = 0
    // The name has a short entrance animation; the flying letters take over
    // only once it has finished, so they are measured at the name's resting place.
    let introDone = false
    let disposed = false

    // Measures where the M and B sit in the landing name (page coordinates)
    // and where they dock in the header (viewport coordinates, the header is fixed).
    // Runs on mount, resize, font load and any change to the name's box.
    function measure() {
      const name = nameRef.current
      const landing = landingRef.current
      if (!name || !landing) return
      const sx = window.scrollX
      const sy = window.scrollY
      const m = startM.current.getBoundingClientRect()
      const b = startB.current.getBoundingClientRect()
      const tm = targetM.current.getBoundingClientRect()
      const tb = targetB.current.getBoundingClientRect()
      const fontSize = parseFloat(getComputedStyle(name).fontSize)
      const targetSize = parseFloat(getComputedStyle(targetM.current).fontSize)
      geo = {
        m: { x: m.left + sx, y: m.top + sy },
        b: { x: b.left + sx, y: b.top + sy },
        tm: { x: tm.left, y: tm.top },
        tb: { x: tb.left, y: tb.top },
        scale: targetSize / fontSize,
        range: landing.offsetHeight,
      }
      for (const el of [flyM.current, flyB.current]) el.style.fontSize = `${fontSize}px`
      landing.dataset.flying = !reduce.matches && introDone ? 'on' : 'off'
      update()
    }

    // Each letter rides the page upward (no lag, so it never floats over content)
    // and stops when it reaches the header. Both share one timeline for sliding
    // and shrinking, set by the B's longer trip, so they converge together.
    function place(el, from, to, t) {
      const x = lerp(from.x, to.x, t)
      const y = Math.max(to.y, from.y - window.scrollY)
      const s = lerp(1, geo.scale, t)
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`
    }

    function update() {
      frame = 0
      if (!geo) return
      const p = clamp01(window.scrollY / geo.range)
      landingRef.current.style.setProperty('--p', p.toFixed(4))

      if (reduce.matches) {
        // Reduced motion: no travel. The name fades out and the mark fades in, in place.
        const o = clamp01((p - 0.55) / 0.35)
        for (const [el, to] of [[flyM.current, geo.tm], [flyB.current, geo.tb]]) {
          el.style.transform = `translate3d(${to.x}px, ${to.y}px, 0) scale(${geo.scale})`
          el.style.opacity = o
        }
      } else if (!introDone) {
        flyM.current.style.opacity = 0
        flyB.current.style.opacity = 0
      } else {
        const trip = Math.max(geo.b.y - geo.tb.y, 1)
        const t = smoothstep(clamp01(window.scrollY / trip))
        place(flyM.current, geo.m, geo.tm, t)
        place(flyB.current, geo.b, geo.tb, t)
        flyM.current.style.opacity = 1
        flyB.current.style.opacity = 1
      }

      const nameOpacity = clamp01((p - 0.35) / 0.4)
      navNameRef.current.style.opacity = nameOpacity
      navNameRef.current.style.visibility = nameOpacity > 0 ? 'visible' : 'hidden'
      navRef.current.dataset.scrolled = window.scrollY > geo.range + 4 ? 'true' : 'false'
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const remeasure = () => requestAnimationFrame(measure)

    measure()
    document.fonts?.ready.then(measure)
    const intro = nameRef.current.getAnimations?.() ?? []
    Promise.all(intro.map((a) => a.finished))
      .catch(() => {})
      .then(() => {
        if (disposed) return
        introDone = true
        measure()
      })
    const ro = new ResizeObserver(remeasure)
    ro.observe(nameRef.current)
    ro.observe(navRef.current)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    reduce.addEventListener('change', measure)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      reduce.removeEventListener('change', measure)
    }
  }, [])

  function goToLanding() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <>
      <header className="site-nav" ref={navRef}>
        <button className="nav-name" ref={navNameRef} onClick={goToLanding}>
          Malek Badawi
        </button>
        <span className="nav-mark" aria-hidden="true">
          <span ref={targetM}>M</span>
          <span ref={targetB}>B</span>
        </span>
      </header>

      <div className="mb-flyer" aria-hidden="true">
        <span ref={flyM}>M</span>
        <span ref={flyB}>B</span>
      </div>

      <section id="landing" className="snap-section" ref={landingRef}>
        <Landing nameRef={nameRef} mRef={startM} bRef={startB} />
      </section>

      <section id="home" className="snap-section">
        <Home />
      </section>
    </>
  )
}

export default App
