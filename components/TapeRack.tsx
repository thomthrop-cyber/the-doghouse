'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* ============================================================
   CLIPS — add your YouTube/Vimeo links into `embed`.
   Leave embed blank for a "Standby" tape (shows poster only).
   ============================================================ */
const CLIPS = [
  { embed: 'https://youtu.be/rtqqF_T932U', src: '', poster: '/assets/promo/live-02.jpg', title: "Stamp On 'Em",   cat: 'Promo',       dur: '01:42' },
  { embed: 'https://youtu.be/oKR3poXCo70', src: '', poster: '/assets/promo/live-05.jpg', title: "Dogs Don't Die", cat: 'Music video', dur: '03:08' },
  { embed: '',                              src: '', poster: '/assets/promo/live-06.jpg', title: 'The Doghouse',   cat: 'Doc',         dur: '06:21' },
  { embed: '',                              src: '', poster: '/assets/promo/live-03.jpg', title: 'Closing Set',    cat: 'Live',        dur: '04:55' },
  { embed: '',                              src: '', poster: '/assets/promo/live-01.jpg', title: 'Nightshift',     cat: 'Live',        dur: '02:37' },
  { embed: '',                              src: '', poster: '/assets/promo/live-04.jpg', title: 'Feedback',       cat: 'Music video', dur: '02:14' },
  { embed: '',                              src: '', poster: '/assets/promo/thom-studio.jpeg', title: 'In The Room', cat: 'Doc',       dur: '05:09' },
]

const CATS = ['All', 'Promo', 'Music video', 'Doc', 'Live']

function embedUrl(u: string) {
  if (!u) return ''
  u = u.trim()
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  const vi = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vi) return `https://player.vimeo.com/video/${vi[1]}?autoplay=1`
  return u
}

function watchUrl(u: string) {
  if (!u) return ''
  u = u.trim()
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/watch?v=${yt[1]}`
  const vi = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vi) return `https://vimeo.com/${vi[1]}`
  return u
}

function tc(i: number) {
  const s = (i * 17) % 60
  const m = 11 + i * 6
  const f = (i * 7) % 25
  return `00:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}:${String(f).padStart(2,'0')}`
}

