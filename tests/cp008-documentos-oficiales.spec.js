// @ts-check
import { test, expect } from '@playwright/test';

// CP-008: Visualización y descarga de documentos oficiales
test('CP-008 - Cursos Intersemestrales, visualización y descarga de documento', async ({ page }) => {
  await page.goto('http://localhost:5173/#/');
  await page.getByRole('link', { name: 'Nosotros' }).click();
  // El submenú "Cursos Intersemestrales" vive dentro de "Oferta Educativa" y se
  // despliega con :hover, por lo que hay que pasar el mouse antes de hacer click.
  await page.getByRole('link', { name: 'Oferta Educativa' }).hover();
  await page.getByRole('link', { name: 'Cursos Intersemestrales' }).click();
  await page.getByText('Descarga el documento con las').click();
  await page.getByText('Contacto(618) 827-13-').click();
});
