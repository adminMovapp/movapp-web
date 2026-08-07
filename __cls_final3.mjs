import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 412, height: 823 } });
const page = await context.newPage();

await page.addInitScript(() => {
   window.__shifts = [];
   try {
      const po = new PerformanceObserver((list) => {
         for (const entry of list.getEntries()) {
            if (entry.hadRecentInput) continue;
            window.__shifts.push({ value: entry.value, time: entry.startTime });
         }
      });
      po.observe({ type: 'layout-shift', buffered: true });
   } catch (e) {}
});

const client = await context.newCDPSession(page);
await client.send('Network.enable');
await client.send('Network.emulateNetworkConditions', {
   offline: false,
   downloadThroughput: (1.6 * 1024 * 1024) / 8,
   uploadThroughput: (750 * 1024) / 8,
   latency: 150,
});
await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

await page.goto('http://localhost:7001/', { waitUntil: 'load', timeout: 60000 });
await page.waitForTimeout(8000);

const shifts = await page.evaluate(() => window.__shifts);
const total = shifts.reduce((a, s) => a + s.value, 0);
console.log('total CLS:', total.toFixed(4), 'entries:', shifts.length);

// Also desktop width, since the header-spacer fix is a desktop-only (lg+) element.
await page.close();
const page2 = await context.newPage();
await page2.addInitScript(() => {
   window.__shifts = [];
   try {
      const po = new PerformanceObserver((list) => {
         for (const entry of list.getEntries()) {
            if (entry.hadRecentInput) continue;
            window.__shifts.push({ value: entry.value, time: entry.startTime });
         }
      });
      po.observe({ type: 'layout-shift', buffered: true });
   } catch (e) {}
});
await context.setViewportSize({ width: 1280, height: 900 });
await page2.setViewportSize({ width: 1280, height: 900 });
await page2.goto('http://localhost:7001/', { waitUntil: 'load', timeout: 60000 });
await page2.waitForTimeout(8000);
const shifts2 = await page2.evaluate(() => window.__shifts);
const total2 = shifts2.reduce((a, s) => a + s.value, 0);
console.log('desktop total CLS:', total2.toFixed(4), 'entries:', shifts2.length);

await browser.close();
