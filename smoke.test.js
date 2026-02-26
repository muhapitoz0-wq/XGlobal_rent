const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const indexPath = path.resolve(__dirname, 'index.html').replace(/\\/g, '/');
  const fileUrl = `file:///${indexPath}`;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));

  try {
    // Navigate to local file
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log('Loaded:', fileUrl);

    // Instrument clipboard to capture writes
    await page.evaluate(() => {
      window.__lastClipboard = null;
      try {
        navigator.clipboard = navigator.clipboard || {};
        navigator.clipboard.writeText = (t) => { window.__lastClipboard = t; return Promise.resolve(); };
      } catch (e) { window.__lastClipboard = null; }
    });

    // Wait for grid and skeleton or cards
    await page.waitForSelector('#gearGrid', { timeout: 8000 });
    await page.waitForTimeout(300); // allow skeleton to render
    const sawSkeletonOrCard = await page.$('.skeleton-card, .card');
    if (!sawSkeletonOrCard) throw new Error('No skeleton or card rendered');
    console.log('Grid rendered (skeleton or cards present)');

    // Click first card (if none clickable, pass)
    const firstCard = await page.$('.card');
    if (!firstCard) throw new Error('No .card found to open details');
    await firstCard.click();
    // Wait for details modal
    await page.waitForSelector('#detailsModal .modal-content', { visible: true, timeout: 5000 });
    console.log('Details modal opened');

    // Click Add to Quote in details modal
    await page.evaluate(() => {
      const btn = document.querySelector('#detailsModal .btn-primary');
      if (btn) btn.click();
    });

    // Wait for quote badge to increment
    await page.waitForFunction(() => {
      const el = document.getElementById('cartCount'); return el && Number(el.innerText) > 0;
    }, { timeout: 4000 });
    console.log('Item added to quote, badge updated');

    // Open quote modal
    await page.click('#quoteBtn');
    await page.waitForSelector('#quoteModal .modal-content', { visible: true, timeout: 4000 });
    console.log('Quote modal opened');

    // Click copy quote button inside form
    await page.evaluate(() => {
      const btn = document.querySelector('#quoteForm button.btn-secondary');
      if (btn) btn.click();
    });
    await page.waitForTimeout(400);
    const clipboardText = await page.evaluate(() => window.__lastClipboard || '');
    if (!clipboardText || !clipboardText.includes('Quote from Global Rental House')) throw new Error('Clipboard copy did not occur or text missing');
    console.log('Copy Quote worked, clipboard contains quote text');

    // Test Back-to-Top: scroll down then click
    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(250);
    const back = await page.$('#backToTop');
    if (!back) throw new Error('Back-to-top button not found');
    await back.click();
    await page.waitForTimeout(600);
    const y = await page.evaluate(() => window.scrollY);
    if (y > 40) throw new Error('Back-to-top did not scroll to top');
    console.log('Back-to-top works');

    console.log('SMOKE TEST PASSED');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('SMOKE TEST FAILED:', err && err.message || err);
    try { await browser.close(); } catch(e){}
    process.exit(2);
  }
})();
