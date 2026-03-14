import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseUrl = process.env.IBNOTE_BASE_URL || 'http://127.0.0.1:3301';
const email = process.env.IBNOTE_QA_EMAIL;
const password = process.env.IBNOTE_QA_PASSWORD;
const logPath = process.env.IBNOTE_QA_LOG || 'tmp/qa-logs/e01_logout_redirect_check.json';

if (!email || !password) {
  console.error('Missing IBNOTE_QA_EMAIL or IBNOTE_QA_PASSWORD');
  process.exit(2);
}

const result = {
  baseUrl,
  email,
  steps: [],
  ok: false,
  timestamp: new Date().toISOString(),
};

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

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

try {
  await step('login', async () => {
    await page.goto(`${baseUrl}/login?next=/templates`, { waitUntil: 'networkidle' });
    await page.getByLabel('이메일').fill(email);
    await page.getByLabel('비밀번호').fill(password);
    await page.locator('form').getByRole('button', { name: '로그인' }).click();
    await page.waitForURL(/\/templates/, { timeout: 20000 });
    return { url: page.url() };
  });

  await step('open_template_detail', async () => {
    await page.goto(`${baseUrl}/templates/my-opinion-matters`, { waitUntil: 'networkidle' });
    const url = page.url();
    const body = await page.locator('body').innerText();
    const hasStartLink = await page.getByRole('link', { name: '기록 시작' }).count();
    return { url, hasStartLink, bodyPreview: body.slice(0, 1200) };
  });

  await step('assert_start_link_present', async () => {
    await page.getByRole('link', { name: '기록 시작' }).waitFor({ timeout: 20000 });
    return { url: page.url() };
  });

  const record = await step('create_record_from_template', async () => {
    await page.getByRole('link', { name: '기록 시작' }).click();
    await page.waitForTimeout(5000);
    return { url: page.url(), bodyPreview: (await page.locator('body').innerText()).slice(0, 1200) };
  });

  const recordUrl = record.url;

  await step('logout_via_settings', async () => {
    await page.goto(`${baseUrl}/my/settings`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: '로그아웃' }).click();
    await page.waitForURL(new RegExp(`${baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/$`), { timeout: 20000 });
    return { url: page.url() };
  });

  await step('protected_redirect_after_real_logout', async () => {
    await page.goto(recordUrl, { waitUntil: 'networkidle' });
    await page.waitForURL(/\/login\?next=/, { timeout: 20000 });
    return { url: page.url(), bodyPreview: (await page.locator('body').innerText()).slice(0, 800) };
  });

  result.ok = true;
} finally {
  await fs.writeFile(logPath, JSON.stringify(result, null, 2));
  await browser.close();
}

if (!result.ok) process.exit(1);
