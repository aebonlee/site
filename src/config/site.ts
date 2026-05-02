import type { SiteConfig } from '../types';

const site: SiteConfig = {
  id: 'site',
  name: 'DreamIT Sites',
  nameKo: 'DreamIT 전체 사이트 포탈',
  description: 'DreamIT Biz 87개 교육 플랫폼을 한눈에 — 경영, AI, 코딩, 자격증 등 14개 카테고리',
  url: 'https://site.dreamitbiz.com',
  dbPrefix: 'site_',

  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  brand: {
    parts: [
      { text: 'Dream', className: 'brand-dream' },
      { text: 'IT', className: 'brand-it' },
      { text: 'Sites', className: 'brand-biz' }
    ]
  },

  themeColor: '#0046C8',

  company: {
    name: '드림아이티비즈(DreamIT Biz)',
    ceo: '이애본',
    bizNumber: '601-45-20154',
    salesNumber: '제2024-수원팔달-0584호',
    publisherNumber: '제2026-000026호',
    address: '경기도 수원시 팔달구 매산로 45, 419호',
    email: 'aebon@dreamitbiz.com',
    phone: '010-3700-0629',
    kakao: 'aebon',
    businessHours: '평일: 09:00 ~ 18:00',
  },

  features: {
    shop: false,
    community: false,
    search: true,
    auth: false,
    license: false,
  },

  colors: [
    { name: 'blue', color: '#0046C8' },
    { name: 'red', color: '#C8102E' },
    { name: 'green', color: '#00855A' },
    { name: 'purple', color: '#8B1AC8' },
    { name: 'orange', color: '#C87200' },
  ],

  menuItems: [],

  footerLinks: [
    { path: '/', labelKey: 'nav.home' },
  ],

  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: 'DreamIT Books', url: 'https://books.dreamitbiz.com' },
    { name: 'Edu Hub', url: 'https://edu-hub.dreamitbiz.com' },
    { name: 'AI Hub', url: 'https://ai-hub.dreamitbiz.com' },
    { name: 'Coding Hub', url: 'https://coding-hub.dreamitbiz.com' },
  ]
};

export default site;
