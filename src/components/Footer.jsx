import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { about, ui } = useLanguage()
  return (
    <footer>
      <div className="container">
        <div className="footer-brand">{about.name || 'Portfolio'}</div>
        <div className="footer-copy">© {new Date().getFullYear()} · {ui.footer.builtWith}</div>
      </div>
    </footer>
  )
}
