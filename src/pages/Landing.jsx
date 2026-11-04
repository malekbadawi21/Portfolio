import photo from '../assets/HeadShot3.jpg'
import './Landing.css'

// The M and B are measured by App and handed to the flying letters;
// the rest of each word dissolves as --p (scroll progress, set by App) goes 0 → 1.
export default function Landing({ nameRef, mRef, bRef }) {
  return (
    <div className="landing">
      <h1 className="landing-name" ref={nameRef}>
        <span className="name-line">
          <span className="letter-mb" ref={mRef}>M</span>
          <span className="letter-dissolve">alek</span>
        </span>
        <span className="name-line">
          <span className="letter-mb" ref={bRef}>B</span>
          <span className="letter-dissolve">adawi</span>
        </span>
      </h1>
      <img
        src={photo}
        alt="Malek Badawi"
        className="landing-photo"
        width="1023"
        height="1279"
        fetchPriority="high"
        decoding="async"
      />
      <div className="scroll-arrow" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
