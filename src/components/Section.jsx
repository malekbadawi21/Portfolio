import Entry from './Entry'

const pad = (n) => String(n).padStart(2, '0')

export default function Section({ column, index, children }) {
  const n = pad(index)
  return (
    <section className="section" id={column.id} aria-labelledby={`${column.id}-h`}>
      <h2 className="section-h" id={`${column.id}-h`} data-reveal>
        <span className="num">{n}</span>
        {column.label}
      </h2>
      {children
        ? children(n)
        : column.items.map((item, i) => (
            <Entry key={item.id} number={`${n}.${i + 1}`} item={item} />
          ))}
    </section>
  )
}
