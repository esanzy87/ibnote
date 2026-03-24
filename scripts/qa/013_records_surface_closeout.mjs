import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseUrl = process.env.IBNOTE_BASE_URL || 'http://127.0.0.1:3301';
const email = process.env.IBNOTE_QA_EMAIL;
const password = process.env.IBNOTE_QA_PASSWORD;
const logPath = process.env.IBNOTE_QA_LOG || 'tmp/qa-logs/013_records_surface_closeout.json';

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

page.on('console', (msg) => {
  if (msg.type() === 'error') result.consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => {
  result.pageErrors.push(String(err));
});

async function step(name, fn) {
  try {
    const out = await fn();
    result.steps.push({ name, ok: true, out });
    return out;
  } catch (err) {
    result.steps.push({ name, ok: false, error: String(err) });
    throw err;
  }
}

let createdRecordUrl = null;

try {
  await step('open_login', async () => {
    await page.goto(`${baseUrl}/login?next=/my/records`, { waitUntil: 'networkidle' });
    return { url: page.url() };
  });

  await step('login', async () => {
    await page.getByLabel('이메일').fill(email);
    await page.getByLabel('비밀번호').fill(password);
    await page.locator('form').getByRole('button', { name: '로그인' }).click();
    await page.waitForURL(/\/my\/records/, { timeout: 20000 });
    return { url: page.url() };
  });

  await step('records_surface_check', async () => {
    await page.goto(`${baseUrl}/my/records`, { waitUntil: 'networkidle' });
    const body = await page.locator('body').innerText();
    const firstRecordLink = page.locator('a[href^="/my/records/"]').first();
    const recordLinkCount = await page.locator('a[href^="/my/records/"]').count();

    return {
      url: page.url(),
      bodyPreview: body.slice(0, 1800),
      hasHero: body.includes('오늘의 기록이 내일의 다시 보기로 이어지는 곳.'),
      hasWorkspaceShell: body.includes('기록 워크스페이스') && body.includes('내 기록으로 이어가기'),
      hasFilterPanel: body.includes('기록 찾기와 정리') && body.includes('새 기록 시작'),
      hasRecordsHeading: body.includes('기록 목록'),
      recordLinkCount,
      firstRecordHref: recordLinkCount > 0 ? await firstRecordLink.getAttribute('href') : null,
    };
  });

  await step('create_record_via_template', async () => {
    await page.goto(`${baseUrl}/templates/my-opinion-matters`, { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: '기록 시작' }).click();
    await page.waitForURL(/\/my\/records\/[^/]+$/, { timeout: 20000 });
    createdRecordUrl = page.url();
    return { url: createdRecordUrl };
  });

  await step('record_editor_surface_check', async () => {
    const body = await page.locator('body').innerText();
    return {
      url: page.url(),
      bodyPreview: body.slice(0, 2200),
      hasWorkspaceShell: body.includes('기록 워크스페이스') && body.includes('내 기록으로 이어가기'),
      hasEntryIntro:
        body.includes('지금의 장면부터 이어 적는 기록') || body.includes('돌아보며 다듬는 기록'),
      hasEditorHierarchy:
        body.includes('1) 장면 기록') &&
        body.includes('2) 제출 전 점검') &&
        body.includes('3) 역량 체크') &&
        body.includes('4) 저장 또는 제출'),
      hasGuide: body.includes('기록 가이드'),
    };
  });

  await step('protected_redirect_after_logout', async () => {
    await context.clearCookies();
    await page.goto(createdRecordUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    const body = await page.locator('body').innerText();
    return {
      url: page.url(),
      bodyPreview: body.slice(0, 1000),
      redirectedToLogin: page.url().includes('/login?next='),
    };
  });

  result.ok = true;
} finally {
  await fs.mkdir('tmp/qa-logs', { recursive: true });
  await fs.writeFile(logPath, JSON.stringify(result, null, 2));
  await browser.close();
}

if (!result.ok) process.exit(1);
