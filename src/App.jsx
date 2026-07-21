import { useEffect, useRef, useState } from 'react'
import Home from './pages/Home'
import Landing from './pages/Landing'
import './App.css'

function App() {
  const containerRef = useRef(null)
  const landingNameRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [nameRect, setNameRect] = useState(null)
  const [nameFontSize, setNameFontSize] = useState(90)

  useEffect(() => {
    if (landingNameRef.current) {
      const rect = landingNameRef.current.getBoundingClientRect()
      const fontSize = parseFloat(getComputedStyle(landingNameRef.current).fontSize)
      setNameRect(rect)
      setNameFontSize(fontSize)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current

    function handleWheel(e) {
      const scrollTop = container.scrollTop
      const landingHeight = window.innerHeight
      const onLanding = scrollTop < landingHeight / 2
      const scrollingUp = e.deltaY < 0
      if (!onLanding && scrollingUp) e.preventDefault()
    }

    function handleScroll() {
      const p = Math.min(container.scrollTop / window.innerHeight, 1)
      setProgress(p)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function goToLanding() {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const mbStartX = nameRect ? nameRect.left : 48
  const mbStartY = nameRect ? nameRect.top + nameFontSize / 2 : window.innerHeight * 0.5
  const mbEndX = window.innerWidth - 80
  const mbEndY = 37

  const mbX = mbStartX + (mbEndX - mbStartX) * progress
  const mbY = mbStartY + (mbEndY - mbStartY) * progress
  const mbFontSize = nameFontSize + (18 - nameFontSize) * progress
  const mbOpacity = progress < 0.05 ? 0 : Math.min((progress - 0.05) / 0.3, 1)

  return (
    <div className="scroll-container" ref={containerRef}>
      <nav className="nav">
        <button className="nav-name" onClick={goToLanding}>Malek Badawi</button>
      </nav>

      {progress > 0.05 && (
        <div
          className="mb-fixed"
          style={{
            left: `${mbX}px`,
            top: `${mbY}px`,
            fontSize: `${mbFontSize}px`,
            opacity: mbOpacity,
          }}
        >
          MB
        </div>
      )}

      <section id="landing" className="snap-section">
        <Landing progress={progress} nameRef={landingNameRef} />
      </section>

      <section id="home" className="snap-section">
        <Home />
      </section>
    </div>
  )
}

export default App
