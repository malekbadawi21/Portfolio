import Paragraphs from './Paragraphs'

// Each role is an exhibit placed on its own side of the room. A role with no
// picture becomes a row of type across the full width.
export default function Roles({ column }) {
  let side = 0
  return (
    <section className="roles section" id={column.id} aria-labelledby={`${column.id}-h`}>
      <h2 className="section-h" id={`${column.id}-h`} data-reveal>{column.label}</h2>
      {column.items.map((item) => {
        const hasImage = item.images?.length > 0
        const layout = hasImage ? (side++ % 2 === 0 ? 'left' : 'right') : 'row'
        return (
          <article key={item.id} id={item.id} className={`exhibit exhibit-${layout}`}>
            {hasImage && (
              <figure className={`exhibit-media exhibit-media-${item.id}`} data-reveal>
                <img src={item.images[0]} alt={item.label} loading="lazy" />
              </figure>
            )}
            <header className="exhibit-head" data-reveal>
              <h3 className="item-label">{item.label}</h3>
              <p className="item-title">{item.title}</p>
            </header>
            <div className="exhibit-text" data-reveal style={{ '--d': 1 }}>
              <Paragraphs text={item.body} />
            </div>
          </article>
        )
      })}
    </section>
  )
}
