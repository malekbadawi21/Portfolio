import { useEffect, useRef } from 'react'
import Paragraphs from './Paragraphs'

// One project per row. The row you are reading is lit; the others wait in
// the dark until you reach them.
export default function Projects({ column }) {
  const listRef = useRef(null)

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('.proj')
    if (!rows?.length || !('IntersectionObserver' in window)) return
    listRef.current.classList.add('can-light')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('is-lit', e.isIntersecting))
      },
      { rootMargin: '-30% 0px -30% 0px' },
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section className="projects section" id={column.id} aria-labelledby={`${column.id}-h`}>
      <h2 className="section-h" id={`${column.id}-h`} data-reveal>{column.label}</h2>
      <div className="proj-list" ref={listRef}>
        {column.items.map((item) => (
          <article key={item.id} id={item.id} className={`proj ${item.images?.length ? 'proj-has-media' : ''}`}>
            <header className="proj-head" data-reveal>
              <h3 className="proj-label">{item.label}</h3>
              {item.title !== item.label && <p className="item-title">{item.title}</p>}
            </header>
            <div className="proj-text" data-reveal style={{ '--d': 1 }}>
              <Paragraphs text={item.body} />
            </div>
            {item.images?.length > 0 && (
              <figure className="proj-media" data-reveal style={{ '--d': 2 }}>
                <img src={item.images[0]} alt={item.label} loading="lazy" />
              </figure>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
