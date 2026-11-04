import ScanImage from './ScanImage'

// The personal photographs in one row at a shared height. Each takes width in
// proportion to its own shape, so none is cropped.
export default function Gallery({ photos }) {
  return (
    <section className="gallery" aria-label="Photographs">
      {photos.map(({ src, w, h }, i) => [
        <figure key={i} className="gallery-ph" style={{ flexGrow: w / h, aspectRatio: `${w} / ${h}` }}>
          <ScanImage src={src} alt="Malek Badawi" width={w} height={h} />
        </figure>,
        // On a phone the row breaks into two after the third photograph.
        i === 2 && <span key="break" className="gallery-break" aria-hidden="true" />,
      ])}
    </section>
  )
}
