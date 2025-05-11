import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Start the server before each test
    await page.goto('http://localhost:5001');
  });

  test('should display network stats', async ({ page }) => {
    // Wait for stats to load
    await page.waitForSelector('[data-testid="network-stats"]', { timeout: 60000 });
    
    // Check if Bitcoin stats are displayed
    await expect(page.locator('text=Bitcoin Stats')).toBeVisible();
    await expect(page.locator('text=Market Price (USD)')).toBeVisible();
    
    // Check if Ethereum stats are displayed
    await expect(page.locator('text=Ethereum Stats')).toBeVisible();
    await expect(page.locator('text=Total ETH Staked')).toBeVisible();
  });

  test('should display latest transactions', async ({ page }) => {
    // Wait for transactions to load
    await page.waitForSelector('[data-testid="latest-transactions"]');
    
    // Check if transaction table is displayed
    await expect(page.locator('text=Network')).toBeVisible();
    await expect(page.locator('text=Hash')).toBeVisible();
    await expect(page.locator('text=Block')).toBeVisible();
  });

  test('should filter transactions by network', async ({ page }) => {
    // Wait for transactions to load
    await page.waitForSelector('[data-testid="latest-transactions"]');
    
    // Click Bitcoin filter
    await page.click('button:has-text("Bitcoin")');
    
    // Verify only Bitcoin transactions are shown
    const bitcoinIcon = page.locator('svg[class*="bitcoin"]');
    await expect(bitcoinIcon).toBeVisible();
    
    // Click Ethereum filter
    await page.click('button:has-text("Ethereum")');
    
    // Verify only Ethereum transactions are shown
    const ethereumIcon = page.locator('svg[class*="ethereum"]');
    await expect(ethereumIcon).toBeVisible();
  });

  test('should search for transactions', async ({ page }) => {
    // Wait for search input to be visible
    await page.waitForSelector('input[type="search"]');
    
    // Type in search query
    await page.fill('input[type="search"]', 'test');
    
    // Click search button
    await page.click('button:has-text("Search")');
    
    // Verify search results page
    await expect(page).toHaveURL(/.*search.*/);
  });
}); 