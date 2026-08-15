import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../i18n/LanguageContext'
import Icon from './Icon'

export default function Navbar() {
  const { about, ui, locale, toggleLocale } = useLanguage()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)

  const NAV_LINKS = [
    { label: ui.nav.projects,    hash: '#projects'    },
    { label: ui.nav.skills,      hash: '#skills'      },
    { label: ui.nav.experience,  hash: '#experience'  },
    { label: ui.nav.recognition, hash: '#recognition' },
    { label: ui.nav.contact,     hash: '#contact'     },
  ]

  const href = (hash) => isHome ? hash : `/${hash}`
  const close = () => setOpen(false)

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="nav-logo" onClick={close}>{about.name || 'Portfolio'}</Link>

          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.hash} href={href(l.hash)}>{l.label}</a>
            ))}
          </div>

          <div className="nav-right">
            <button className="nav-lang-toggle" onClick={toggleLocale} aria-label="Switch language">
              <Icon name="Languages" size={14} />
              {ui.langToggle}
            </button>
            <a href={`mailto:${about.email}`} className="nav-cta">
              <Icon name="Mail" size={14} /> {ui.nav.getInTouch}
            </a>
            <button
              className="nav-hamburger"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <Icon name={open ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {NAV_LINKS.map(l => (
              <a key={l.hash} href={href(l.hash)} className="nav-mobile-link" onClick={close}>
                {l.label}
              </a>
            ))}
            <button className="nav-mobile-link nav-mobile-cta" onClick={() => { toggleLocale(); close() }}>
              {locale === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
            </button>
            <a href={`mailto:${about.email}`} className="nav-mobile-link nav-mobile-cta" onClick={close}>
              <Icon name="Mail" size={14} /> {ui.nav.getInTouch}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
