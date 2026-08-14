import { Link } from 'react-router-dom'
import { hardwareDesigns } from '../data/portfolio'
import Icon from './Icon'
import { FadeUp, StaggerChildren, StaggerItem } from './Animate'

export default function HardwareGallery() {
  if (hardwareDesigns.length === 0) return null

  return (
    <section id="hardware" className="section" style={{ background: 'var(--stone)' }}>
      <div className="container">
        <FadeUp>
          <div style={{ marginBottom: '2.5rem' }}>
            <span className="section-label">Schematics</span>
            <h2 className="section-title">Hardware & PCB Design</h2>
            <p className="section-sub">Skematik dan desain PCB yang saya buat di EasyEDA.</p>
          </div>
        </FadeUp>

        <StaggerChildren className="hw-grid" staggerDelay={0.08}>
          {hardwareDesigns.map(hw => (
            <StaggerItem key={hw.id}>
              <div className="hw-card">
                <div className="hw-card-image">
                  {hw.image
                    ? <img src={hw.image} alt={hw.title} />
                    : <Icon name="CircuitBoard" size={28} />
                  }
                </div>
                <div className="hw-card-title">{hw.title}</div>
                <p className="hw-card-desc">{hw.description}</p>
                <div className="card-tech">
                  {(hw.tech || []).map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                {hw.projectId && (
                  <Link to={`/projects/${hw.projectId}`} className="card-read-more" style={{ marginTop: '0.75rem' }}>
                    Lihat proyek <Icon name="ArrowRight" size={13} />
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
