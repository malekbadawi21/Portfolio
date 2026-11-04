import { useEffect, useMemo, useRef, useState } from 'react'

const pad = (n) => String(n).padStart(2, '0')
const isMac = () => /Mac|iPhone|iPad|iPod/.test(navigator.userAgentData?.platform || navigator.platform || '')
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Every entry on the page, numbered the way the sections number them. Contact
// rows carry the link they already open; the rest scroll to their entry.
function buildRows(columns) {
  return columns.flatMap((col, ci) =>
    col.items.map((item, i) => {
      const row = { key: item.id, num: `${pad(ci + 1)}.${i + 1}`, label: item.label, title: item.title, id: item.id }
      if (col.id !== 'contact') return row
      if (item.link) return { ...row, title: item.link.label, href: item.link.href, external: true }
      return { ...row, title: item.body, href: `mailto:${item.body}` }
    }),
  )
}

// Lands the eye on the entry once the scroll settles: its number turns to the
// active marker for a moment.
function markArrival(id) {
  const num = document.querySelector(`#${id} .num`)
  if (!num) return
  let done = false
  const mark = () => {
    if (done) return
    done = true
    num.classList.add('is-target')
    setTimeout(() => num.classList.remove('is-target'), 1400)
  }
  window.addEventListener('scrollend', mark, { once: true })
  setTimeout(mark, reduceMotion() ? 0 : 900)
}

function follow(row) {
  const a = document.createElement('a')
  a.href = row.href
  if (row.external) {
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  }
  a.click()
}

export default function JumpMenu({ columns }) {
  const rows = useMemo(() => buildRows(columns), [columns])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [mac, setMac] = useState(false)
  const dialog = useRef(null)
  const input = useRef(null)
  const trigger = useRef(null)
  const list = useRef(null)
  const jumped = useRef(null)

  const q = query.trim().toLowerCase()
  const matches = q
    ? rows.filter((r) => `${r.num} ${r.label} ${r.title}`.toLowerCase().includes(q))
    : rows

  useEffect(() => setMac(isMac()), [])

  // ⌘K / Ctrl K toggles the menu from anywhere on the page.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (open && !d.open) {
      setQuery('')
      setActive(0)
      jumped.current = null
      d.showModal()
      input.current.focus()
    } else if (!open && d.open) {
      d.close()
    }
  }, [open])

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, query])

  const onClose = () => {
    setOpen(false)
    const id = jumped.current
    if (!id) {
      trigger.current?.focus({ preventScroll: true })
      return
    }
    // After a jump, focus moves to the entry so Tab carries on from there.
    const target = document.getElementById(id)
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    target.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth', block: 'start' })
    markArrival(id)
  }

  const choose = (row) => {
    if (!row) return
    if (row.href) {
      dialog.current.close()
      follow(row)
      return
    }
    jumped.current = row.id
    dialog.current.close()
  }

  const onKeyDown = (e) => {
    const n = matches.length
    if (e.key === 'ArrowDown' && n) {
      e.preventDefault()
      setActive((a) => (a + 1) % n)
    } else if (e.key === 'ArrowUp' && n) {
      e.preventDefault()
      setActive((a) => (a - 1 + n) % n)
    } else if (e.key === 'Home' && n) {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End' && n) {
      e.preventDefault()
      setActive(n - 1)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      choose(matches[active])
    } else if (e.key === 'Tab') {
      // The field is the only stop in the dialog; focus stays in it.
      e.preventDefault()
    }
  }

  const current = matches[active]

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="jump-trigger"
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        aria-label={`Jump to section (${mac ? '⌘K' : 'Ctrl K'})`}
        onClick={() => setOpen(true)}
      >
        <kbd className="jump-kbd">{mac ? '⌘K' : 'Ctrl K'}</kbd>
        <svg className="jump-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <circle cx="7.75" cy="7.75" r="5.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11.75 11.75 16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </button>

      <dialog
        ref={dialog}
        className="jump"
        aria-label="Jump menu"
        onClose={onClose}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <input
          ref={input}
          className="jump-input"
          type="text"
          role="combobox"
          aria-label="Jump to"
          aria-expanded="true"
          aria-controls="jump-list"
          aria-autocomplete="list"
          aria-activedescendant={current ? `jump-${current.key}` : undefined}
          placeholder="Jump to…"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={onKeyDown}
        />
        <ul ref={list} className="jump-list" id="jump-list" role="listbox" aria-label="Entries">
          {matches.map((row, i) => (
            <li
              key={row.key}
              id={`jump-${row.key}`}
              className="jump-opt"
              role="option"
              aria-selected={i === active}
              onMouseMove={() => i !== active && setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(row)}
            >
              <span className="num">{row.num}</span>
              <span className="jump-label">{row.label}</span>
              <span className="jump-title">{row.title}</span>
            </li>
          ))}
        </ul>
        <p className="jump-empty" role="status">{matches.length ? '' : 'No matches'}</p>
      </dialog>
    </>
  )
}
