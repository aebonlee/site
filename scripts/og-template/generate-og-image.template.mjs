/**
 * ============================================================
 *  OG Image Generator — *.dreamitbiz.com 공용 템플릿
 * ============================================================
 *
 *  1200 x 630px 브랜드 이미지를 생성합니다.
 *
 *  사용법:
 *    1) 이 파일을 각 사이트 레포의 scripts/generate-og-image.mjs 로 복사
 *    2) 아래 CONFIG 를 사이트 값으로 수정 (src/config/site.ts 와 동기화)
 *    3) sharp 임시 설치 후 실행:
 *         npm install --no-save sharp
 *         node scripts/generate-og-image.mjs
 *    4) public/og-image.png 가 생성됨 → 커밋해서 배포
 *
 *  package.json scripts 에 등록해 두면 편리:
 *    "og-image": "node scripts/generate-og-image.mjs"
 */

import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, '..', 'public', 'og-image.png');

// ── 설정 (src/config/site.ts 와 맞추세요) ──────────────────
const CONFIG = {
  siteName:    'DreamIT Books',                  // 큰 영문 제목
  siteNameKo:  '드림아이티 출판',                  // 한국어 부제
  tagline:     '교재 · 디지털 콘텐츠 · E-Publishing · DreamIT Biz', // 하단 태그라인
  domain:      'books.dreamitbiz.com',           // 우측 하단 URL
  primaryColor: '#0046C8',                       // 메인 컬러 (themeColor)
  darkColor:    '#002E8A',                       // 그라데이션 끝 컬러
  width: 1200,
  height: 630,
};

// ── SVG 생성 ────────────────────────────────────────────────
function buildSVG(cfg) {
  const { width, height, primaryColor, darkColor, siteName, siteNameKo, tagline, domain } = cfg;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primaryColor}"/>
      <stop offset="50%" stop-color="${darkColor}"/>
      <stop offset="100%" stop-color="#1E3A5F"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#93C5FD"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <circle cx="1050" cy="120" r="200" fill="rgba(255,255,255,0.04)"/>
  <circle cx="1100" cy="500" r="150" fill="rgba(255,255,255,0.03)"/>
  <circle cx="150"  cy="550" r="100" fill="rgba(255,255,255,0.03)"/>

  <line x1="0" y1="210" x2="${width}" y2="210" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  <line x1="0" y1="420" x2="${width}" y2="420" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <text x="80" y="270" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, Helvetica, sans-serif" font-size="${fitFontSize(siteName, 84)}" font-weight="900" fill="white" letter-spacing="-2">
    ${escapeXml(siteName)}
  </text>

  <text x="80" y="335" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, Helvetica, sans-serif" font-size="34" font-weight="500" fill="rgba(255,255,255,0.88)">
    ${escapeXml(siteNameKo)}
  </text>

  <rect x="80" y="370" width="120" height="4" rx="2" fill="url(#accent)"/>

  <text x="80" y="435" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', Arial, Helvetica, sans-serif" font-size="24" font-weight="400" fill="rgba(255,255,255,0.78)">
    ${escapeXml(tagline)}
  </text>

  <rect x="0" y="${height - 6}" width="${width}" height="6" fill="url(#accent)"/>

  <text x="${width - 80}" y="${height - 30}" font-family="monospace" font-size="16" fill="rgba(255,255,255,0.55)" text-anchor="end">
    ${escapeXml(domain)}
  </text>
</svg>`;
}

function escapeXml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 영문 제목이 길어 캔버스를 벗어나지 않도록 글자수에 따라 폰트 크기 축소
function fitFontSize(text, base) {
  const len = String(text).length;
  if (len <= 14) return base;
  if (len <= 18) return base - 8;
  if (len <= 22) return base - 14;
  return base - 20;
}

async function main() {
  const svg = buildSVG(CONFIG);
  const dir = dirname(OUTPUT);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(OUTPUT);

  console.log(`OG image generated: ${OUTPUT}`);
  console.log(`  Size: ${CONFIG.width} x ${CONFIG.height}`);
  console.log(`  Site: ${CONFIG.siteName} (${CONFIG.siteNameKo})`);
}

main().catch(err => {
  console.error('OG image generation failed:', err.message);
  process.exit(1);
});
