import { useEffect } from 'react'

// Sets the font size of `ref` so its widest `.fit-line` runs exactly across
// the element's content box. Measured, not guessed, and redone on resize and
// once the web fonts have loaded.
export default function useFitText(ref, { min = 24, max = 400 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function fit() {
      const lines = el.querySelectorAll('.fit-line')
      if (!lines.length) return
      el.style.fontSize = '100px'
      const style = getComputedStyle(el)
      const box = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      let widest = 0
      lines.forEach((l) => {
        if (l.getClientRects().length) widest = Math.max(widest, l.getBoundingClientRect().width)
      })
      if (!widest) return
      const size = Math.min(Math.max((100 * box) / widest, min), max)
      el.style.fontSize = `${Math.floor(size * 100) / 100}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, min, max])
}
