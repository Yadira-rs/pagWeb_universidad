// @ts-check
import { test, expect } from '@playwright/test';

// CP-002: Encuesta de satisfacción del sitio
test('CP-002 - Encuesta de satisfacción del sitio', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('button', { name: 'Abrir encuesta de satisfacción' }).click();
  await page.getByRole('button', { name: 'Muy bueno' }).click();

  const comentario = page.getByRole('textbox', { name: 'Comentario opcional (' });
  await comentario.click();
  await comentario.fill('muy buena pagina');

  await page.getByRole('button', { name: 'Enviar opinión' }).click();
  await expect(page.getByText('¡Gracias por tu opinión!')).toBeVisible();
});
