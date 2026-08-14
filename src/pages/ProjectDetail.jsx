import { useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { projects, domains } from '../data/portfolio'
import Icon from '../components/Icon'
import Navbar from '../components/Navbar'
import { FadeUp, StaggerChildren, StaggerItem } from '../components/Animate'
import ProjectDiagram from '../components/ProjectDiagram'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Abdullah Khalid Fadillah`
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', project.description)
    }
  }, [project])

  if (!project) return <Navigate to="/" replace />

  const domain = domains.find(d => d.id === project.domain)
  const d = project.details

  return (
    <motion.div
      className="project-detail-page"
      key={project.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />

      {/* Back nav */}
      <div className="detail-back">
        <div className="container">
          <Link to="/" className="detail-back-link">
            <Icon name="ArrowLeft" size={14} />
            All Projects
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="detail-hero">
        <div className="container">
          <motion.div
            className="detail-domain-chip"
            style={{ color: domain?.color, borderColor: domain?.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Icon name={domain?.icon} size={13} />
            {domain?.label}
          </motion.div>
          <motion.h1
            className="detail-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            className="detail-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="detail-meta-row">
              {project.year && (
                <span className="detail-meta-item">
                  <Icon name="Calendar" size={13} />
                  {project.year}
                </span>
              )}
              {d?.duration && (
                <span className="detail-meta-item">
                  <Icon name="Clock" size={13} />
                  {d.duration}
                </span>
              )}
            </div>

            <div className="detail-tech-row">
              {(project.tech || []).map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            <div className="detail-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Icon name="Github" size={15} />
                  View on GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <Icon name="ExternalLink" size={15} />
                  Live Demo
                </a>
              )}
              {project.extraLinks?.map(link => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <Icon name="Bot" size={15} />
                  {link.label}
                </a>
              ))}
            </div>
            {d?.demoNote && (
              <p className="detail-demo-note">{d.demoNote}</p>
            )}
          </motion.div>
        </div>
      </header>

      {/* Content */}
      {d && (
        <main className="detail-content">
          <div className="container detail-grid">
            {/* Main column */}
            <div className="detail-main">
              {d.overview && (
                <FadeUp>
                  <section className="detail-section">
                    <h2 className="detail-section-title">Overview</h2>
                    <p>{d.overview}</p>
                  </section>
                </FadeUp>
              )}

              {d.problem && (
                <FadeUp delay={0.05}>
                  <section className="detail-section">
                    <h2 className="detail-section-title">Problem</h2>
                    <p>{d.problem}</p>
                  </section>
                </FadeUp>
              )}

              {d.approach && (
                <FadeUp delay={0.05}>
                  <section className="detail-section">
                    <h2 className="detail-section-title">Approach</h2>
                    <p>{d.approach}</p>
                  </section>
                </FadeUp>
              )}

              <FadeUp delay={0.05}>
                <section className="detail-section">
                  <h2 className="detail-section-title">System Architecture</h2>
                  <div className="detail-diagram">
                    <ProjectDiagram projectId={project.id} color={domain?.color} />
                  </div>
                </section>
              </FadeUp>

              {d.steps?.length > 0 && (
                <FadeUp delay={0.05}>
                  <section className="detail-section">
                    <h2 className="detail-section-title">Implementation</h2>
                    <StaggerChildren tag="ol" className="detail-steps" staggerDelay={0.08}>
                      {d.steps.map((step, i) => (
                        <StaggerItem key={i}>
                          <li className="detail-step" style={{ listStyle: 'none' }}>
                            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                            <div>
                              <div className="step-title">{step.title}</div>
                              <p className="step-body">{step.body}</p>
                            </div>
                          </li>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>
                  </section>
                </FadeUp>
              )}

              {d.results && (
                <FadeUp delay={0.05}>
                  <section className="detail-section">
                    <h2 className="detail-section-title">Results</h2>
                    <div className="detail-results">
                      <Icon name="TrendingUp" size={18} />
                      <p>{d.results}</p>
                    </div>
                  </section>
                </FadeUp>
              )}
            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="detail-sidebar-card">
                <div className="sidebar-label">Domain</div>
                <div className="sidebar-value domain-chip" style={{ color: domain?.color }}>
                  <Icon name={domain?.icon} size={13} />
                  {domain?.label}
                </div>
              </div>
              <div className="detail-sidebar-card">
                <div className="sidebar-label">Year</div>
                <div className="sidebar-value">{project.year}</div>
              </div>
              {d.duration && (
                <div className="detail-sidebar-card">
                  <div className="sidebar-label">Duration</div>
                  <div className="sidebar-value">{d.duration}</div>
                </div>
              )}
              <div className="detail-sidebar-card">
                <div className="sidebar-label">Tech Stack</div>
                <div className="sidebar-tech">
                  {(project.tech || []).map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Gallery */}
          {d.gallery?.length > 0 && (
            <div className="container">
              <section className="detail-section">
                <h2 className="detail-section-title">Gallery</h2>
                <div className="detail-gallery">
                  {d.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} className="gallery-img" />
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      )}

      {/* Footer nav */}
      <div className="detail-footer-nav">
        <div className="container">
          <Link to="/#projects" className="btn btn-outline">
            <Icon name="ArrowLeft" size={14} />
            Back to All Projects
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
