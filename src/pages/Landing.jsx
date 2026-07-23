import photo from '../assets/HeadShot3.jpg'
import './Landing.css'

export default function Landing({ progress, nameRef }) {
  const dissolveOpacity = Math.max(1 - progress * 4, 0)
  const mbOpacity = Math.max(1 - progress * 4, 0)
  const arrowOpacity = Math.max(1 - progress * 6, 0)

  return (
    <div className="landing">
      <h1 className="landing-name" ref={nameRef}>
        <span className="letter-mb" style={{ opacity: mbOpacity }}>M</span>
        <span className="letter-dissolve" style={{ opacity: dissolveOpacity }}>alek</span>
        <br />
        <span className="letter-mb" style={{ opacity: mbOpacity }}>B</span>
        <span className="letter-dissolve" style={{ opacity: dissolveOpacity }}>adawi</span>
      </h1>
      <img
        src={photo}
        alt="Malek Badawi"
        className="landing-photo"
        loading="lazy"
      />
      <div className="scroll-arrow" style={{ opacity: arrowOpacity }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M5 9l7 7 7-7" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
