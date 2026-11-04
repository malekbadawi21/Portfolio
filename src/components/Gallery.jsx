// The personal photographs in one row at a shared height. Each takes width in
// proportion to its own shape, so none is cropped.
export default function Gallery({ photos }) {
  return (
    <section className="gallery" aria-label="Photographs">
      {photos.map(({ src, ratio }, i) => [
        <figure key={i} className="gallery-ph" style={{ flexGrow: ratio, aspectRatio: ratio }} data-reveal>
          <img src={src} alt="Malek Badawi" loading="lazy" />
        </figure>,
        // On a phone the row breaks into two after the third photograph.
        i === 2 && <span key="break" className="gallery-break" aria-hidden="true" />,
      ])}
    </section>
  )
}
