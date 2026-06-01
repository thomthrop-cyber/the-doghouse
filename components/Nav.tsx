export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top">
          <span className="mark" aria-hidden="true" />
          The Doghouse
        </a>
        <nav className="nav-links">
          <a href="#camera">The camera</a>
          <a href="#">Portfolio</a>
        </nav>
        <a className="cross" href="#">
          Thom Throp · Music ↗
        </a>
      </div>
    </header>
  )
}
