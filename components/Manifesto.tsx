export default function Manifesto() {
  return (
    <section className="sec sec-line" data-screen-label="Manifesto">
      <div className="wrap">
        <p className="kicker" data-reveal style={{ marginBottom: '26px', ['--rd' as string]: '0ms' }}>
          [ 01 — What this is ]
        </p>
        <h2
          className="manifesto"
          data-reveal="wipe"
          style={{ ['--rd' as string]: '90ms' }}
        >
          We don&apos;t grow accounts. We build{' '}
          <span className="hl">scenes</span>, on camera, then put them back into the room.
        </h2>
        <p className="m-note" data-reveal style={{ ['--rd' as string]: '240ms' }}>
          Popularity propagates popularity — but views are shallow on their own. Dog House converts online attention into localised support for artists,
          communities and the arts. Documentation gives the work weight; the work
          gives the community a reason to show up.
        </p>
      </div>
    </section>
  )
}
