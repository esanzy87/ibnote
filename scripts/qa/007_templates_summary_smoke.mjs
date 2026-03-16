import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseUrl = process.env.IBNOTE_BASE_URL || 'http://127.0.0.1:3301';
const email = process.env.IBNOTE_QA_EMAIL;
const password = process.env.IBNOTE_QA_PASSWORD;
const logPath = process.env.IBNOTE_QA_LOG || 'tmp/qa-logs/007_templates_summary_smoke.json';

if (!email || !password) {
  console.error('Missing IBNOTE_QA_EMAIL or IBNOTE_QA_PASSWORD');
  process.exit(2);
}

const result = {
  baseUrl,
  email,
  steps: [],
  consoleErrors: [],
  pageErrors: [],
  ok: false,
  timestamp: new Date().toISOString(),
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
page.on('console', msg => {
  if (msg.type() === 'error') result.consoleErrors.push(msg.text());
});
page.on('pageerror', err => {
  result.pageErrors.push(String(err));
});

async function step(name, fn) {
  try {
    const out = await fn();
    result.steps.push({ name, ok: true, out });
  } catch (err) {
    result.steps.push({ name, ok: false, error: String(err) });
    throw err;
  }
}

try {
  await step('open_login', async () => {
    await page.goto(`${baseUrl}/login?next=/templates`, { waitUntil: 'networkidle' });
    return { url: page.url() };
  });

  await step('login', async () => {
    await page.getByLabel('이메일').fill(email);
    await page.getByLabel('비밀번호').fill(password);
    await page.locator('form').getByRole('button', { name: '로그인' }).click();
    await page.waitForURL(/\/templates/, { timeout: 20000 });
    const body = await page.locator('body').innerText();
    return {
      url: page.url(),
      bodyPreview: body.slice(0, 1200),
      hasTemplatesHeading: body.includes('템플릿'),
      hasRecoveryCopy: body.includes('전체 활동 다시 보기') || body.includes('검색어만 지우기'),
    };
  });

  await step('templates_surface_check', async () => {
    await page.goto(`${baseUrl}/templates`, { waitUntil: 'networkidle' });
    const body = await page.locator('body').innerText();
    return {
      url: page.url(),
      bodyPreview: body.slice(0, 1600),
      hasTemplatesHeading: body.includes('템플릿'),
      hasNoResultRecovery:
        body.includes('검색어만 지우기') || body.includes('전체 활동 다시 보기') || body.includes('맞는 활동을 아직 찾지 못했어요'),
      hasKoreanFirstGuidance:
        body.includes('바로 고르기 어렵다면') || body.includes('먼저 하나만 골라') || body.includes('지금 조건에서는 맞는 활동을 아직 찾지 못했어요'),
    };
  });

  await step('summary_surface_check', async () => {
    await page.goto(`${baseUrl}/my/summary`, { waitUntil: 'networkidle' });
    const body = await page.locator('body').innerText();
    return {
      url: page.url(),
      bodyPreview: body.slice(0, 1600),
      hasSummaryHeading: body.includes('내 요약'),
      hasRecoveryPath:
        body.includes('내 기록으로 가기') || body.includes('템플릿에서 시작하기') || body.includes('템플릿에서 새 활동 고르기'),
      hasDraftSubmittedContinuity:
        body.includes('제출된 기록') || body.includes('초안') || body.includes('제출하면 이 화면에 자동으로 반영'),
    };
  });

  result.ok = true;
} finally {
  await fs.mkdir('tmp/qa-logs', { recursive: true });
  await fs.writeFile(logPath, JSON.stringify(result, null, 2));
  await browser.close();
}

if (!result.ok) process.exit(1);
