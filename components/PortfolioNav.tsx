import Link from 'next/link'

export default function PortfolioNav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" href="/">
          <span className="mark" aria-hidden="true" />
          Dog House
        </Link>
        <nav className="nav-links">
          <Link href="/#camera">The camera</Link>
          <Link href="/">Home</Link>
        </nav>
        <Link className="cross" href="/">← Back to site</Link>
      </div>
    </header>
  )
}
