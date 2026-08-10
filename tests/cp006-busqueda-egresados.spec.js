// @ts-check
import { test, expect } from '@playwright/test';

// CP-006: Generar búsqueda de egresados
// NOTA: la pestaña "Egresados" se ocultó del menú de navegación mientras se
// define el futuro de esa sección (petición del equipo), y el sitio tampoco
// tiene un buscador de egresados por nombre. Este test confirma que la
// pestaña ya no aparece en el menú "Nosotros"; la página en sí sigue
// existiendo en /#/egresados por si se reactiva más adelante.
test('CP-006 - La pestaña Egresados está oculta del menú', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Nosotros' }).hover();
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Egresados' })).toHaveCount(0);
});
