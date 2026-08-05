import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const iphone = devices['iPhone 13'];

for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ ...iphone });
  await context.addInitScript((t) => {
    window.localStorage.setItem('theme', t);
  }, theme);
  const page = await context.newPage();
  await page.goto('http://localhost:7001/', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(800);
  await page.click('#menuButton');
  await page.waitForTimeout(600);
  await page.screenshot({ path: `C:/Movapp_Web/__menu3_${theme}.png`, animations: 'disabled' });
  await context.close();
}

await browser.close();
console.log('done');
