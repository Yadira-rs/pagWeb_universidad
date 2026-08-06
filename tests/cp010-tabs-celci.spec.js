// @ts-check
import { test, expect } from '@playwright/test';

// CP-010: Cambiar entre pestañas del CELCI
test('CP-010 - Cambiar entre pestañas del CELCI', async ({ page }) => {
  await page.goto('http://localhost:5173/#/lenguas');

  const cursosTab = page.getByRole('button', { name: 'Cursos' });
  await expect(cursosTab).toHaveClass(/celci-tab--active/);
  await expect(page.getByRole('heading', { name: 'Cursos disponibles' })).toBeVisible();

  const costosTab = page.getByRole('button', { name: 'Costos' });
  await costosTab.click();

  await expect(costosTab).toHaveClass(/celci-tab--active/);
  await expect(cursosTab).not.toHaveClass(/celci-tab--active/);
  await expect(page.getByRole('heading', { name: 'Costos de los cursos' })).toBeVisible();
});
