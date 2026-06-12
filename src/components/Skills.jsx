import { skills, domains } from '../data/portfolio'
import Icon from './Icon'
import { FadeUp, StaggerChildren, StaggerItem } from './Animate'

export default function Skills() {
  const domainMap = Object.fromEntries(domains.map(d => [d.label, d]))
  const entries = Object.entries(skills)

  return (
    <section id="skills" className="section">
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">Toolkit</span>
            <h2 className="section-title">Skills</h2>
            <p className="section-sub">Technologies and tools I use across domains.</p>
          </div>
        </FadeUp>

        {entries.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>Skills akan muncul setelah data diisi.</p>
        ) : (
          <StaggerChildren className="skills-grid" staggerDelay={0.08}>
            {entries.map(([domain, categories]) => {
              const d = domainMap[domain]
              return (
                <StaggerItem key={domain}>
                  <div className="skill-card" style={{ borderTopColor: d?.color || 'var(--hairline)', borderTopWidth: '3px', borderTopStyle: 'solid' }}>
                    <div className="skill-card-title">
                      <Icon name={d?.icon} size={15} />
                      {domain}
                    </div>
                    {Object.entries(categories).map(([cat, items]) =>
                      Array.isArray(items) && items.length > 0 && (
                        <div key={cat} className="skill-group">
                          <div className="skill-group-label">{cat}</div>
                          <div className="skill-tags">
                            {items.map(item => <span key={item} className="skill-tag">{item}</span>)}
                          </div>
                        </div>
                      )
                    )}
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
