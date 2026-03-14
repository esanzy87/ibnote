import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseUrl = process.env.IBNOTE_BASE_URL || 'http://127.0.0.1:3301';
const email = process.env.IBNOTE_QA_EMAIL;
const password = process.env.IBNOTE_QA_PASSWORD;
const logPath = process.env.IBNOTE_QA_LOG || 'tmp/qa-logs/e01_protected_flow.json';

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
    await page.waitForTimeout(4000);
    const url = page.url();
    const body = await page.locator('body').innerText();
    const authErrorText = await page.locator('form').innerText().catch(() => '');
    const localStorageDump = await page.evaluate(() => {
      const out = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        out[k] = localStorage.getItem(k);
      }
      return out;
    });
    return { url, bodyPreview: body.slice(0, 800), authErrorText: authErrorText.slice(0, 800), localStorageKeys: Object.keys(localStorageDump) };
  });

  await step('open_template_detail', async () => {
    await page.goto(`${baseUrl}/templates/my-opinion-matters`, { waitUntil: 'networkidle' });
    const url = page.url();
    const body = await page.locator('body').innerText();
    const hasStartLink = await page.getByRole('link', { name: '기록 시작' }).count();
    return { url, hasStartLink, bodyPreview: body.slice(0, 1000), consoleErrors: result.consoleErrors.slice(-20), pageErrors: result.pageErrors.slice(-20) };
  });

  await step('assert_start_link_present', async () => {
    await page.getByRole('link', { name: '기록 시작' }).waitFor({ timeout: 20000 });
    return { url: page.url() };
  });

  let createdUrl = null;
  await step('start_record', async () => {
    await page.getByRole('link', { name: '기록 시작' }).click();
    await page.waitForTimeout(5000);
    createdUrl = page.url();
    const body = await page.locator('body').innerText();
    const hasEditorSignals = [
      '기록',
      '초안 저장',
      '제출',
      '부모',
      '되돌아보기',
    ].filter((token) => body.includes(token));
    return { url: createdUrl, bodyPreview: body.slice(0, 1200), hasEditorSignals };
  });

  await step('protected_redirect_after_logout', async () => {
    await context.clearCookies();
    await page.goto(createdUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);
    return { url: page.url(), bodyPreview: (await page.locator('body').innerText()).slice(0, 800) };
  });

  result.ok = true;
} finally {
  await fs.writeFile(logPath, JSON.stringify(result, null, 2));
  await browser.close();
}

if (!result.ok) process.exit(1);
