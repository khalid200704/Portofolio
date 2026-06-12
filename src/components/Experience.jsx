import { experience, domains } from '../data/portfolio'
import { FadeUp, StaggerChildren, StaggerItem } from './Animate'

export default function Experience() {
  const domainMap = Object.fromEntries(domains.map(d => [d.id, d]))

  return (
    <section id="experience" className="section">
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">History</span>
            <h2 className="section-title">Experience</h2>
            <p className="section-sub">Projects, internships, and roles I've taken on.</p>
          </div>
        </FadeUp>

        {experience.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Pengalaman akan muncul setelah data diisi.</p>
        ) : (
          <StaggerChildren className="exp-list" staggerDelay={0.1}>
            {experience.map((e, i) => {
              return (
                <StaggerItem key={i}>
                  <div className="exp-card">
                    <div style={{ flex: 1 }}>
                      <div className="exp-role">{e.role}</div>
                      <div className="exp-org">{e.org}</div>
                      <div className="exp-meta">{e.duration} · {e.type}</div>
                      {e.description && <p className="exp-desc">{e.description}</p>}
                      {e.achievements?.length > 0 && (
                        <ul className="exp-achievements">
                          {e.achievements.map((a, j) => <li key={j}>{a}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerChildren>
        )}
      </div>
    </section>
  )
}
