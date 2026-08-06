// @ts-check
import { test, expect } from '@playwright/test';

// CP-006: Generar búsqueda de egresados
// NOTA: el sitio actual no tiene un buscador de egresados por nombre dentro de
// la página de Egresados (src/pages/EgresadosPage.jsx no tiene ese input), y la
// página tampoco está indexada en el buscador global (src/data/searchIndex.js).
// Este test navega a la sección de Egresados por el menú, que es lo único
// automatizable hoy; el paso de "buscar por nombre" del caso manual no existe
// todavía como funcionalidad.
test('CP-006 - Generar búsqueda de egresados', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Nosotros' }).hover();
  await page.getByRole('navigation').getByRole('link', { name: 'Egresados' }).click();
  await expect(page).toHaveURL(/#\/egresados/);
});
