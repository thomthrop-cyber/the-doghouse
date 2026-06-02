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

      // Accumulated rotation — no limits on theta so full 360+ is possible
      let targetTheta = 0
      let targetPhi   = 82    // clamped 30–130 so it doesn't flip upside down
      let currTheta   = 0
      let currPhi     = 82
      let lastX       = 0
      let lastY       = 0
      let rafId: number

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t

      const tick = () => {
        currTheta = lerp(currTheta, targetTheta, 0.18)
        currPhi   = lerp(currPhi,   targetPhi,   0.18)
        mv.cameraOrbit = `${currTheta.toFixed(3)}deg ${currPhi.toFixed(3)}deg auto`
        rafId = requestAnimationFrame(tick)
      }

      rafId = requestAnimationFrame(tick)

      const onEnter = (e: MouseEvent) => {
        // Seed last position so first move doesn't jump
        lastX = e.clientX
        lastY = e.clientY
      }

      const onMove = (e: MouseEvent) => {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        lastX = e.clientX
        lastY = e.clientY

        targetTheta += dx * 0.65                                      // fast horizontal — full 360 easy
        targetPhi    = Math.max(30, Math.min(130, targetPhi + dy * 0.35)) // vertical clamped
      }

      stage.addEventListener('mouseenter', onEnter)
      stage.addEventListener('mousemove', onMove)

      return () => {
        cancelAnimationFrame(rafId)
        stage.removeEventListener('mouseenter', onEnter)
        stage.removeEventListener('mousemove', onMove)
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
            <span className="drag-hint mono">⟵ move to orbit</span>
          </div>
          <span className="cam-cta mono">▶ Click to enter the video portfolio</span>
        </a>
      </div>
    </section>
  )
}
