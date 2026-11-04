import { useRef } from 'react'
import useFitText from './useFitText'

// The close: the last photograph, dimmed, with the name across it.
export default function Footer({ photo, columns, contact }) {
  const fitRef = useRef(null)
  useFitText(fitRef, { min: 40, max: 360 })
  const email = contact.items.find((i) => i.id === 'email')

  return (
    <footer className="site-footer">
      <img className="footer-photo" src={photo} alt="" loading="lazy" />
      <div className="footer-top">
        <nav aria-label="Footer">
          <ul>
            {columns.map((col) => (
              <li key={col.id}><a href={`#${col.id}`}>{col.label}</a></li>
            ))}
          </ul>
        </nav>
        <a className="text-link" href={`mailto:${email.body}`}>{email.body}</a>
      </div>
      <div className="footer-bottom">
        <p className="footer-name" ref={fitRef} aria-hidden="true">
          <span className="fit-line">Malek Badawi</span>
        </p>
        <p className="footer-legal">© 2026 Malek Badawi</p>
      </div>
    </footer>
  )
}
