// ============================================================
// showcase.ts — 교육 성과(수강생 실습 결과물) 데이터
// 2026-06-12 GitHub 전수 감사 기준 (kdn01~32 실제 제목 수집 완료)
// 포탈에는 그룹 카드 1장으로 노출 → 클릭 시 쇼케이스 상세 페이지
// ============================================================

export interface ShowcaseItem {
  repo: string;          // GitHub 리포명
  title: string;         // 결과물 실제 제목 (index.html <title> / app.py 기준)
  subgroup: string;      // 그룹 내 분류 키
  url: string;           // 배포 URL
  tech?: 'web' | 'streamlit';
  note?: string;
}

export interface ShowcaseGroup {
  id: string;            // sites.ts의 group 필드와 연결
  nameKo: string;
  nameEn: string;
  course: string;        // 연결된 본 사이트 id (sites.ts)
  client?: string;
  description: string;
  subgroups: { id: string; nameKo: string }[];
  items: ShowcaseItem[];
}

const gh = (repo: string) => `https://aebonlee.github.io/${repo}/`;

export const showcaseGroups: ShowcaseGroup[] = [
  // ──────────────────────────────────────────────
  // 1. 한전KDN 바이브코딩 (3일 21시간) — 수강생 결과물 31개
  //    ※ kdn24는 강의 사이트(kdn2026) 사본이라 제외 (CNAME 충돌 정리 대상)
  // ──────────────────────────────────────────────
  {
    id: 'kdn-2026',
    nameKo: 'KDN 바이브코딩 수강생 결과물',
    nameEn: 'KDN Vibe Coding Showcase',
    course: 'kdn',
    client: '한전KDN',
    description: '3일(21시간) 바이브코딩 과정에서 수강생이 직접 기획·구현한 풀스택 결과물 31개',
    subgroups: [
      { id: 'biz-system', nameKo: '업무 시스템·대시보드' },
      { id: 'security', nameKo: '정보보안' },
      { id: 'ai-service', nameKo: 'AI 활용 서비스' },
      { id: 'corporate', nameKo: '기업·서비스 소개' },
      { id: 'portfolio', nameKo: '개인 포트폴리오·자기소개' },
    ],
    items: [
      // ── 업무 시스템·대시보드 (8) ──
      { repo: 'kdn02', title: '전력설비 현황 대시보드', subgroup: 'biz-system', url: gh('kdn02'), tech: 'web' },
      { repo: 'kdn04', title: 'AMIMAPER — AMI 지도 시각화', subgroup: 'biz-system', url: gh('kdn04'), tech: 'web' },
      { repo: 'kdn14', title: 'KDN 사업관리 시스템', subgroup: 'biz-system', url: gh('kdn14'), tech: 'web' },
      { repo: 'kdn20', title: 'KDN 업무 일지', subgroup: 'biz-system', url: gh('kdn20'), tech: 'web' },
      { repo: 'kdn23', title: '유지보수 예방점검 일정 관리 시스템', subgroup: 'biz-system', url: gh('kdn23'), tech: 'web' },
      { repo: 'kdn26', title: '대한민국 인구 현황 대시보드', subgroup: 'biz-system', url: gh('kdn26'), tech: 'streamlit' },
      { repo: 'kdn28', title: 'Worklog — 업무일지 관리 시스템', subgroup: 'biz-system', url: gh('kdn28'), tech: 'web' },
      { repo: 'kdn29', title: '게시판', subgroup: 'biz-system', url: gh('kdn29'), tech: 'web' },

      // ── 정보보안 (5) ──
      { repo: 'kdn03', title: 'KDN-VULN 취약점 진단 관리 시스템', subgroup: 'security', url: gh('kdn03'), tech: 'web' },
      { repo: 'kdn05', title: '보안관제 실무 가이드 — KDN 정보보안팀', subgroup: 'security', url: gh('kdn05'), tech: 'web' },
      { repo: 'kdn11', title: 'KDN 패킷 분석기', subgroup: 'security', url: gh('kdn11'), tech: 'streamlit' },
      { repo: 'kdn17', title: '피싱 분석 챗봇', subgroup: 'security', url: gh('kdn17'), tech: 'streamlit' },
      { repo: 'kdn22', title: 'KDN-VULN 취약점 진단 관리 시스템 (별도 구현)', subgroup: 'security', url: gh('kdn22'), tech: 'web' },

      // ── AI 활용 서비스 (5) ──
      { repo: 'kdn07', title: 'Lotto Grid AI Analyzer', subgroup: 'ai-service', url: gh('kdn07'), tech: 'web' },
      { repo: 'kdn15', title: 'AI 뉴스 요약 대시보드', subgroup: 'ai-service', url: gh('kdn15'), tech: 'web' },
      { repo: 'kdn18', title: 'KDN 사내 AI 헬스 챗봇', subgroup: 'ai-service', url: gh('kdn18'), tech: 'web' },
      { repo: 'kdn19', title: 'OpenAI 챗봇', subgroup: 'ai-service', url: gh('kdn19'), tech: 'streamlit' },
      { repo: 'kdn21', title: 'KDN 업무 메일 도우미', subgroup: 'ai-service', url: gh('kdn21'), tech: 'streamlit' },

      // ── 기업·서비스 소개 (4) ──
      { repo: 'kdn08', title: '한전KDN — 에너지 디지털 혁신의 중심', subgroup: 'corporate', url: gh('kdn08'), tech: 'web' },
      { repo: 'kdn10', title: 'TechCorp Solutions — 디지털 혁신 파트너', subgroup: 'corporate', url: gh('kdn10'), tech: 'web' },
      { repo: 'kdn30', title: 'KDN 전기차 충전서비스 — 초급속 충전', subgroup: 'corporate', url: gh('kdn30'), tech: 'web' },
      { repo: 'kdn31', title: 'TechCorp Solutions (별도 구현)', subgroup: 'corporate', url: gh('kdn31'), tech: 'web' },

      // ── 개인 포트폴리오·자기소개 (9) ──
      { repo: 'kdn01', title: "Suyoung's Secret — 사주·별자리·MBTI·타로", subgroup: 'portfolio', url: gh('kdn01'), tech: 'web' },
      { repo: 'kdn06', title: 'Real Zero — 힙 에코 SNS', subgroup: 'portfolio', url: gh('kdn06'), tech: 'web' },
      { repo: 'kdn09', title: '홍길동 · KDN 미터링 엔지니어 (이력서)', subgroup: 'portfolio', url: gh('kdn09'), tech: 'web' },
      { repo: 'kdn12', title: 'Jihoo — 자기소개 페이지', subgroup: 'portfolio', url: gh('kdn12'), tech: 'streamlit' },
      { repo: 'kdn13', title: '바이브조 — 백엔드·데이터 앱 개발자 자기소개', subgroup: 'portfolio', url: gh('kdn13'), tech: 'streamlit' },
      { repo: 'kdn16', title: 'Minjun Kim — Frontend Developer', subgroup: 'portfolio', url: gh('kdn16'), tech: 'web' },
      { repo: 'kdn25', title: '강티푼 — 풀스택 개발자 포트폴리오', subgroup: 'portfolio', url: gh('kdn25'), tech: 'streamlit' },
      { repo: 'kdn27', title: '이지원 — 자기소개', subgroup: 'portfolio', url: gh('kdn27'), tech: 'streamlit' },
      { repo: 'kdn32', title: '송*우 개인 페이지', subgroup: 'portfolio', url: gh('kdn32'), tech: 'web' },
    ],
  },

  // ──────────────────────────────────────────────
  // 2. AI Reboot Academy — 팀 프로젝트 26개
  // ──────────────────────────────────────────────
  {
    id: 'reboot-2026',
    nameKo: 'AI Reboot Academy 팀 프로젝트',
    nameEn: 'AI Reboot Academy Team Projects',
    course: 'rest',
    description: '쉬었음청년 AI교육 과정의 팀별 실전 프로젝트 26개 (Vite + React + TS + Supabase)',
    subgroups: [
      { id: 'ai-app', nameKo: 'AI 활용 앱' },
      { id: 'career-policy', nameKo: '취업·정책 지원' },
      { id: 'wellness', nameKo: '마음건강·라이프케어' },
      { id: 'learning', nameKo: '학습·교양' },
      { id: 'community', nameKo: '커뮤니티·문화' },
    ],
    items: [
      { repo: 'project01', title: '한국형 AI 동화책', subgroup: 'ai-app', url: gh('project01') },
      { repo: 'project02', title: '청년지원정책 안내 챗봇', subgroup: 'career-policy', url: gh('project02') },
      { repo: 'project03', title: '회복탄력성 루틴 코치', subgroup: 'wellness', url: gh('project03') },
      { repo: 'project04', title: '회복탄력성 저널', subgroup: 'wellness', url: gh('project04') },
      { repo: 'project05', title: 'AI 창업 아이템 코치', subgroup: 'ai-app', url: gh('project05') },
      { repo: 'project06', title: '청년정책 자격진단', subgroup: 'career-policy', url: gh('project06') },
      { repo: 'project07', title: '문화재 AI 해설 앱', subgroup: 'community', url: gh('project07') },
      { repo: 'project08', title: '나이대별 한국사 학습·시험', subgroup: 'learning', url: gh('project08') },
      { repo: 'project09', title: '자격증 취약점 분석', subgroup: 'learning', url: gh('project09') },
      { repo: 'project10', title: 'AI 자기소개서·면접 코치', subgroup: 'career-policy', url: gh('project10') },
      { repo: 'project11', title: '밀려도 괜찮은 학습 플래너', subgroup: 'learning', url: gh('project11') },
      { repo: 'project12', title: '내 아이 근시 관리 플랫폼', subgroup: 'wellness', url: gh('project12') },
      { repo: 'project13', title: 'JD 기반 채용 진단', subgroup: 'career-policy', url: gh('project13') },
      { repo: 'project14', title: '외국인 맞춤 맛집 동선', subgroup: 'community', url: gh('project14') },
      { repo: 'project15', title: '육묘(猫)일기 — 고양이 생애주기 기록', subgroup: 'wellness', url: gh('project15') },
      { repo: 'project16', title: '마음 한 스푼 — 위로·격려 챗', subgroup: 'wellness', url: gh('project16') },
      { repo: 'project17', title: '청년 AI 리터러시 진단 — 격차 분석·정책 수요 예측', subgroup: 'career-policy', url: gh('project17') },
      { repo: 'project18', title: '뉴스로 배우는 핵심 용어·어휘 학습', subgroup: 'learning', url: gh('project18') },
      { repo: 'project19', title: '매일 서로에게 힘이 되는 칭찬 커뮤니티', subgroup: 'community', url: gh('project19') },
      { repo: 'project20', title: '팬의 응원을 잇는 예술 현물 후원', subgroup: 'community', url: gh('project20') },
      { repo: 'project21', title: '진료실 밖 정신과 케어 — 증상 기록·임상 리포트', subgroup: 'wellness', url: gh('project21') },
      { repo: 'project22', title: '경제 자립 단계별 AI 코칭', subgroup: 'career-policy', url: gh('project22') },
      { repo: 'project23', title: '밀려도 괜찮은 AI 학습 플래너', subgroup: 'learning', url: gh('project23') },
      { repo: 'project24', title: '취업자격증 도우미 — 직무별 추천·퀴즈', subgroup: 'career-policy', url: gh('project24') },
      { repo: 'project25', title: '부모님 맞춤 복지 케어 — 혜택 분석·리포트', subgroup: 'wellness', url: gh('project25') },
      { repo: 'project26', title: '영양제 알리미 — 복용 스케줄·체크', subgroup: 'wellness', url: gh('project26') },
    ],
  },

  // ──────────────────────────────────────────────
  // 3. 수업 교보재·예제 사이트
  // ──────────────────────────────────────────────
  {
    id: 'reboot-materials',
    nameKo: '수업 교보재·예제',
    nameEn: 'Teaching Materials & Examples',
    course: 'rest',
    description: '수업 중 실시간으로 수정하며 가르치는 살아있는 교보재 — 실전형 교수법 예제',
    subgroups: [{ id: 'material', nameKo: '교보재' }],
    items: [
      { repo: 'rest01', title: '이력서 웹사이트 예시 (정적 HTML)', subgroup: 'material', url: 'https://rest01.dreamitbiz.com' },
      { repo: 'rest03', title: 'CHINHUNG — 회사 사이트 템플릿', subgroup: 'material', url: gh('rest03') },
      { repo: 'rest04', title: 'AICADEMY — 온라인 AI 동영상 교육 템플릿', subgroup: 'material', url: gh('rest04') },
      { repo: 'starbucks', title: '프로젝트01_스타벅스 — 클론 실습 예제', subgroup: 'material', url: 'https://starbucks.dreamitbiz.com' },
    ],
  },
];

/** group id로 쇼케이스 그룹 조회 */
export const getShowcaseGroup = (id: string): ShowcaseGroup | undefined =>
  showcaseGroups.find(g => g.id === id);

/** 전체 실습 결과물 수 (히어로 통계용) */
export const totalShowcaseCount = showcaseGroups.reduce((n, g) => n + g.items.length, 0);
