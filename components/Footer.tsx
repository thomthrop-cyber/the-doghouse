'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true" />
        <div
          className="foot-word glitch"
          data-reveal="wipe"
          data-text="DOGHOUSE"
        >
          DOGHOUSE
        </div>
        <div className="foot-row" data-reveal style={{ ['--rd' as string]: '120ms' }}>
          <span>
            © {year} The Doghouse — visual promotion &amp; independent label
          </span>
          <div className="foot-social">
            <a href="https://instagram.com/thom.o_o/" target="_blank" rel="noopener">
              Instagram ↗
            </a>
            <a href="#" target="_blank" rel="noopener">
              YouTube ↗
            </a>
            <a href="mailto:doghousethom@gmail.com">
              doghousethom@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
