// @ts-check
import { test, expect } from '@playwright/test';

// CP-003: Panel de últimas noticias
test('CP-003 - Panel de últimas noticias', async ({ page }) => {
  await page.goto('http://localhost:5173/#/');

  await page.getByRole('button', { name: 'Abrir últimas noticias' }).click();
  await expect(page.getByRole('heading', { name: 'Últimas noticias' })).toBeVisible();
});
