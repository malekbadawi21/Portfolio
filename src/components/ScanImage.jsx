// One content image that builds in like an MRI acquiring slices the first time
// it scrolls into view (see lib/scan.js). Without the script it is a plain image.
export default function ScanImage({ src, alt, width, height, className = '', loading = 'lazy', delay }) {
  return (
    <span className={`scan ${className}`} data-scan data-scan-delay={delay}>
      <img src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" />
      <span className="scan-clip" aria-hidden="true"><span className="scan-line" /></span>
      <span className="scan-readout" aria-hidden="true">SLICE 01/24</span>
    </span>
  )
}
