/**
 * Smoke-probes a BUILT site before it deploys.
 *
 * The deployed artifact is a different build from the one the test rig
 * exercises (registry install, production bundling) - a class of failure
 * that once shipped a SyntaxError onto every example page. This probe
 * loads a handful of pages from the served build and fails the deploy if
 * an example crashed or nothing rendered.
 *
 * Usage: `node smoke.mjs <baseURL>` - e.g.
 *   node smoke.mjs http://localhost:3999/antd-theme-documentation
 */
import { chromium } from '@playwright/test';

const BASE = (process.argv[2] ?? 'http://localhost:3999').replace(/\/$/, '');
const PAGES = ['/containers/card', '/navigation/buttons/button', '/display/callout'];

const browser = await chromium.launch();
const page = await browser.newPage();
let red = 0;
for (const path of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
  /*
   * The examples render client-side (hydration, then react-live) - on a
   * CI runner that takes far longer than on a dev machine. Wait for the
   * page to show its hand either way instead of napping a fixed time.
   */
  await page
    .locator('[class*="ant-"]')
    .first()
    .or(page.getByText(/SyntaxError|ReferenceError|Page Not Found/))
    .first()
    .waitFor({ state: 'visible', timeout: 90000 })
    .catch(() => {});
  const errors = await page.getByText(/SyntaxError|ReferenceError|Page Not Found/).count();
  const antd = await page.locator('[class*="ant-"]').count();
  console.log(`${path}: errors=${errors}, antd=${antd}`);
  if (errors > 0 || antd === 0) red++;
}
await browser.close();
console.log(red === 0 ? 'smoke: green' : `smoke: RED (${red} pages)`);
process.exit(red === 0 ? 0 : 1);
