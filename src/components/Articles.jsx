import { articles } from '../data/portfolio'
import Icon from './Icon'

const platformIcon = {
  'Medium':   'BookOpen',
  'Dev.to':   'Code2',
  'Hashnode': 'Hash',
  'LinkedIn': 'Linkedin',
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function Articles() {
  if (articles.length === 0) return null

  return (
    <section id="articles" className="section articles-section">
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-label">Writing</span>
          <h2 className="section-title">Articles</h2>
          <p className="section-sub">Things I've written about engineering, tech, and projects.</p>
        </div>

        <div className="articles-grid">
          {articles.map(a => (
            <a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-card"
            >
              {a.cover && (
                <div className="article-cover">
                  <img src={a.cover} alt={a.title} />
                </div>
              )}
              <div className="article-body">
                <div className="article-meta">
                  <span className="article-platform">
                    <Icon name={platformIcon[a.platform] || 'FileText'} size={12} />
                    {a.platform}
                  </span>
                  {a.date && <span className="article-date">{formatDate(a.date)}</span>}
                </div>
                <div className="article-title">{a.title}</div>
                {a.excerpt && <p className="article-excerpt">{a.excerpt}</p>}
                {a.tags?.length > 0 && (
                  <div className="article-tags">
                    {a.tags.map(t => <span key={t} className="article-tag">{t}</span>)}
                  </div>
                )}
                <span className="article-read">
                  Read article <Icon name="ArrowUpRight" size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
