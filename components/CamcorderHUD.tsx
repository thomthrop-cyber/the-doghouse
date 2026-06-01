'use client'

import { useEffect, useRef, useState } from 'react'

export default function CamcorderHUD() {
  const tcRef = useRef<HTMLDivElement>(null)
  const [year, setYear] = useState('')

  useEffect(() => {
    setYear(String(new Date().getFullYear()))

    let frame = 0
    const interval = setInterval(() => {
      frame++
      const ff = frame % 25
      const totalSec = Math.floor(frame / 25)
      const ss = totalSec % 60
      const mm = Math.floor(totalSec / 60) % 60
      const hh = Math.floor(totalSec / 3600)
      if (tcRef.current) {
        tcRef.current.textContent =
          String(hh).padStart(2, '0') + ':' +
          String(mm).padStart(2, '0') + ':' +
          String(ss).padStart(2, '0') + ':' +
          String(ff).padStart(2, '0')
      }
    }, 40)

    return () => clearInterval(interval)
  }, [])

  const today = new Date()
  const dateStr = 'SP  ' + String(today.getDate()).padStart(2, '0') + ' ' +
    today.toLocaleString('en-GB', { month: 'short' }).toUpperCase() + ' ' +
    today.getFullYear()

  return (
    <div className="hud" aria-hidden="true">
      <span className="corner c-tl" />
      <span className="corner c-tr" />
      <span className="corner c-bl" />
      <span className="corner c-br" />

      <div className="rec">
        <span className="dot" />
        {' '}REC
      </div>

      <div className="tc" ref={tcRef}>00:00:00:00</div>

      <div className="batt">
        <span className="cell"><i /></span> 76%
      </div>

      <div className="stamp">{dateStr}</div>
    </div>
  )
}
