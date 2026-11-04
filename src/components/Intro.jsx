// The heading holds its place while the photographs pass beside it in two
// staggered columns.
export default function Intro({ heading, photos }) {
  const columns = [
    photos.map((src, i) => ({ src, i })).filter(({ i }) => i % 2 === 0),
    photos.map((src, i) => ({ src, i })).filter(({ i }) => i % 2 === 1),
  ]
  return (
    <section className="intro" aria-labelledby="intro-h">
      <h2 className="intro-h" id="intro-h">{heading}</h2>
      <div className="intro-photos">
        {columns.map((col, c) => (
          <div key={c} className={`intro-col intro-col-${c}`}>
            {col.map(({ src, i }) => (
              <figure key={i} className={`intro-ph intro-ph-${i}`} style={{ order: i }} data-reveal>
                <img src={src} alt="Malek Badawi" loading="lazy" />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
