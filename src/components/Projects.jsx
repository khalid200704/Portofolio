import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import Icon from './Icon'
import ProjectVisual from './ProjectVisual'
import { FadeUp, StaggerChildren, StaggerItem } from './Animate'

export default function Projects() {
  const { projects, domains, ui } = useLanguage()
  const [active, setActive] = useState('all')
  const filtered = (active === 'all' ? projects : projects.filter(p => p.domain === active))
    .slice()
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
  const domainMap = Object.fromEntries(domains.map(d => [d.id, d]))

  return (
    <section id="projects" className="section">
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">{ui.projects.eyebrow}</span>
            <h2 className="section-title">{ui.projects.title}</h2>
            <p className="section-sub">{ui.projects.subtitle}</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="filter-row">
            <button className={`filter-btn ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>
              {ui.projects.all}
            </button>
            {domains.map(d => (
              <button
                key={d.id}
                className={`filter-btn ${active === d.id ? 'active' : ''}`}
                onClick={() => setActive(d.id)}
              >
                <Icon name={d.icon} size={13} />
                {d.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <StaggerChildren className="projects-grid" staggerDelay={0.07}>
          {filtered.length === 0 ? (
            <div className="empty-state"><p>{ui.projects.empty}</p></div>
          ) : filtered.map(p => {
            const d = domainMap[p.domain]
            return (
              <StaggerItem key={p.id}>
                <div className="project-card" style={{ borderTopColor: d?.color }}>
                  <Link to={`/projects/${p.id}`} className="card-stretched-link" aria-label={p.title} />
                  {p.featured && <span className="card-featured-badge">★</span>}
                  <div className="project-image">
                    {p.image
                      ? <img src={p.image} alt={p.title} />
                      : <ProjectVisual projectId={p.id} color={d?.color} />
                    }
                  </div>
                  <div className="card-domain" style={{ color: d?.color }}>
                    <Icon name={d?.icon} size={12} />
                    {d?.label}
                  </div>
                  <div className="card-title">{p.title}</div>
                  <div className="card-desc">{p.description}</div>
                  <div className="card-tech">
                    {(p.tech || []).map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  <div className="card-footer">
                    <span className="card-read-more">
                      {ui.projects.readMore} <Icon name="ArrowRight" size={13} />
                    </span>
                    {(p.github || p.demo) && (
                      <div className="card-links">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-link">
                            <Icon name="Github" size={13} /> {ui.projects.github}
                          </a>
                        )}
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noopener noreferrer" className="card-link">
                            <Icon name="ExternalLink" size={13} /> {ui.projects.demo}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </div>
    </section>
  )
}
