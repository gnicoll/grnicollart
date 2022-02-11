import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Graeme Nicoll</span>
              <span>art</span>
            </h1>
            <h2>a real therapy</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 g.r.nicoll</p>
      </footer>
    </div>
  )
}