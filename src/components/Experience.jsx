import { useLanguage } from '../i18n/LanguageContext'
import { FadeUp, StaggerChildren, StaggerItem } from './Animate'

export default function Experience() {
  const { experience, ui } = useLanguage()

  return (
    <section id="experience" className="section">
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">{ui.experience.eyebrow}</span>
            <h2 className="section-title">{ui.experience.title}</h2>
            <p className="section-sub">{ui.experience.subtitle}</p>
          </div>
        </FadeUp>

        {experience.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>{ui.experience.empty}</p>
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
