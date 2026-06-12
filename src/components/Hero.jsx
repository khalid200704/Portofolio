import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { about, domains } from '../data/portfolio'
import Icon from './Icon'

const ROLES = [
  "Embedded System & IoT Engineer",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Hardware & Software Engineer",
]

const BUBBLE_POSITIONS = [
  { top: '2%',   left: '8%',   floatY: 7,  duration: 4.2, delay: 0    },
  { top: '16%',  left: '54%',  floatY: 9,  duration: 3.8, delay: 0.4  },
  { top: '38%',  left: '0%',   floatY: 6,  duration: 5.0, delay: 0.2  },
  { top: '50%',  left: '50%',  floatY: 10, duration: 4.5, delay: 0.6  },
  { top: '70%',  left: '10%',  floatY: 8,  duration: 3.6, delay: 0.1  },
  { top: '80%',  left: '52%',  floatY: 7,  duration: 4.8, delay: 0.35 },
]

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden>
      {/* decorative bg rings */}
      <div className="hero-visual-ring hero-visual-ring-1" />
      <div className="hero-visual-ring hero-visual-ring-2" />

      {domains.map((d, i) => {
        const pos = BUBBLE_POSITIONS[i]
        return (
          <motion.div
            key={d.id}
            className="hero-bubble-wrap"
            style={{ top: pos.top, left: pos.left }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="hero-bubble"
              style={{ '--bubble-color': d.color }}
              animate={{ y: [-pos.floatY / 2, pos.floatY / 2, -pos.floatY / 2] }}
              transition={{ duration: pos.duration, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
            >
              <span className="hero-bubble-icon" style={{ color: d.color }}>
                <Icon name={d.icon} size={15} />
              </span>
              <span className="hero-bubble-label">{d.label}</span>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const hasPhoto = Boolean(about.avatar)
  const nameWords = (about.name || 'Your Name').split(' ')

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" className="hero section">
      <div className="hero-bg" aria-hidden />

      <div className="container">
        <div className="hero-layout">
          {/* ── Left: text ── */}
          <div className="hero-inner">

            {/* Cycling role */}
            <div className="hero-eyebrow-wrap">
              <span className="hero-eyebrow-location">{about.location}</span>
              <span className="hero-eyebrow-dot">·</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  className="hero-eyebrow-role"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Name — word by word */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
              }}
            >
              {nameWords.map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', marginRight: '0.22em' }}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotate: 2 },
                    visible: {
                      opacity: 1, y: 0, rotate: 0,
                      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="hero-bio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.52 }}
            >
              {about.tagline}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.64 }}
            >
              <a href="#projects" className="btn btn-primary">View Projects</a>
              {about.linkedin && (
                <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="hero-secondary">
                  LinkedIn <Icon name="ArrowUpRight" size={14} />
                </a>
              )}
              {about.github && (
                <a href={about.github} target="_blank" rel="noopener noreferrer" className="hero-secondary">
                  GitHub <Icon name="ArrowUpRight" size={14} />
                </a>
              )}
            </motion.div>

            {/* Domain chips */}
            <motion.div
              className="hero-domains"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.82 }}
            >
              {domains.map((d, i) => (
                <motion.span
                  key={d.id}
                  className="domain-chip"
                  style={{ borderColor: d.color, color: d.color }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.82 + i * 0.07 }}
                >
                  <Icon name={d.icon} size={13} />
                  {d.label}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: photo or visual ── */}
          {hasPhoto ? (
            <motion.div
              className="hero-photo-wrap"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              <div className="hero-photo-card">
                <img src={about.avatar} alt={about.name} className="hero-photo" />
              </div>
            </motion.div>
          ) : (
            <HeroVisual />
          )}
        </div>
      </div>
    </section>
  )
}
