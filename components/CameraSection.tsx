'use client'

import { useEffect, useRef } from 'react'

export default function CameraSection() {
  const stageRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    // Wait for model-viewer custom element to be defined
    customElements.whenDefined('model-viewer').then(() => {
      const mv = stage.querySelector('model-viewer') as any
      if (!mv) return

      // Lerped camera state
      let targetTheta = 0     // left ↔ right rotation (degrees)
      let targetPhi   = 82    // up ↕ down elevation (degrees, 90 = equator)
      let currTheta   = 0
      let currPhi     = 82
      let rafId: number

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t

      const tick = () => {
        currTheta = lerp(currTheta, targetTheta, 0.055)
        currPhi   = lerp(currPhi,   targetPhi,   0.055)
        mv.cameraOrbit = `${currTheta.toFixed(3)}deg ${currPhi.toFixed(3)}deg auto`
        rafId = requestAnimationFrame(tick)
      }

      // Start loop immediately so the return-to-centre after hover is smooth
      rafId = requestAnimationFrame(tick)

      const onMove = (e: MouseEvent) => {
        const r = stage.getBoundingClientRect()
        const x = (e.clientX - r.left)  / r.width   // 0 → 1
        const y = (e.clientY - r.top)   / r.height  // 0 → 1
        targetTheta = (x - 0.5) * 70   // ±35 deg horizontal
        targetPhi   = 82 + (y - 0.5) * 28 // 68–96 deg vertical
      }

      const onLeave = () => {
        // Drift back to front-facing centre
        targetTheta = 0
        targetPhi   = 82
      }

      stage.addEventListener('mousemove', onMove)
      stage.addEventListener('mouseleave', onLeave)

      return () => {
        cancelAnimationFrame(rafId)
        stage.removeEventListener('mousemove', onMove)
        stage.removeEventListener('mouseleave', onLeave)
      }
    })
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
            Our custom Sony DCR-HC24E, photo-scanned in 3D. Move your mouse over
            it — then click to roll the video portfolio.
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
            interaction-prompt="none"
            shadow-intensity="0"
            exposure="1.1"
            style={{ width: '100%', height: '100%', background: 'transparent', pointerEvents: 'none' }}
          />
          <div className="cam-hud">
            <span className="t mono">DCR-HC24E</span>
            <span className="r mono">● 3D SCAN</span>
            <span className="drag-hint mono">⟵ move mouse to orbit</span>
          </div>
          <span className="cam-cta mono">▶ Click to enter the video portfolio</span>
        </a>
      </div>
    </section>
  )
}
