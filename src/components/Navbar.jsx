import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { about } from '../data/portfolio'
import Icon from './Icon'

const NAV_LINKS = [
  { label: 'Projects',   hash: '#projects'   },
  { label: 'Skills',     hash: '#skills'     },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact',    hash: '#contact'    },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)

  const href = (hash) => isHome ? hash : `/${hash}`
  const close = () => setOpen(false)

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="nav-logo" onClick={close}>{about.name || 'Portfolio'}</Link>

          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={href(l.hash)}>{l.label}</a>
            ))}
          </div>

          <div className="nav-right">
            <a href={`mailto:${about.email}`} className="nav-cta">
              <Icon name="Mail" size={14} /> Get in touch
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
              <a key={l.label} href={href(l.hash)} className="nav-mobile-link" onClick={close}>
                {l.label}
              </a>
            ))}
            <a href={`mailto:${about.email}`} className="nav-mobile-link nav-mobile-cta" onClick={close}>
              <Icon name="Mail" size={14} /> Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
