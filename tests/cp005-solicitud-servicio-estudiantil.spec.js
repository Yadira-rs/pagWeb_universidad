// @ts-check
import { test, expect } from '@playwright/test';

// CP-005: Solicitud de servicio estudiantil
test('CP-005 - Solicitud de servicio estudiantil (Servicio Social)', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // El enlace "Servicio social" está dentro de un menú desplegable de tipo
  // acordeón que se abre con :hover: primero "Servicios", luego "Secretaría Académica".
  await page.getByRole('link', { name: 'Servicios', exact: true }).hover();
  await page.getByRole('navigation').getByText('Secretaría Académica').hover();
  await page.getByRole('link', { name: 'Servicio social', exact: true }).click();
  await page.getByRole('main').click();
});
