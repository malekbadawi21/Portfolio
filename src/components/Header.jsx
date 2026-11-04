import JumpMenu from './JumpMenu'

export default function Header({ columns, resume, active }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Malek Badawi, back to top">
        <span className="wordmark-full">Malek Badawi</span>
        <span className="wordmark-short" aria-hidden="true">MB</span>
      </a>
      <nav className="site-nav" aria-label="Sections">
        {columns.map((col) => (
          <a key={col.id} href={`#${col.id}`} aria-current={active === col.id ? 'true' : undefined}>
            <span className="nav-label" data-label={col.label}>{col.label}</span>
          </a>
        ))}
      </nav>
      <JumpMenu columns={columns} />
      <a className="button button-small header-action" href={resume.link.href} target="_blank" rel="noopener noreferrer">
        {resume.link.label}
      </a>
    </header>
  )
}
