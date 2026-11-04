import Rich from './Rich'

function Media({ item }) {
  const [first, ...rest] = item.images || []
  if (!first) return null
  if (!rest.length) {
    return (
      <figure className="media" data-reveal style={{ '--d': 2 }}>
        <img src={first} alt={item.label} loading="lazy" />
      </figure>
    )
  }
  return (
    <figure className="media media-set" data-reveal style={{ '--d': 2 }}>
      <img src={first} alt={item.label} loading="lazy" />
      <div>
        {rest.map((src, i) => (
          <img key={i} src={src} alt={item.label} loading="lazy" />
        ))}
      </div>
    </figure>
  )
}

// One row: number and label in mono, then title and body, then media.
export default function Entry({ number, item, children, aside }) {
  const hasMedia = Boolean(item.images?.length || aside)
  return (
    <article id={item.id} className={`entry ${hasMedia ? 'has-media' : ''}`}>
      <div className="entry-meta" data-reveal>
        <span className="num">{number}</span>
        <span className="entry-label">{item.label}</span>
      </div>
      <div className="entry-main" data-reveal style={{ '--d': 1 }}>
        <h3 className="entry-title">{item.title}</h3>
        {children ?? <Rich text={item.body} />}
      </div>
      {aside ?? <Media item={item} />}
    </article>
  )
}
