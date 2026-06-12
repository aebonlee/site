import { useState, type ReactElement } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import { showcaseGroups, totalShowcaseCount, type ShowcaseGroup, type ShowcaseItem } from '../data/showcase';
import { sites } from '../data/sites';

/** 그룹과 연결된 본 강의 사이트(sites.ts) 정보 */
const courseOf = (id: string) => sites.find(s => s.id === id);

const Showcase = (): ReactElement => {
  const { language } = useLanguage();
  const [activeGroup, setActiveGroup] = useState<string>(showcaseGroups[0]?.id ?? '');

  const group = showcaseGroups.find(g => g.id === activeGroup) ?? showcaseGroups[0];

  return (
    <>
      <SEOHead
        title={language === 'ko' ? '실습 결과물 쇼케이스' : 'Project Showcase'}
        description={language === 'ko'
          ? `수강생이 직접 기획·구현한 실습 결과물 ${totalShowcaseCount}개를 과정별로 모았습니다.`
          : `${totalShowcaseCount} student projects built across our courses.`}
        path="/showcase"
      />

      {/* Hero */}
      <section className="catalog-hero showcase-hero">
        <div className="hero-dot" />
        <div className="hero-dot" />
        <div className="hero-dot" />
        <div className="container">
          <h1 className="catalog-hero-title">
            {language === 'ko' ? (
              <>수강생 <span className="hero-title-highlight">실습 결과물 {totalShowcaseCount}개</span></>
            ) : (
              <><span className="hero-title-highlight">{totalShowcaseCount} Projects</span> by Our Learners</>
            )}
          </h1>
          <p className="catalog-hero-subtitle">
            {language === 'ko'
              ? '강의에서 끝나지 않습니다 — 수강생이 직접 기획하고 배포까지 마친 실전 결과물을 과정별로 모았습니다.'
              : 'Real, deployed projects designed and built by our learners — grouped by course.'}
          </p>

          <div className="stats-bar">
            <div className="stat-card">
              <span className="stat-card-icon">🚀</span>
              <span className="stat-number">{totalShowcaseCount}</span>
              <span className="stat-label">{language === 'ko' ? '실습 결과물' : 'Projects'}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon">📦</span>
              <span className="stat-number">{showcaseGroups.length}</span>
              <span className="stat-label">{language === 'ko' ? '과정 그룹' : 'Course Groups'}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon">🌐</span>
              <span className="stat-number">{showcaseGroups.reduce((n, g) => n + g.items.filter(i => i.tech !== 'streamlit').length, 0)}</span>
              <span className="stat-label">{language === 'ko' ? '웹 앱' : 'Web Apps'}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card-icon">📊</span>
              <span className="stat-number">{showcaseGroups.reduce((n, g) => n + g.items.filter(i => i.tech === 'streamlit').length, 0)}</span>
              <span className="stat-label">{language === 'ko' ? 'Streamlit' : 'Streamlit'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Group tabs */}
      <section className="showcase-main">
        <div className="container">
          <div className="showcase-tabs">
            {showcaseGroups.map(g => (
              <button
                key={g.id}
                className={`showcase-tab${activeGroup === g.id ? ' active' : ''}`}
                onClick={() => setActiveGroup(g.id)}
              >
                <span className="showcase-tab-name">{g.nameKo}</span>
                <span className="showcase-tab-count">{g.items.length}</span>
              </button>
            ))}
          </div>

          {group && <GroupPanel group={group} language={language} />}
        </div>
      </section>
    </>
  );
};

interface GroupPanelProps {
  group: ShowcaseGroup;
  language: string;
}

const GroupPanel = ({ group, language }: GroupPanelProps): ReactElement => {
  const course = courseOf(group.course);
  return (
    <div className="showcase-group">
      <div className="showcase-group-header">
        <div className="showcase-group-meta">
          <h2 className="showcase-group-title">
            {language === 'ko' ? group.nameKo : group.nameEn}
            <span className="showcase-group-count">{group.items.length}</span>
          </h2>
          <p className="showcase-group-desc">{group.description}</p>
          <div className="showcase-group-badges">
            {group.client && <span className="showcase-badge showcase-badge-client">🏢 {group.client}</span>}
            {course && (
              <a href={course.url} target="_blank" rel="noopener noreferrer" className="showcase-badge showcase-badge-course">
                🎓 {language === 'ko' ? course.nameKo : course.name}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {group.subgroups.map(sub => {
        const items = group.items.filter(i => i.subgroup === sub.id);
        if (items.length === 0) return null;
        return (
          <div key={sub.id} className="showcase-subgroup">
            <h3 className="showcase-subgroup-title">
              {sub.nameKo}
              <span className="showcase-subgroup-count">({items.length})</span>
            </h3>
            <div className="showcase-grid">
              {items.map(item => (
                <ShowcaseCard key={item.repo} item={item} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ShowcaseCard = ({ item }: { item: ShowcaseItem }): ReactElement => (
  <a href={item.url} target="_blank" rel="noopener noreferrer" className="showcase-card">
    <div className="showcase-card-top">
      <span className={`showcase-tech showcase-tech-${item.tech ?? 'web'}`}>
        {item.tech === 'streamlit' ? 'Streamlit' : 'Web'}
      </span>
      <span className="showcase-card-repo">{item.repo}</span>
    </div>
    <h4 className="showcase-card-title">{item.title}</h4>
    {item.note && <p className="showcase-card-note">{item.note}</p>}
    <span className="showcase-card-link">
      {item.url.replace('https://', '').replace(/\/$/, '')}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
    </span>
  </a>
);

export default Showcase;
