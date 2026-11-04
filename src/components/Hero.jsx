import { useState } from 'react'

const SLICES = 12

// The first screen: the reading room at Pennington, dimmed, scanned in slice
// by slice, with Malek's badge over it. The badge carries the index of the
// site: point at an entry and its picture lights up in the badge photo slot.
export default function Hero({ ref, room, headshot, line, index, contact }) {
  const [preview, setPreview] = useState(null)
  const email = contact.items.find((i) => i.id === 'email')
  const linkedin = contact.items.find((i) => i.id === 'linkedin')
  const resume = contact.items.find((i) => i.id === 'resume')

  const show = (item) => setPreview(item.images?.length ? item : null)
  const clear = () => setPreview(null)

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-name">
      <div className="hero-room" aria-hidden="true">
        <img className="hero-room-img" src={room} alt="" width="2000" height="1500" fetchPriority="high" />
        <div className="scan">
          {Array.from({ length: SLICES }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className="badge">
        <h1 className="badge-name" id="hero-name">
          <span>Malek</span> <span>Badawi</span>
        </h1>

        <div className="badge-body">
          <figure className="badge-photo">
            <img
              className={`badge-headshot ${preview ? 'is-off' : ''}`}
              src={headshot}
              alt="Malek Badawi"
              width="1023"
              height="1279"
            />
            {preview && (
              <img
                key={preview.id}
                className="badge-preview"
                src={preview.images[0]}
                alt={preview.label}
              />
            )}
          </figure>

          <div className="badge-info">
            <nav className="badge-index" aria-label="Index">
              {index.map((col) => (
                <div className="badge-col" key={col.id}>
                  <a className="badge-col-label" href={`#${col.id}`}>{col.label}</a>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onMouseEnter={() => show(item)}
                          onMouseLeave={clear}
                          onFocus={() => show(item)}
                          onBlur={clear}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <p className="badge-line">{line}</p>
          </div>
        </div>

        <div className="badge-foot">
          <a className="text-link" href={`mailto:${email.body}`}>{email.body}</a>
          <a className="button" href={resume.link.href} target="_blank" rel="noopener noreferrer">
            {resume.link.label}
          </a>
          <a className="text-link" href={linkedin.link.href} target="_blank" rel="noopener noreferrer">
            {linkedin.link.label}
          </a>
        </div>
      </div>
    </section>
  )
}
