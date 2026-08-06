// @ts-check
import { test, expect } from '@playwright/test';

// CP-011: Ver el perfil completo de un directivo
test('CP-011 - Ver el perfil completo de un directivo', async ({ page }) => {
  await page.goto('http://localhost:5173/#/nosotros/ejes-rectores');

  const firstDirectorName = await page.locator('.el-name').first().innerText();

  await page.getByRole('link', { name: 'Ver Información' }).first().click();

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(firstDirectorName);
  await expect(page.getByText('FORMACIÓN ACADÉMICA')).toBeVisible();
});
