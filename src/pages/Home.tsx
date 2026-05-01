import { useState, useMemo, type ReactElement } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import site from '../config/site';
import { sites, categories } from '../data/sites';

const Home = (): ReactElement => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSites = useMemo(() => {
    let result = sites;
    if (activeCategory !== 'all') {
      result = result.filter(s => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.nameKo.includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const activeCategoryInfo = categories.find(c => c.id === activeCategory);

  return (
    <>
      <SEOHead
        title={`${site.name} | ${site.nameKo}`}
        description={site.description}
      />

      {/* Hero */}
      <section className="catalog-hero">
        <div className="container">
          <h1 className="catalog-hero-title">
            {language === 'ko' ? 'DreamIT Biz 전체 사이트 포탈' : 'DreamIT Biz Site Portal'}
          </h1>
          <p className="catalog-hero-subtitle">
            {language === 'ko'
              ? '교육, 경영, IT, 인공지능 등 다양한 분야를 아우르는 종합 교육 플랫폼'
              : 'A comprehensive education platform covering business, AI, coding, and more'}
          </p>

          {/* Stats */}
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-number">{sites.length}</span>
              <span className="stat-label">{language === 'ko' ? '전체 사이트' : 'Total Sites'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length}</span>
              <span className="stat-label">{language === 'ko' ? '카테고리' : 'Categories'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">{language === 'ko' ? '결제 연동' : 'PortOne'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">React 19</span>
              <span className="stat-label">{language === 'ko' ? '기술 스택' : 'Tech Stack'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="catalog-filter-section">
        <div className="container">
          <div className="catalog-search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              className="catalog-search-input"
              placeholder={language === 'ko' ? '사이트 검색...' : 'Search sites...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="catalog-search-clear" onClick={() => setSearchQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          <div className="category-tabs">
            <button
              className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              {language === 'ko' ? `전체 (${sites.length})` : `All (${sites.length})`}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="category-tab-icon">{cat.icon}</span>
                {language === 'ko' ? cat.nameKo : cat.name}
                <span className="category-tab-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Site Cards */}
      <section className="catalog-main">
        <div className="container">
          {activeCategory !== 'all' && activeCategoryInfo && (
            <h2 className="category-heading">
              <span className="category-heading-icon">{activeCategoryInfo.icon}</span>
              {language === 'ko' ? activeCategoryInfo.nameKo : activeCategoryInfo.name}
              <span className="category-heading-count">({filteredSites.length})</span>
            </h2>
          )}

          {filteredSites.length === 0 ? (
            <div className="catalog-empty">
              <p>{language === 'ko' ? '검색 결과가 없습니다.' : 'No results found.'}</p>
            </div>
          ) : (
            <>
              {activeCategory === 'all' ? (
                categories.map(cat => {
                  const catSites = filteredSites.filter(s => s.category === cat.id);
                  if (catSites.length === 0) return null;
                  return (
                    <div key={cat.id} className="category-section" id={`cat-${cat.id}`}>
                      <h2 className="category-heading">
                        <span className="category-heading-icon">{cat.icon}</span>
                        {language === 'ko' ? cat.nameKo : cat.name}
                        <span className="category-heading-count">({catSites.length})</span>
                      </h2>
                      <div className="catalog-grid">
                        {catSites.map(s => (
                          <SiteCard key={s.id} site={s} />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="catalog-grid">
                  {filteredSites.map(s => (
                    <SiteCard key={s.id} site={s} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="catalog-tech-section">
        <div className="container">
          <h2 className="section-title">
            {language === 'ko' ? '기술 스택' : 'Tech Stack'}
          </h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              </div>
              <h3>React 19 + Vite</h3>
              <p>{language === 'ko' ? '최신 React 19와 Vite 빌드 도구로 빠른 개발 경험' : 'Fast development with React 19 and Vite build tool'}</p>
            </div>
            <div className="tech-card">
              <div className="tech-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3>Supabase</h3>
              <p>{language === 'ko' ? 'PostgreSQL + Auth + Edge Functions 백엔드' : 'PostgreSQL + Auth + Edge Functions backend'}</p>
            </div>
            <div className="tech-card">
              <div className="tech-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <h3>TypeScript 5.8</h3>
              <p>{language === 'ko' ? '49개 사이트 완전 마이그레이션 — tsc 0 errors' : '49 sites fully migrated — tsc 0 errors'}</p>
            </div>
            <div className="tech-card">
              <div className="tech-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>GitHub Pages</h3>
              <p>{language === 'ko' ? '전 사이트 GitHub Pages 배포 — *.dreamitbiz.com' : 'All sites deployed via GitHub Pages — *.dreamitbiz.com'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="catalog-info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>{language === 'ko' ? '공통 기능' : 'Common Features'}</h3>
              <ul>
                <li>{language === 'ko' ? '다크/라이트 모드 자동 전환' : 'Dark/Light mode auto switch'}</li>
                <li>{language === 'ko' ? '5색 컬러 테마 (Blue, Red, Green, Purple, Orange)' : '5 color themes (Blue, Red, Green, Purple, Orange)'}</li>
                <li>{language === 'ko' ? '한/영 다국어 전환' : 'Korean/English language switch'}</li>
                <li>{language === 'ko' ? '반응형 디자인 (데스크톱~모바일)' : 'Responsive design (Desktop~Mobile)'}</li>
                <li>{language === 'ko' ? 'Supabase Auth (이메일, Google, Kakao)' : 'Supabase Auth (Email, Google, Kakao)'}</li>
                <li>{language === 'ko' ? '이메일(Resend) + SMS(icode) 알림' : 'Email(Resend) + SMS(icode) notifications'}</li>
              </ul>
            </div>
            <div className="info-card">
              <h3>{language === 'ko' ? '개발 타임라인' : 'Development Timeline'}</h3>
              <ul>
                <li><strong>2025.02.19</strong> — {language === 'ko' ? 'Claude와 함께 개발 시작' : 'Development started with Claude'}</li>
                <li><strong>2026.04.06</strong> — {language === 'ko' ? 'TypeScript 마이그레이션 완료' : 'TypeScript migration complete'}</li>
                <li><strong>2026.04.26</strong> — {language === 'ko' ? 'PortOne FK 수정 (24개 사이트)' : 'PortOne FK fix (24 sites)'}</li>
                <li><strong>2026.04.30</strong> — {language === 'ko' ? '템플릿 v5.1 + CSS 패치 (65개)' : 'Template v5.1 + CSS patch (65 sites)'}</li>
                <li><strong>2026.05.01</strong> — {language === 'ko' ? '87개 사이트 운영 중' : '87 sites in operation'}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

interface SiteCardProps {
  site: { id: string; name: string; nameKo: string; description: string; url: string; features: string[] };
}

const SiteCard = ({ site: s }: SiteCardProps): ReactElement => (
  <a href={s.url} target="_blank" rel="noopener noreferrer" className="site-card">
    <div className="site-card-header">
      <h3 className="site-card-title">{s.name}</h3>
      <span className="site-card-subtitle">{s.nameKo}</span>
    </div>
    <p className="site-card-desc">{s.description}</p>
    {s.features.length > 0 && (
      <div className="site-card-tags">
        {s.features.map(f => (
          <span key={f} className={`site-tag site-tag-${f.toLowerCase()}`}>{f}</span>
        ))}
      </div>
    )}
    <span className="site-card-link">
      {s.url.replace('https://', '')}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </span>
  </a>
);

export default Home;
