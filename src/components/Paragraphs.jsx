// Bodies in `columns` separate paragraphs with a blank line.
export default function Paragraphs({ text, className = 'body' }) {
  if (!text) return null
  return text.split('\n\n').map((para, i) => (
    <p key={i} className={className}>{para}</p>
  ))
}
