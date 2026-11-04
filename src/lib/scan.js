// Scan-in reveal. Each [data-scan] image appears as 24 horizontal slices filled
// top to bottom, with a 1px scanline on the leading edge and a SLICE nn/24
// readout. It plays once, then the image is an ordinary still.
//
// The hidden start state only exists under html.scan-on, which this module
// sets, so the images stay visible if the script never runs.

const SLICES = 24
const DURATION = 600
const POWER = 1.8 // ease-out 1 - (1 - t)^POWER, gentle enough that the last slices don't stall
const STAGGER = 90 // ms between images that enter together

const progress = (t) => 1 - Math.pow(1 - t, POWER)
// The moment slice k is complete: the inverse of progress at k / SLICES.
const sliceAt = (k) => 1 - Math.pow(1 - k / SLICES, 1 / POWER)

const clipFrames = []
const lineFrames = []
for (let k = 0; k <= SLICES; k++) {
  const offset = sliceAt(k)
  const done = (k * 100) / SLICES
  // Hold each slice count until the next slice lands, so slices snap in one by one.
  clipFrames.push({ offset, clipPath: `inset(0 0 ${(100 - done).toFixed(3)}% 0)`, easing: 'steps(1, end)' })
  // The line moves continuously between the same moments, so it leads each slice.
  lineFrames.push({ offset, transform: `translateY(${done.toFixed(3)}%)` })
}

const pad = (n) => String(n).padStart(2, '0')

function loaded(img) {
  const ready = img.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
      })
  return ready.then(() => (img.decode ? img.decode().catch(() => {}) : undefined))
}

function finish(el) {
  el.classList.add('is-scanned')
  el.getAnimations({ subtree: true }).forEach((a) => a.cancel())
  // The readout lingers a moment, then fades (see .scan-readout in Home.css).
  setTimeout(() => el.classList.remove('is-scanning'), 300)
}

function play(el, reduce) {
  const img = el.querySelector('img')
  if (reduce) {
    img.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease-out', fill: 'both' })
      .finished.then(() => finish(el), () => {})
    return
  }

  const line = el.querySelector('.scan-line')
  const readout = el.querySelector('.scan-readout')
  el.classList.add('is-scanning')
  const reveal = img.animate(clipFrames, { duration: DURATION, fill: 'both' })
  line.animate(lineFrames, { duration: DURATION, fill: 'both' })

  // The readout names the slice being acquired; the text only changes 24 times.
  let shown = 1
  const tick = () => {
    if (reveal.playState !== 'running') return
    const k = Math.min(SLICES, Math.floor(progress(Math.min(1, reveal.currentTime / DURATION)) * SLICES) + 1)
    if (k !== shown) {
      shown = k
      readout.textContent = `SLICE ${pad(k)}/${SLICES}`
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)

  reveal.finished.then(() => {
    readout.textContent = `SLICE ${SLICES}/${SLICES}`
    finish(el)
  }, () => {})
}

// Observes every [data-scan] on the page. Returns a cleanup function.
export function observeScans() {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return () => {}
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  document.documentElement.classList.add('scan-on')

  let nextStart = 0
  let cancelled = false
  const timers = new Set()
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        io.unobserve(e.target)
        const el = e.target
        // Images that enter together take turns in page order, STAGGER apart;
        // each also waits for its own file, so none scans in an empty box.
        const now = performance.now()
        const slot = Math.max(now + (Number(el.dataset.scanDelay) || 0), nextStart)
        nextStart = slot + STAGGER
        const turn = new Promise((resolve) => {
          const id = setTimeout(() => {
            timers.delete(id)
            resolve()
          }, slot - now)
          timers.add(id)
        })
        Promise.all([turn, loaded(el.querySelector('img'))]).then(() => {
          if (!cancelled) play(el, media.matches)
        })
      })
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  // A fully clipped image never starts its native lazy load, so start each one
  // a screen ahead of time ourselves.
  const preload = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        preload.unobserve(e.target)
        e.target.querySelector('img').loading = 'eager'
      })
    },
    { rootMargin: '100% 0px 100% 0px' },
  )
  document.querySelectorAll('[data-scan]').forEach((el) => {
    preload.observe(el)
    io.observe(el)
  })
  return () => {
    cancelled = true
    preload.disconnect()
    io.disconnect()
    timers.forEach(clearTimeout)
  }
}
