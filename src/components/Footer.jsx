import { about } from '../data/portfolio'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-brand">{about.name || 'Portfolio'}</div>
        <div className="footer-copy">© {new Date().getFullYear()} · Built with React + Vite</div>
      </div>
    </footer>
  )
}
