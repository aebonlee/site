# OG (Open Graph) 템플릿 — *.dreamitbiz.com 공용

웹 URL을 카카오톡 / 페이스북 / 트위터 등에서 공유했을 때 미리보기 카드(썸네일 + 제목 + 설명)를 만들기 위한 메타 태그와 1200×630 이미지 생성 스크립트를 모아두는 디렉터리입니다.

검증 도구: https://developers.kakao.com/tool/debugger/sharing

## 구성

| 파일 | 용도 |
|---|---|
| `og-meta-tags.html` | `index.html` `<head>` 에 붙여넣을 OG / Twitter 메타 태그 스니펫 (placeholders 포함) |
| `generate-og-image.template.mjs` | 1200×630 OG 이미지 PNG 생성 스크립트 — sharp 사용 |

## 새 *.dreamitbiz.com 사이트 적용 절차

### 1) 메타 태그 추가

`og-meta-tags.html` 의 `{{...}}` 자리표시자를 사이트 값으로 치환해 해당 레포의 `index.html` `<head>` 안에 붙여넣습니다.

| 자리표시자 | 예시 | 비고 |
|---|---|---|
| `{{SITE_URL}}`   | `https://books.dreamitbiz.com` | 끝의 `/` 는 템플릿이 직접 붙임 |
| `{{SITE_HOST}}`  | `books.dreamitbiz.com`         | `https://` 와 끝 `/` 제외 |
| `{{SITE_TITLE}}` | `DreamIT Books — 드림아이티 출판` | 60자 이내 권장 |
| `{{SITE_DESC}}`  | `교재 판매, 디지털 콘텐츠, 교육 자료, E-Publishing` | 120자 이내 권장 |
| `{{SITE_THEME}}` | `#0046C8` | `src/config/site.ts` 의 `themeColor` |
| `{{SITE_NAME}}`  | `DreamIT Biz` | `og:site_name` (보통 그대로 유지) |

각 사이트의 정확한 값은 [`src/data/sites.ts`](../../src/data/sites.ts) 에 정의된 항목과 맞추세요.

### 2) OG 이미지 생성

```bash
# 1. 템플릿 복사 (각 사이트 레포 안에서)
cp /path/to/site-repo/scripts/og-template/generate-og-image.template.mjs scripts/generate-og-image.mjs

# 2. CONFIG 객체를 사이트 값으로 수정
#    siteName, siteNameKo, tagline, domain, primaryColor, darkColor

# 3. sharp 임시 설치 + 실행 (--no-save 로 package.json 변경 없이)
npm install --no-save sharp
node scripts/generate-og-image.mjs

# 4. public/og-image.png 생성 확인 → 커밋 후 배포
git add public/og-image.png scripts/generate-og-image.mjs
git commit -m "chore: add OG image for social link preview"
```

`package.json` `scripts` 에 다음을 등록하면 `npm run og-image` 로 재생성할 수 있습니다.

```json
"scripts": {
  "og-image": "node scripts/generate-og-image.mjs"
}
```

### 3) 배포 후 캐시 갱신

카카오톡 / 페이스북은 OG 정보를 캐싱합니다. 배포가 끝나면 다음 디버거에 사이트 URL을 넣고 한 번 긁어 줘야 카드가 갱신됩니다.

- Kakao: https://developers.kakao.com/tool/debugger/sharing
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator (X로 전환된 이후 별도 검증 도구가 줄어든 상태)

## 체크리스트

- [ ] `index.html` 에 og:url, og:title, og:description, og:image, og:type, og:site_name 6종 필수 태그가 모두 있다
- [ ] `og:image` 가 절대 URL (`https://...`) 이고 1200×630 PNG 다
- [ ] `og:image:width` / `og:image:height` 가 1200 / 630 으로 명시되어 있다
- [ ] `og:locale="ko_KR"` 이 있다 (한국어 사이트)
- [ ] `public/og-image.png` 가 실제 1200×630 사이즈로 생성되어 있다
- [ ] 배포 후 카카오 디버거에서 미리보기가 정상적으로 표시된다

## 디자인 변경

`generate-og-image.template.mjs` 의 `buildSVG()` 함수가 SVG 마크업을 직접 만듭니다. 색상·레이아웃을 일괄 변경하려면 이 함수를 수정하면 됩니다. 영문 제목이 긴 사이트(예: `SeoulTech AI Lecture`)는 `fitFontSize()` 가 자동으로 글자 수에 따라 폰트 크기를 줄입니다.
