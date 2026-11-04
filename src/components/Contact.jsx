import { useRef } from 'react'
import useFitText from './useFitText'
import LinkedInIcon from './LinkedInIcon'

// The one inverted section: the email address set as the display line.
export default function Contact({ column }) {
  const fitRef = useRef(null)
  useFitText(fitRef, { min: 32, max: 220 })
  const email = column.items.find((i) => i.id === 'email')
  const linkedin = column.items.find((i) => i.id === 'linkedin')
  const resume = column.items.find((i) => i.id === 'resume')
  const [user, domain] = email.body.split('@')

  return (
    <section className="contact" id={column.id} aria-labelledby={`${column.id}-h`}>
      <h2 className="section-h" id={`${column.id}-h`} data-reveal>{column.label}</h2>

      <a className="contact-email" href={`mailto:${email.body}`} ref={fitRef} aria-label={`${email.title}: ${email.body}`}>
        <span className="fit-line fit-one">{email.body}</span>
        <span className="fit-two" aria-hidden="true">
          <span className="fit-line">{user}@</span>
          <span className="fit-line">{domain}</span>
        </span>
      </a>

      <div className="contact-resume">
        <div className="contact-side">
          <h3 className="item-label" data-reveal>{resume.title}</h3>
          <div className="contact-links" data-reveal>
            <a className="text-link" href={linkedin.link.href} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              {linkedin.link.label}
            </a>
            <a className="button button-dark" href={resume.link.href} target="_blank" rel="noopener noreferrer">
              {resume.link.label}
            </a>
          </div>
        </div>
        <div className="resume-page" data-reveal style={{ '--d': 1 }}>
          <iframe
            src={resume.pdf + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH'}
            title={resume.title}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
