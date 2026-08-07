import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 412, height: 823 } });
await page.goto('https://stage.movapp.org/', { waitUntil: 'networkidle', timeout: 30000 });
const logo = page.locator('.footer-logo').first();
const logoBox = await logo.boundingBox();
const logoStyle = await logo.evaluate((el) => getComputedStyle(el).height);
console.log('footer-logo box:', logoBox, 'computed height:', logoStyle);

const collab = page.locator('img[alt="Werevertumorro"]').first();
await collab.scrollIntoViewIfNeeded();
const collabBox = await collab.boundingBox();
console.log('collab logo box:', collabBox);

await browser.close();
