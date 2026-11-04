import Rich from './Rich'
import ScanImage from './ScanImage'

// Each image in `item.images` is { src, w, h }: its natural size, so the box
// is reserved before the file loads and nothing on the page shifts.
function Media({ item }) {
  const [first, ...rest] = item.images || []
  if (!first) return null
  const img = (im, i) => (
    <ScanImage key={i} src={im.src} alt={item.label} width={im.w} height={im.h} />
  )
  if (!rest.length) {
    return (
      <figure className="media" style={{ '--r': first.w / first.h }}>
        {img(first, 0)}
      </figure>
    )
  }
  return (
    <figure className="media media-set">
      {img(first, 0)}
      <div>{rest.map((im, i) => img(im, i + 1))}</div>
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
        <div className="entry-body">{children ?? <Rich text={item.body} />}</div>
      </div>
      {aside ?? <Media item={item} />}
    </article>
  )
}
