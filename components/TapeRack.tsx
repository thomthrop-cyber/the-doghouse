'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/* ============================================================
   CLIPS — add YouTube links and credits here as you shoot more.
   Fill in any credit field below — leave blank ('') to hide it.
   ============================================================ */
const CLIPS = [
  {
    embed: 'https://youtu.be/rtqqF_T932U',
    title: 'Napoleon',
    cat: 'Promo',
    dur: '01:42',
    credits: {
      'Director':                 'Thom Throp',
      'Director of Photography':  'Thom Throp',
      'Editor':                   'Thom Throp',
      'Music by':                 'Dogs Don\'t Die',
      'Produced by':              'Dog House',
      'Label':                    'Dog House',
    },
  },
  {
    embed: 'https://youtu.be/oKR3poXCo70',
    title: 'MASK 22',
    cat: 'Music video',
    dur: '03:08',
    credits: {
      'Director':                 'Thom Throp',
      'Director of Photography':  'Thom Throp',
      'Editor':                   'Thom Throp',
      'Music by':                 'Dogs Don\'t Die',
      'Produced by':              'Dog House',
      'Label':                    'Dog House',
    },
  },
  {
    embed: 'https://youtu.be/XARE4CexJ5c',
    title: 'Dandelion Fields Under Neon Lights',
    cat: 'Music video',
    dur: '—',
    credits: {
      'Director':                 'Caleb Baker',
      'Director of Photography':  'Nathan Gidley',
      'Editor':                   'Thom Throp',
      'Music by':                 'Project Pastiche',
      'Produced by':              '',
      'Label':                    '',
    },
  },
]

function ytThumb(embedUrl: string) {
  const m = embedUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (!m) return ''
  return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`
}

function embedUrl(u: string) {
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hd=1&vq=hd1080`
  const vi = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vi) return `https://player.vimeo.com/video/${vi[1]}?autoplay=1`
  return u
}

function watchUrl(u: string) {
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/watch?v=${yt[1]}`
  const vi = u.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vi) return `https://vimeo.com/${vi[1]}`
  return u
}

export default function TapeRack() {
  const [monitor, setMonitor] = useState<{ open: boolean; index: number }>({ open: false, index: 0 })
  const monTcRef = useRef<HTMLSpanElement>(null)

  function openMonitor(i: number) {
    setMonitor({ open: true, index: i })
    document.body.style.overflow = 'hidden'
  }

  function closeMonitor() {
    setMonitor((m) => ({ ...m, open: false }))
    document.body.style.overflow = ''
  }

  function step(dir: number) {
    setMonitor((m) => ({
      open: true,
      index: (m.index + dir + CLIPS.length) % CLIPS.length,
    }))
  }

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!monitor.open) return
      if (e.key === 'Escape') closeMonitor()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [monitor.open])

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

  // GSAP entrance
  useEffect(() => {
    async function animate() {
      const { gsap } = await import('gsap')

      gsap.fromTo('.rack-head .eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' })
      gsap.fromTo('.rack-head h1',       { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: 'power4.out' })
      gsap.fromTo('.rack-head .lead',    { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.7, delay: 0.38, ease: 'power3.out' })

      gsap.utils.toArray<HTMLElement>('.tape').forEach((tape, i) => {
        gsap.fromTo(tape,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5 + i * 0.15, ease: 'power3.out' }
        )
      })
    }
    animate()
  }, [])

  const clip = CLIPS[monitor.index]
  const embed = embedUrl(clip?.embed ?? '')
  const watch = watchUrl(clip?.embed ?? '')

  return (
    <>
      {/* ── Header ── */}
      <section className="rack-head">
        <div className="wrap">
          <p className="eyebrow">Dog House · In-house video &amp; visuals</p>
          <h1 className="poster">The tape <span className="hl">rack.</span></h1>
          <p className="lead">
            Every frame shot, every track recorded, every visual crafted — fully
            in-house. <strong>The music and the visuals are ours, start to finish.</strong> Pick a tape to roll it.
          </p>
        </div>
      </section>

      {/* ── Two-up tape layout ── */}
      <section className="rack">
        <div className="wrap">
          <div className="rack-duo">
            {CLIPS.map((v, i) => (
              <button
                key={i}
                className="tape tape-duo"
                type="button"
                aria-label={`Play ${v.title}`}
                onClick={() => openMonitor(i)}
              >
                <Image
                  src={ytThumb(v.embed)}
                  alt={v.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  priority={i === 0}
                />
                <span className="t-cat">{v.cat}</span>
                <span className="t-play" />
                <span className="t-foot">
                  <span className="t-title">{v.title}</span>
                  <span className="t-dur">⌗ {v.dur}</span>
                </span>
              </button>
            ))}
          </div>
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

            <div
              className={`screen${embed ? ' has-embed' : ''}`}
              style={embed ? { backgroundImage: `url(${ytThumb(clip.embed)})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              <button className="mon-nav mon-prev" type="button" aria-label="Previous clip" onClick={(e) => { e.stopPropagation(); step(-1) }}>←</button>
              <button className="mon-nav mon-next" type="button" aria-label="Next clip" onClick={(e) => { e.stopPropagation(); step(1) }}>→</button>

              {embed && (
                <iframe
                  src={embed}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={clip.title}
                />
              )}

              <div className="osd">
                <span className="rec"><span className="dot" /> PLAY</span>
                <span className="tc" ref={monTcRef}>00:00:00:00</span>
                <span className="lab">{clip.title.toUpperCase()}</span>
              </div>
              <div className="scan-line" />
            </div>

            <div className="mon-bar">
              <span className="mon-count">{String(monitor.index + 1).padStart(2,'0')} / {String(CLIPS.length).padStart(2,'0')}</span>
              <div className="mon-prog"><i style={{ width: `${((monitor.index + 1) / CLIPS.length) * 100}%` }} /></div>
              <span className="mon-count">{clip.dur}</span>
            </div>

            <dl className="mon-credits">
              {Object.entries(clip.credits).map(([role, name]) => (
                <div key={role} className="mon-credits-row">
                  <dt className="mon-credits-role">{role}</dt>
                  <dd className="mon-credits-name">{name || '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  )
}
