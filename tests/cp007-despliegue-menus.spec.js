// @ts-check
import { test, expect } from '@playwright/test';

// CP-007: Despliegue de los menús de cada sección de la página
test('CP-007 - Despliegue de menús de navegación', async ({ page }) => {
  await page.goto('http://localhost:5173/#/');

  // "Oferta Educativa" despliega su submenú al pasar el cursor (:hover).
  const ofertaDropdown = page.getByRole('link', { name: 'Cursos Intersemestrales' });
  await expect(ofertaDropdown).toBeHidden();
  await page.getByRole('link', { name: 'Oferta Educativa' }).hover();
  await expect(ofertaDropdown).toBeVisible();

  await page.getByRole('link', { name: 'Cursos Intersemestrales' }).click();
  await expect(page).toHaveURL(/#\/cursos-intersemestrales/);

  // "Servicios" también despliega su submenú tipo acordeón.
  const serviciosSubmenu = page.getByRole('link', { name: 'Servicio social', exact: true });
  await expect(serviciosSubmenu).toBeHidden();
  await page.getByRole('link', { name: 'Servicios', exact: true }).hover();
  await expect(page.getByRole('navigation').getByText('Secretaría Académica')).toBeVisible();
});
