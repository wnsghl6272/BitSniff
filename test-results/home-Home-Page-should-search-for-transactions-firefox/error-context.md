# Test info

- Name: Home Page >> should search for transactions
- Location: /Users/jd/BitSniff/tests/e2e/home.spec.ts:51:3

# Error details

```
Error: page.waitForSelector: Test ended.
Call log:
  - waiting for locator('input[type="search"]') to be visible

    at /Users/jd/BitSniff/tests/e2e/home.spec.ts:53:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Home Page', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     // Start the server before each test
   6 |     await page.goto('http://localhost:5001');
   7 |   });
   8 |
   9 |   test('should display network stats', async ({ page }) => {
  10 |     // Wait for stats to load
  11 |     await page.waitForSelector('[data-testid="network-stats"]', { timeout: 60000 });
  12 |     
  13 |     // Check if Bitcoin stats are displayed
  14 |     await expect(page.locator('text=Bitcoin Stats')).toBeVisible();
  15 |     await expect(page.locator('text=Market Price (USD)')).toBeVisible();
  16 |     
  17 |     // Check if Ethereum stats are displayed
  18 |     await expect(page.locator('text=Ethereum Stats')).toBeVisible();
  19 |     await expect(page.locator('text=Total ETH Staked')).toBeVisible();
  20 |   });
  21 |
  22 |   test('should display latest transactions', async ({ page }) => {
  23 |     // Wait for transactions to load
  24 |     await page.waitForSelector('[data-testid="latest-transactions"]');
  25 |     
  26 |     // Check if transaction table is displayed
  27 |     await expect(page.locator('text=Network')).toBeVisible();
  28 |     await expect(page.locator('text=Hash')).toBeVisible();
  29 |     await expect(page.locator('text=Block')).toBeVisible();
  30 |   });
  31 |
  32 |   test('should filter transactions by network', async ({ page }) => {
  33 |     // Wait for transactions to load
  34 |     await page.waitForSelector('[data-testid="latest-transactions"]');
  35 |     
  36 |     // Click Bitcoin filter
  37 |     await page.click('button:has-text("Bitcoin")');
  38 |     
  39 |     // Verify only Bitcoin transactions are shown
  40 |     const bitcoinIcon = page.locator('svg[class*="bitcoin"]');
  41 |     await expect(bitcoinIcon).toBeVisible();
  42 |     
  43 |     // Click Ethereum filter
  44 |     await page.click('button:has-text("Ethereum")');
  45 |     
  46 |     // Verify only Ethereum transactions are shown
  47 |     const ethereumIcon = page.locator('svg[class*="ethereum"]');
  48 |     await expect(ethereumIcon).toBeVisible();
  49 |   });
  50 |
  51 |   test('should search for transactions', async ({ page }) => {
  52 |     // Wait for search input to be visible
> 53 |     await page.waitForSelector('input[type="search"]');
     |                ^ Error: page.waitForSelector: Test ended.
  54 |     
  55 |     // Type in search query
  56 |     await page.fill('input[type="search"]', 'test');
  57 |     
  58 |     // Click search button
  59 |     await page.click('button:has-text("Search")');
  60 |     
  61 |     // Verify search results page
  62 |     await expect(page).toHaveURL(/.*search.*/);
  63 |   });
  64 | }); 
```