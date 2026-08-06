// @ts-check
import { test, expect } from '@playwright/test';

// CP-009: Navegación en una pantalla en específica (Contraloría Interna)
test('CP-009 - Navegación en Contraloría Interna', async ({ page }) => {
  await page.goto('http://localhost:5173/#/');

  await page.getByRole('link', { name: 'Servicios', exact: true }).hover();
  await page.getByRole('navigation').getByRole('link', { name: 'Contraloría Interna', exact: true }).click();

  await expect(page).toHaveURL(/#\/servicios\/contraloria-interna/);
  await expect(page.getByRole('heading', { level: 1, name: /Contralor.a/ })).toBeVisible();
  await expect(page.getByText('Fiscalización y Auditoría')).toBeVisible();
});
