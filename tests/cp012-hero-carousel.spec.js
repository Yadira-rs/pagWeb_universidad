// @ts-check
import { test, expect } from '@playwright/test';

// CP-012: Hero Carousel con Estadísticas Institucionales
test('CP-012 - Hero Carousel en la página principal', async ({ page }) => {
  await page.goto('http://localhost:5173/#/');

  const carousel = page.getByLabel('Carrusel de aniversario FECA');
  await expect(carousel).toBeVisible();

  const dots = page.locator('.carousel-dot');
  const dotCount = await dots.count();
  expect(dotCount).toBeGreaterThan(1);

  await dots.nth(1).click();
  await expect(dots.nth(1)).toHaveClass(/active/);
});
