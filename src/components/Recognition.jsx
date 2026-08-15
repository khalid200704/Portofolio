import { useLanguage } from '../i18n/LanguageContext'
import Icon from './Icon'
import { FadeUp, StaggerChildren, StaggerItem } from './Animate'

export default function Recognition() {
  const { competitions, certifications, activities, ui } = useLanguage()
  const hasAny = competitions.length > 0 || certifications.length > 0 || activities.length > 0
  if (!hasAny) return null

  return (
    <section id="recognition" className="section">
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">{ui.recognition.eyebrow}</span>
            <h2 className="section-title">{ui.recognition.title}</h2>
            <p className="section-sub">{ui.recognition.subtitle}</p>
          </div>
        </FadeUp>

        {competitions.length > 0 && (
          <div className="recognition-block">
            <FadeUp>
              <h3 className="recognition-subtitle">
                <Icon name="Trophy" size={16} /> {ui.recognition.competitions}
              </h3>
            </FadeUp>
            <StaggerChildren className="exp-list" staggerDelay={0.08}>
              {competitions.map((c, i) => (
                <StaggerItem key={i}>
                  <div className="exp-card">
                    <div style={{ flex: 1 }}>
                      <div className="exp-role">{c.name}</div>
                      <div className="exp-org">{c.role}</div>
                      <div className="exp-meta">{c.org}{c.result && ` · ${c.result}`}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="recognition-block">
            <FadeUp>
              <h3 className="recognition-subtitle">
                <Icon name="Award" size={16} /> {ui.recognition.certifications}
              </h3>
            </FadeUp>
            <FadeUp delay={0.05}>
              <div className="cert-grid">
                {certifications.map((c, i) => (
                  <div key={i} className="cert-chip">
                    <span className="cert-name">{c.name}</span>
                    <span className="cert-meta">{c.issuer}{c.year && ` · ${c.year}`}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        )}

        {activities.length > 0 && (
          <div className="recognition-block">
            <FadeUp>
              <h3 className="recognition-subtitle">
                <Icon name="Users" size={16} /> {ui.recognition.activities}
              </h3>
            </FadeUp>
            <StaggerChildren className="exp-list" staggerDelay={0.08}>
              {activities.map((a, i) => (
                <StaggerItem key={i}>
                  <div className="exp-card">
                    <div style={{ flex: 1 }}>
                      <div className="exp-role">{a.name}</div>
                      <div className="exp-org">{a.role}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        )}
      </div>
    </section>
  )
}
