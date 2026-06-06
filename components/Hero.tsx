export default function Hero() {
  return (
    <section className="hero" data-screen-label="Doghouse Hero">
      <div className="hero-bg empty" id="heroBg" />
      <div className="wrap hero-in">
        <div className="eyebrow" data-reveal style={{ ['--rd' as string]: '0ms' }}>
          Visual promotion · Independent label · Est. Dog House
        </div>
        <h1
          className="poster glitch"
          data-reveal="wipe"
          style={{ ['--rd' as string]: '80ms' }}
          data-text={'DOG\nHOUSE'}
        >
          DOG<br />
          <span className="l2">HOUSE</span>
        </h1>
        <div className="hero-sub" data-reveal style={{ ['--rd' as string]: '220ms' }}>
          <p>
            A label through the lens of a camera. We market artists through visual
            promotion, release the music, and shoot it all in-house — Bringing the
            platform to life.
          </p>
        </div>
        <div className="scroll-cue" data-reveal style={{ ['--rd' as string]: '340ms' }}>
          Roll tape — scroll
        </div>
      </div>
    </section>
  )
}
