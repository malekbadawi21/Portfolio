import { useEffect, useRef, useState } from 'react'
import Paragraphs from './Paragraphs'

function Media({ item }) {
  const [first, ...rest] = item.images || []
  if (!first) return null
  return (
    <div className={`edu-media edu-media-${item.images.length > 1 ? 'set' : 'one'}`}>
      <img className="edu-main" src={first} alt={item.label} loading="lazy" />
      {rest.length > 0 && (
        <div className="edu-rest">
          {rest.map((src, i) => (
            <img key={i} src={src} alt={item.label} loading="lazy" />
          ))}
        </div>
      )}
    </div>
  )
}

// The picture of the entry being read stays lit on the left; reading,
// hovering or focusing an entry on the right swaps it.
export default function Education({ column }) {
  const [active, setActive] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('[data-row]')
    if (!rows?.length || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.row))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [])

  return (
    <section className="edu section" id={column.id} aria-labelledby={`${column.id}-h`}>
      <div className="edu-stage" aria-hidden="true">
        {column.items.map((item, i) => (
          <div key={item.id} className={`edu-frame ${active === i ? 'is-on' : ''}`}>
            <Media item={item} />
          </div>
        ))}
      </div>

      <div className="edu-list" ref={listRef}>
        <h2 className="section-h" id={`${column.id}-h`} data-reveal>{column.label}</h2>
        {column.items.map((item, i) => (
          <article
            key={item.id}
            id={item.id}
            data-row={i}
            className={`edu-row ${active === i ? 'is-on' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <div className="edu-inline">
              <Media item={item} />
            </div>
            <header data-reveal>
              <h3 className="item-label">{item.label}</h3>
              <p className="item-title">{item.title}</p>
            </header>
            <div data-reveal style={{ '--d': 1 }}>
              <Paragraphs text={item.body} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
