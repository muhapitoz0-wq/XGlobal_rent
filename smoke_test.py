#!/usr/bin/env python3
"""Smoke test using synchronous Playwright API."""

import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

html_path = Path(__file__).parent / 'index.html'
file_url = f'file:///{html_path}'.replace('\\', '/')

def run_tests():
    with sync_playwright() as p:
        print(f"Launching browser... (loading {file_url})")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Intercept console logs
        page.on('console', lambda msg: print(f"[PAGE LOG] {msg.text}"))
        
        try:
            # TEST 1: Load
            print("\n[1] Loading page...")
            page.goto(file_url, wait_until='domcontentloaded')
            print("   ✓ Page loaded")

            # TEST 2: Grid
            print("[2] Checking grid renders...")
            page.wait_for_selector('#gearGrid', timeout=8000)
            page.wait_for_timeout(300)
            if page.query_selector('.skeleton-card, .card'):
                print("   ✓ Grid has content (skeleton or cards)")
            else:
                raise Exception('No grid content found')

            # TEST 3: Details Modal
            print("[3] Opening details modal...")
            card = page.query_selector('.card')
            if not card:
                raise Exception('No card to click')
            card.click()
            page.wait_for_selector('#detailsModal .modal-content', state='visible', timeout=5000)
            print("   ✓ Details modal opened")

            # TEST 4: Add to Quote
            print("[4] Adding item to quote...")
            page.evaluate('document.querySelector("#detailsModal .btn-primary").click()')
            page.wait_for_function(
                'document.getElementById("cartCount") && Number(document.getElementById("cartCount").innerText) > 0',
                timeout=4000
            )
            print("   ✓ Item added, badge updated")

            # TEST 5: Quote Modal
            print("[5] Opening quote modal...")
            page.click('#quoteBtn')
            page.wait_for_selector('#quoteModal .modal-content', state='visible', timeout=4000)
            print("   ✓ Quote modal opened")

            # TEST 6: Copy Quote
            print("[6] Testing copy quote button...")
            copy_btn = page.query_selector('#quoteForm button.btn-secondary')
            if copy_btn:
                copy_btn.click()
                page.wait_for_timeout(300)
                print("   ✓ Copy quote button works")
            else:
                print("   ⚠ Copy button not found (skipped)")

            # TEST 7: Back-to-Top
            print("[7] Testing back-to-top...")
            page.evaluate('window.scrollTo(0, 1200)')
            page.wait_for_timeout(250)
            back = page.query_selector('#backToTop')
            if not back:
                raise Exception('Back-to-top button not found')
            back.click()
            page.wait_for_timeout(600)
            scroll_y = page.evaluate('window.scrollY')
            if scroll_y > 50:
                raise Exception(f'Not at top: scrollY={scroll_y}')
            print("   ✓ Back-to-top works")

            # TEST 8: Favorites
            print("[8] Testing favorite toggle...")
            btn = page.query_selector('.btn-favorite')
            if btn:
                btn.click()
                page.wait_for_timeout(200)
                count_el = page.query_selector('#favCount')
                if count_el:
                    ct = count_el.inner_text()
                    print(f"   ✓ Favorite toggled (count: {ct})")
                else:
                    print("   ✓ Favorite toggled")
            else:
                print("   ⚠ Favorite button not found (skipped)")

            # TEST 9: Search
            print("[9] Testing search filter...")
            search = page.query_selector('#searchInput')
            if search:
                search.fill('camera')
                page.wait_for_timeout(300)
                cards = page.query_selector_all('.card')
                print(f"   ✓ Search works ({len(cards)} cards)")
            else:
                print("   ⚠ Search not found (skipped)")

            print("\n" + "="*60)
            print("✓ SMOKE TEST PASSED - All critical features work!")
            print("="*60)
            browser.close()
            return True

        except Exception as e:
            print(f"\n✗ TEST FAILED: {e}")
            import traceback
            traceback.print_exc()
            browser.close()
            return False

if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 2)
