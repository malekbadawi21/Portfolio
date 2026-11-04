import LinkedInIcon from './LinkedInIcon'
import ScanImage from './ScanImage'
import DownloadIcon from './DownloadIcon'

// Name, role and the one-line summary first; the index and the headshot
// sit on the same grid beside them.
export default function Hero({ headshot, role, line, columns, contact }) {
  const email = contact.items.find((i) => i.id === 'email')
  const linkedin = contact.items.find((i) => i.id === 'linkedin')
  const resume = contact.items.find((i) => i.id === 'resume')

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <h1 className="hero-name" id="hero-name">
        <span>Malek Badawi</span>
      </h1>

      <p className="hero-role">{role}</p>

      <div className="hero-copy">
        <p className="hero-line">{line}</p>
        <div className="hero-actions">
          <a className="button" href={resume.link.href} target="_blank" rel="noopener noreferrer">
            {resume.link.label}
            <DownloadIcon />
          </a>
          <a className="text-link" href={`mailto:${email.body}`}>{email.body}</a>
          <a className="text-link" href={linkedin.link.href} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
            {linkedin.link.label}
          </a>
        </div>
      </div>

      <nav className="hero-index" aria-label="Index">
        {columns.map((col, i) => (
          <a key={col.id} href={`#${col.id}`}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            {col.label}
          </a>
        ))}
      </nav>

      <figure className="hero-photo">
        <ScanImage src={headshot} alt="Malek Badawi" width={317} height={359} loading="eager" delay={160} className="hero-scan" />
      </figure>
    </section>
  )
}
