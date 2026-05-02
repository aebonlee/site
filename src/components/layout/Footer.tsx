import { useLanguage } from '../../contexts/LanguageContext';
import site from '../../config/site';
import { categories } from '../../data/sites';
import type { ReactElement, ChangeEvent } from 'react';

/* 14개 카테고리를 3열로 분배 */
const COL_SIZE = Math.ceil(categories.length / 3);
const cols = [
  categories.slice(0, COL_SIZE),
  categories.slice(COL_SIZE, COL_SIZE * 2),
  categories.slice(COL_SIZE * 2),
];

const Footer = (): ReactElement => {
  const { t, language } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        {/* 빠르게 가기 — 3열 카테고리 */}
        <div className="footer-quick-grid">
          <h4 className="footer-quick-title">{t('footer.quickLinks')}</h4>
          <div className="footer-quick-cols">
            {cols.map((col, ci) => (
              <ul key={ci} className="footer-quick-col">
                {col.map(cat => (
                  <li key={cat.id}>
                    <a href={`/#cat-${cat.id}`}>
                      <span className="footer-quick-icon">{cat.icon}</span>
                      {language === 'ko' ? cat.nameKo : cat.name}
                      <span className="footer-quick-count">{cat.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-brand">
            <h3>
              {site.brand.parts.map((part, i) => (
                <span key={i} className={part.className}>
                  {part.text}
                </span>
              ))}
            </h3>
            <p>{t('footer.tagline')}</p>
            <div className="company-info">
              <p><strong>{site.company.name}</strong></p>
              <p>대표이사: {site.company.ceo}</p>
              <p>사업자등록번호: {site.company.bizNumber}</p>
              {site.company.salesNumber && <p>통신판매신고번호: {site.company.salesNumber}</p>}
              {site.company.publisherNumber && <p>출판사 신고번호: {site.company.publisherNumber}</p>}
            </div>
          </div>
          <div className="footer-contact">
            <h4>{t('footer.contact')}</h4>
            <p>{site.company.address}</p>
            <p>{site.company.email}</p>
            <p>{site.company.phone}</p>
            {site.company.kakao && <p>카카오톡: {site.company.kakao}</p>}
            {site.company.businessHours && <p className="business-hours">{site.company.businessHours}</p>}

            <div className="footer-family">
              <select
                defaultValue=""
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  if (e.target.value) window.open(e.target.value, '_blank');
                  e.target.value = '';
                }}
              >
                <option value="" disabled>Family Site</option>
                <option value={site.parentSite.url}>{site.parentSite.name} (본사이트)</option>
                {site.familySites.map((s, i) => (
                  <option key={i} value={s.url}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2020-{new Date().getFullYear()} DreamIT Biz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
