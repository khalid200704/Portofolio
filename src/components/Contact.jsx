import { motion } from 'motion/react'
import { about } from '../data/portfolio'
import Icon from './Icon'

export default function Contact() {
  return (
    <section id="contact" className="contact-band">
      <div className="container">
        <div className="contact-inner">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's build something together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Open to collaborations, internships, and interesting engineering projects.
          </motion.p>
          <motion.div
            className="contact-links"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {about.email && (
              <a href={`mailto:${about.email}`} className="btn btn-primary" style={{ background: '#fff', color: '#17171c' }}>
                <Icon name="Mail" size={15} /> Email Me
              </a>
            )}
            {about.linkedin && (
              <a href={about.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                <Icon name="Linkedin" size={15} /> LinkedIn
              </a>
            )}
            {about.github && (
              <a href={about.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                <Icon name="Github" size={15} /> GitHub
              </a>
            )}
            {about.huggingface && (
              <a href={about.huggingface} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                <Icon name="Bot" size={15} /> HuggingFace
              </a>
            )}
            {about.medium && (
              <a href={about.medium} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                <Icon name="BookOpen" size={15} /> Medium
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
