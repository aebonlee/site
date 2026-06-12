# DEV_LOG - site.dreamitbiz.com (DreamIT Sites 포탈)

## 2026-06-12 2차 고도화 1단계 — 사이트 전수 정리 + 실습 결과물 쇼케이스
- **sites.ts**: 100개 → **111개** (누락 11개 추가: seminar, sangmin·rest01, ax-study, project/DevLab, halla·snu, contents/휴넷·data/KERIS·skala/SK, vibe)
  - 카테고리 count 하드코딩 제거 → `sites` 배열에서 자동 계산
  - 확장 필드 추가(선택): `status`, `client`, `repo`, `launched`, `group`
  - `totalSiteCount` export 추가
- **showcase.ts 신규**: 실습 결과물 **61개**를 3그룹으로 정리
  - KDN 바이브코딩 31개(5개 서브그룹), AI Reboot 팀프로젝트 26개(5개 서브그룹), 교보재·예제 4개
  - kdn24는 강의 사이트(kdn2026) 사본이라 제외
- **Showcase 페이지 신규**(`/showcase`): 그룹 탭 → 서브그룹 → 결과물 카드, web/Streamlit 배지
- Home 히어로에 쇼케이스 진입 CTA + 통계/타임라인 최신화, 메뉴·번역(nav.showcase) 추가
- 검증: `tsc -b` 0 errors, `vite build` 통과

### 남은 수동 조치(코드 외)
1. kdn24 리포 CNAME(kdn.dreamitbiz.com) 삭제 — kdn2026 본 강의 사이트와 중복
2. resrt02 오타 리포 → rest02 rename 또는 archive
3. Streamlit 결과물(kdn11·12·13·17·19·21·25·26·27) — Pages 직접 실행 불가, Streamlit Cloud 링크 교체 검토
4. halla 비공개 운영 시 해당 엔트리 `status: 'private'` 추가
5. vibe vs vibe-coding 통합 여부 결정

## 2026-03-25 점검
- npm audit: 취약점 0건
- 역할: 서브사이트 공통 템플릿 원본
- 기술 스택: React 19 + Vite 7 + Supabase + PortOne V1
