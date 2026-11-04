export default function Footer({ columns, contact }) {
  const email = contact.items.find((i) => i.id === 'email')
  return (
    <footer className="site-footer">
      <p>© 2026 Malek Badawi</p>
      <nav aria-label="Footer">
        {columns.map((col) => (
          <a key={col.id} href={`#${col.id}`}>{col.label}</a>
        ))}
        <a href={`mailto:${email.body}`}>{email.body}</a>
      </nav>
    </footer>
  )
}
