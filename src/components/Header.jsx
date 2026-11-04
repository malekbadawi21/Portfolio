export default function Header({ shown, columns, resume }) {
  return (
    <header className={`site-header ${shown ? 'is-shown' : ''}`} aria-hidden={!shown} inert={!shown}>
      <a className="wordmark" href="#top" aria-label="Malek Badawi, back to top">MB</a>
      <nav className="site-nav" aria-label="Sections">
        {columns.map((col) => (
          <a key={col.id} href={`#${col.id}`}>{col.label}</a>
        ))}
      </nav>
      <a className="button button-small header-action" href={resume.link.href} target="_blank" rel="noopener noreferrer">
        {resume.link.label}
      </a>
    </header>
  )
}
