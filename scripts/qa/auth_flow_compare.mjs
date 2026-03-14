import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const baseUrl = process.env.IBNOTE_BASE_URL || 'http://127.0.0.1:3301';
const existingEmail = process.env.IBNOTE_QA_EMAIL;
const existingPassword = process.env.IBNOTE_QA_PASSWORD;
const newEmail = `ibnote.auth.${Date.now()}@tigsgit.com`;
const newPassword = existingPassword || '1q2w3e4r';
const logPath = process.env.IBNOTE_QA_LOG || 'tmp/qa-logs/auth_flow_compare.json';

const result = {
  baseUrl,
  existingEmail,
  newEmail,
  cases: [],
  timestamp: new Date().toISOString(),
};

async function runCase(name, mode, email, password) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const caseResult = { name, mode, email, consoleErrors: [], pageErrors: [] };
  page.on('console', msg => { if (msg.type() === 'error') caseResult.consoleErrors.push(msg.text()); });
  page.on('pageerror', err => { caseResult.pageErrors.push(String(err)); });

  try {
    await page.goto(`${baseUrl}/login?next=/templates`, { waitUntil: 'networkidle' });
    if (mode === 'create_account') {
      await page.getByRole('button', { name: '계정 만들기' }).click();
    }
    await page.getByLabel('이메일').fill(email);
    await page.getByLabel('비밀번호').fill(password);
    await page.locator('form').getByRole('button', { name: mode === 'sign_in' ? '로그인' : '계정 만들기' }).click();
    await page.waitForTimeout(5000);

    caseResult.afterSubmitUrl = page.url();
    caseResult.bodyPreview = (await page.locator('body').innerText()).slice(0, 1200);
    caseResult.localStorage = await page.evaluate(() => {
      const out = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        out[k] = localStorage.getItem(k);
      }
      return out;
    });

    await page.goto(`${baseUrl}/templates/my-opinion-matters`, { waitUntil: 'networkidle' });
    caseResult.detailUrl = page.url();
    caseResult.hasStartButton = await page.getByRole('button', { name: '기록 시작' }).count();
    caseResult.detailPreview = (await page.locator('body').innerText()).slice(0, 1200);
  } catch (err) {
    caseResult.error = String(err);
  } finally {
    await browser.close();
  }

  return caseResult;
}

if (existingEmail && existingPassword) {
  result.cases.push(await runCase('existing_sign_in', 'sign_in', existingEmail, existingPassword));
}
result.cases.push(await runCase('fresh_create_account', 'create_account', newEmail, newPassword));

await fs.writeFile(logPath, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