export default function TapeRack() {
  const [activeCat, setActiveCat] = useState('All')
  const [monitor, setMonitor] = useState<{ open: boolean; index: number }>({ open: false, index: 0 })
  const monTcRef = useRef<HTMLSpanElement>(null)

  const visibleIndices = CLIPS
    .map((_, i) => i)
    .filter((i) => activeCat === 'All' || CLIPS[i].cat === activeCat)

  function openMonitor(i: number) {
    setMonitor({ open: true, index: i })
    document.body.style.overflow = 'hidden'
  }

  function closeMonitor() {
    setMonitor((m) => ({ ...m, open: false }))
    document.body.style.overflow = ''
  }

  function step(dir: number) {
    setMonitor((m) => {
      const pos = visibleIndices.indexOf(m.index)
      const next = visibleIndices[(pos + dir + visibleIndices.length) % visibleIndices.length]
      return { open: true, index: next }
    })
  }

  // Keyboard nav for monitor
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!monitor.open) return
      if (e.key === 'Escape') closeMonitor()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [monitor.open, activeCat])

  // Running timecode in monitor OSD
  useEffect(() => {
    if (!monitor.open) return
    let f = 0
    const id = setInterval(() => {
      f++
      const ff = f % 25, totalSec = Math.floor(f / 25)
      const ss = totalSec % 60, mm = Math.floor(totalSec / 60) % 60, hh = Math.floor(totalSec / 3600)
      if (monTcRef.current) {
        monTcRef.current.textContent =
          `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}:${String(ff).padStart(2,'0')}`
      }
    }, 40)
    return () => clearInterval(id)
  }, [monitor.open])

  // Tape reveal animation
  useEffect(() => {
    async function animate() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo('.rack-head h1', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power4.out', delay: 0.2 })
      gsap.fromTo('.rack-head .eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' })
      gsap.fromTo('.rack-head .lead', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.35, ease: 'power3.out' })
      gsap.fromTo('.filters', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' })

      gsap.utils.toArray<HTMLElement>('.tape').forEach((tape, i) => {
        gsap.fromTo(
          tape,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: tape, start: 'top 90%', once: true },
          }
        )
      })
    }
    animate()
  }, [])

  const clip = CLIPS[monitor.index]
  const embed = embedUrl(clip?.embed ?? '')
  const watch = watchUrl(clip?.embed ?? '')
  const posInView = visibleIndices.indexOf(monitor.index)

  return (
    <>
      {/* ── Header ── */}
      <section className="rack-head">
        <div className="wrap">
          <p className="eyebrow">The Doghouse · In-house video &amp; visuals</p>
          <h1 className="poster">The tape <span className="hl">rack.</span></h1>
          <p className="lead">
            Everything we&apos;ve pointed a camera at — promos, music videos, documentation,
            live sets. Pick a tape to roll it.
          </p>
          <div className="filters" role="group" aria-label="Filter clips by type">
            {CATS.map((cat) => {
              const count = cat === 'All' ? CLIPS.length : CLIPS.filter((c) => c.cat === cat).length
              return (
                <button
                  key={cat}
                  className="chip"
                  type="button"
                  aria-pressed={activeCat === cat ? 'true' : 'false'}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}<span className="n">{String(count).padStart(2,'0')}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tape grid ── */}
      <section className="rack">
        <div className="wrap">
          <div className="rack-grid">
            {CLIPS.map((v, i) => {
              const hidden = activeCat !== 'All' && v.cat !== activeCat
              return (
                <button
                  key={i}
                  className={`tape${hidden ? ' is-hidden' : ''}`}
                  type="button"
                  aria-label={`Play ${v.title}`}
                  onClick={() => openMonitor(i)}
                >
                  <Image src={v.poster} alt={v.title} fill sizes="(max-width:560px) 100vw, (max-width:920px) 50vw, 33vw" loading="lazy" />
                  <span className="t-cat">{v.cat}</span>
                  <span className="t-tc">{tc(i)}</span>
                  <span className="t-play" />
                  <span className="t-foot">
                    <span className="t-title">{v.title}</span>
                    <span className="t-dur">⌗ {v.dur}</span>
                  </span>
                </button>
              )
            })}
          </div>
          {visibleIndices.length === 0 && (
            <p className="rack-empty show">// NO TAPES IN THIS BIN —</p>
          )}
        </div>
      </section>

      {/* ── Monitor modal ── */}
      {monitor.open && (
        <div
          className="monitor open"
          role="dialog"
          aria-modal="true"
          aria-label="Clip player"
          onClick={(e) => { if (e.currentTarget === e.target) closeMonitor() }}
        >
          <div className="monitor-grain" onClick={closeMonitor} />
          <div className="mon-box">
            <div className="mon-top">
              <div className="mon-meta">
                <span className="mon-cat">{clip.cat}</span>
                <h2 className="mon-title">{clip.title}</h2>
              </div>
              <div className="mon-actions">
                {watch && (
                  <a className="mon-open" href={watch} target="_blank" rel="noopener">
                    Open on YouTube ↗
                  </a>
                )}
                <button className="mon-close" type="button" onClick={closeMonitor}>
                  ✕ Esc · close
                </button>
              </div>
            </div>

            <div className={`screen${embed ? ' has-embed' : ''}`}
                 style={embed ? { backgroundImage: `url(${clip.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
              <button className="mon-nav mon-prev" type="button" aria-label="Previous clip" onClick={(e) => { e.stopPropagation(); step(-1) }}>←</button>
              <button className="mon-nav mon-next" type="button" aria-label="Next clip" onClick={(e) => { e.stopPropagation(); step(1) }}>→</button>

              {embed ? (
                <iframe
                  src={embed}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={clip.title}
                />
              ) : clip.src ? (
                <video src={clip.src} poster={clip.poster} controls autoPlay playsInline />
              ) : (
                <>
                  <img className="poster" src={clip.poster} alt={clip.title} />
                  <div className="standby">
                    <div className="big-play" />
                    <div className="sb-note">Standby · footage drops in here</div>
                  </div>
                </>
              )}

              <div className="osd">
                <span className="rec"><span className="dot" /> PLAY</span>
                <span className="tc" ref={monTcRef}>00:00:00:00</span>
                <span className="lab">{clip.title.toUpperCase()}</span>
              </div>
              <div className="scan-line" />
            </div>

            <div className="mon-bar">
              <span className="mon-count">
                {String(posInView + 1).padStart(2,'0')} / {String(visibleIndices.length).padStart(2,'0')}
              </span>
              <div className="mon-prog"><i /></div>
              <span className="mon-count">{clip.dur}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
