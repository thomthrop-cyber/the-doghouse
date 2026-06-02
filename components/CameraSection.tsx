'use client'

import { useEffect, useRef } from 'react'

export default function CameraSection() {
  const stageRef = useRef<HTMLAnchorElement>(null)
  const modelRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    modelRef.current = stage.querySelector('model-viewer')

    // Start rotating on hover, stop when mouse leaves
    const onEnter = () => {
      modelRef.current?.setAttribute('auto-rotate', '')
    }
    const onLeave = () => {
      modelRef.current?.removeAttribute('auto-rotate')
    }

    // Prevent link navigation when user was dragging to orbit
    let startX = 0, startY = 0, dragging = false
    const onDown = (e: MouseEvent | TouchEvent) => {
      const point = 'touches' in e ? e.touches[0] : e
      startX = point.clientX
      startY = point.clientY
      dragging = false
    }
    const onMove = (e: MouseEvent | TouchEvent) => {
      const point = 'touches' in e ? e.touches[0] : e
      if (Math.abs(point.clientX - startX) > 4 || Math.abs(point.clientY - startY) > 4) {
        dragging = true
      }
    }
    const onClick = (e: MouseEvent) => {
      if (dragging) e.preventDefault()
    }

    stage.addEventListener('mouseenter', onEnter)
    stage.addEventListener('mouseleave', onLeave)
    stage.addEventListener('mousedown', onDown)
    stage.addEventListener('mousemove', onMove)
    stage.addEventListener('click', onClick)
    stage.addEventListener('touchstart', onDown, { passive: true })
    stage.addEventListener('touchmove', onMove, { passive: true })

    return () => {
      stage.removeEventListener('mouseenter', onEnter)
      stage.removeEventListener('mouseleave', onLeave)
      stage.removeEventListener('mousedown', onDown)
      stage.removeEventListener('mousemove', onMove)
      stage.removeEventListener('click', onClick)
      stage.removeEventListener('touchstart', onDown)
      stage.removeEventListener('touchmove', onMove)
    }
  }, [])

  return (
    <section className="sec sec-line" id="camera" data-screen-label="The Camera">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="kicker" data-reveal style={{ ['--rd' as string]: '0ms' }}>
              [ 03 — The camera ]
            </p>
            <h2
              className="poster"
              data-reveal="wipe"
              style={{ ['--rd' as string]: '90ms' }}
            >
              Spin the camera<span style={{ color: 'var(--acc)' }}>.</span>
            </h2>
          </div>
          <p className="rt" data-reveal style={{ ['--rd' as string]: '200ms' }}>
            Our custom Sony DCR-HC24E, photo-scanned in 3D. Drag to orbit it —
            then click to roll the video portfolio.
          </p>
        </div>

        <a
          className="cam-stage"
          id="camStage"
          data-reveal
          style={{ ['--rd' as string]: '120ms' }}
          href="/portfolio"
          aria-label="Open the video portfolio"
          ref={stageRef}
        >
          <div className="scan-x" />
          {/* @ts-expect-error model-viewer is a web component loaded via CDN */}
          <model-viewer
            id="camModel"
            src="/camera-scan.glb"
            camera-controls
            touch-action="pan-y"
            rotation-per-second="22deg"
            interaction-prompt="none"
            shadow-intensity="0"
            exposure="1.1"
            disable-zoom
            style={{ width: '100%', height: '100%', background: 'transparent' }}
          />
          <div className="cam-hud">
            <span className="t mono">DCR-HC24E</span>
            <span className="r mono">● 3D SCAN</span>
            <span className="drag-hint mono">⟲ drag to orbit</span>
          </div>
          <span className="cam-cta mono">▶ Click to enter the video portfolio</span>
        </a>
      </div>
    </section>
  )
}
