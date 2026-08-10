// @ts-check
import { test, expect } from '@playwright/test';

// CP-001: Búsqueda de programas y servicios
test('CP-001 - Búsqueda de programas y servicios (CELCI)', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const searchInput = page.locator('input[name="q"]');
  await searchInput.click();
  await searchInput.fill('centro de len');

  const result = page.getByRole('navigation').getByRole('link', { name: 'CELCI' });
  await expect(result).toBeVisible();

  await result.click();
  await expect(page).toHaveURL(/#\/lenguas/);
});
